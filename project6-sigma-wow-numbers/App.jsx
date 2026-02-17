import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";

const INCOME_GROUPS = {
  LOW: "Low Earner",
  MIDDLE: "Middle Class",
  HIGH: "High Earner",
};

const MONTH_PARSERS = [
  d3.timeParse("%b %Y"),
  d3.timeParse("%B %Y"),
  d3.timeParse("%Y-%m"),
  d3.timeParse("%Y-%m-%d"),
  d3.timeParse("%m/%d/%Y"),
  d3.timeParse("%m/%Y"),
];

function parseNumeric(value) {
  if (typeof value === "number") return value;
  if (value === null || value === undefined) return 0;
  const cleaned = String(value).replace(/[^0-9.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseMonth(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  const raw = String(value).trim();
  for (const parser of MONTH_PARSERS) {
    const parsed = parser(raw);
    if (parsed) return parsed;
  }

  const fallback = new Date(raw);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatMillions(value) {
  return `$${((value || 0) / 1_000_000).toFixed(1)}M`;
}

function formatPct(value) {
  if (!Number.isFinite(value)) return "0.0";
  return `${Math.abs(value).toFixed(1)}`;
}

function classifyIncome(incomeValue) {
  const income = parseNumeric(incomeValue);
  if (income < 50000) return INCOME_GROUPS.LOW;
  if (income <= 120000) return INCOME_GROUPS.MIDDLE;
  return INCOME_GROUPS.HIGH;
}

function normalizeRows(rawRows, columns) {
  const colMap = {
    month: columns.month,
    amount: columns.amount,
    income: columns.income,
  };

  return (rawRows || [])
    .map((row) => {
      const monthRaw = row[colMap.month] ?? row.month ?? row.issue_month ?? row.issueMonth;
      const amountRaw = row[colMap.amount] ?? row.amount ?? row.loan_amount ?? row.loanAmount;
      const incomeRaw = row[colMap.income] ?? row.income ?? row.annual_income ?? row.annualIncome;

      const monthDate = parseMonth(monthRaw);
      const amount = parseNumeric(amountRaw);
      const cohort = classifyIncome(incomeRaw);

      if (!monthDate || !Number.isFinite(amount)) return null;

      return {
        monthDate,
        monthLabel: d3.timeFormat("%b %Y")(monthDate),
        amount,
        cohort,
      };
    })
    .filter(Boolean);
}

export function getBarInsight(barData) {
  if (!barData || !barData.length) {
    return "Our portfolio volume is concentrated in the available segment, but there is not enough filtered data to calculate a reliable magnitude gap.";
  }

  const sorted = [...barData].sort((a, b) => b.total - a.total);
  const maxCohort = sorted[0];
  const minCohort = sorted[sorted.length - 1];
  const ratio = minCohort.total > 0 ? maxCohort.total / minCohort.total : 0;

  return `Our portfolio volume is concentrated in the ${maxCohort.cohort} segment, which accounts for ${formatMoney(maxCohort.total)}. This represents a significant magnitude gap, as this cohort is ${ratio.toFixed(1)}x larger than our ${minCohort.cohort} group.`;
}

export function getLineInsight(linePoints) {
  if (!linePoints || linePoints.length < 2) {
    return "From the earliest to latest visible month, volume changed by 0.0%. Add more than one month in the filter context to evaluate progression.";
  }

  const sorted = [...linePoints].sort((a, b) => a.monthDate - b.monthDate);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const pct = first.total === 0 ? 0 : ((last.total - first.total) / first.total) * 100;

  return `From ${first.monthLabel} to ${last.monthLabel}, volume changed by ${pct.toFixed(1)}%.`;
}

function App() {
  const barSvgRef = useRef(null);
  const lineSvgRef = useRef(null);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState({
    month: "Issue Month",
    amount: "Amount",
    income: "Income",
  });

  useEffect(() => {
    const workbook = window?.workbook || window?.sigma?.workbook;
    if (!workbook) return undefined;

    const requestedColumns = {
      month: "Issue Month",
      amount: "Amount",
      income: "Income",
    };

    workbook.addColumns([
      requestedColumns.month,
      requestedColumns.amount,
      requestedColumns.income,
    ]);

    setColumns(requestedColumns);

    const handleDataChange = (data) => {
      const incomingRows = data?.rows || data?.data || data || [];
      setRows(normalizeRows(incomingRows, requestedColumns));
    };

    workbook.on("change", handleDataChange);

    return () => {
      if (typeof workbook.off === "function") {
        workbook.off("change", handleDataChange);
      }
    };
  }, []);

  const barData = useMemo(() => {
    const rollup = d3.rollup(
      rows,
      (v) => d3.sum(v, (d) => d.amount),
      (d) => d.cohort
    );

    return Object.values(INCOME_GROUPS).map((cohort) => ({
      cohort,
      total: rollup.get(cohort) || 0,
    }));
  }, [rows]);

  const lineSeries = useMemo(() => {
    const nested = d3.rollups(
      rows,
      (v) => d3.sum(v, (d) => d.amount),
      (d) => d.cohort,
      (d) => d.monthLabel
    );

    return nested.map(([cohort, points]) => ({
      cohort,
      points: points
        .map(([monthLabel, total]) => {
          const date = parseMonth(monthLabel);
          return date
            ? {
                monthDate: date,
                monthLabel,
                total,
              }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.monthDate - b.monthDate),
    }));
  }, [rows]);

  const monthlyTotals = useMemo(() => {
    const totals = d3.rollups(
      rows,
      (v) => d3.sum(v, (d) => d.amount),
      (d) => d.monthLabel
    )
      .map(([monthLabel, total]) => {
        const monthDate = parseMonth(monthLabel);
        if (!monthDate) return null;
        return { monthLabel, monthDate, total };
      })
      .filter(Boolean)
      .sort((a, b) => a.monthDate - b.monthDate);

    return totals;
  }, [rows]);

  const lineDriver = useMemo(() => {
    let best = { cohort: "available cohorts", growth: -Infinity };

    lineSeries.forEach((series) => {
      if (series.points.length < 2) return;
      const start = series.points[0].total;
      const end = series.points[series.points.length - 1].total;
      const growth = start === 0 ? (end > 0 ? Infinity : 0) : (end - start) / start;
      if (growth > best.growth) {
        best = { cohort: series.cohort, growth };
      }
    });

    return best.cohort;
  }, [lineSeries]);

  const magnitudeSummary = useMemo(() => {
    const base = getBarInsight(barData);
    const middle = barData.find((d) => d.cohort === INCOME_GROUPS.MIDDLE)?.total || 0;
    const high = barData.find((d) => d.cohort === INCOME_GROUPS.HIGH)?.total || 0;
    const comparison = high > 0 ? middle / high : 0;

    return `${base} Middle Class earners represent the core magnitude of our portfolio, totaling ${formatMillions(middle)}${high > 0 ? ` and standing at ${comparison.toFixed(1)}x the High Earner segment.` : "."}`;
  }, [barData]);

  const trendSummary = useMemo(() => {
    const base = getLineInsight(monthlyTotals);
    if (monthlyTotals.length < 2) return `${base} The trend driver becomes clearer once multiple months are visible.`;

    const first = monthlyTotals[0].total;
    const last = monthlyTotals[monthlyTotals.length - 1].total;
    const pct = first === 0 ? 0 : ((last - first) / first) * 100;
    const direction = pct >= 0 ? "surged" : "declined";

    return `${base} Looking at the chronological progression, total loan activity ${direction} by ${formatPct(pct)}%, led by the ${lineDriver} cohort.`;
  }, [monthlyTotals, lineDriver]);

  useEffect(() => {
    const svg = d3.select(barSvgRef.current);
    const width = 620;
    const height = 360;
    const margin = { top: 18, right: 20, bottom: 48, left: 80 };

    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const x = d3
      .scaleBand()
      .domain(barData.map((d) => d.cohort))
      .range([margin.left, width - margin.right])
      .padding(0.35);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(barData, (d) => d.total) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickFormat((d) => `$${(d / 1_000_000).toFixed(1)}M`))
      .selectAll("text")
      .style("font-size", "12px");

    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", 12)
      .attr("class", "chart-caption")
      .text("Total Loan Volume by Income Cohort");

    svg
      .selectAll(".bar")
      .data(barData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.cohort))
      .attr("width", x.bandwidth())
      .attr("y", height - margin.bottom)
      .attr("height", 0)
      .attr("fill", (d) => {
        if (d.cohort === INCOME_GROUPS.LOW) return "#97c1ff";
        if (d.cohort === INCOME_GROUPS.MIDDLE) return "#2065d1";
        return "#123163";
      })
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.total))
      .attr("height", (d) => y(0) - y(d.total));
  }, [barData]);

  useEffect(() => {
    const svg = d3.select(lineSvgRef.current);
    const width = 620;
    const height = 360;
    const margin = { top: 18, right: 24, bottom: 48, left: 80 };

    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const allPoints = lineSeries.flatMap((s) => s.points);

    if (!allPoints.length) return;

    const x = d3
      .scaleTime()
      .domain(d3.extent(allPoints, (d) => d.monthDate))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allPoints, (d) => d.total) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat("%b %Y")))
      .selectAll("text")
      .attr("transform", "rotate(-28)")
      .style("text-anchor", "end")
      .style("font-size", "11px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickFormat((d) => `$${(d / 1_000_000).toFixed(1)}M`))
      .selectAll("text")
      .style("font-size", "12px");

    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", 12)
      .attr("class", "chart-caption")
      .text("Monthly Progression by Income Cohort");

    const color = d3
      .scaleOrdinal()
      .domain(Object.values(INCOME_GROUPS))
      .range(["#8ab4f8", "#2a7de1", "#0e2f5e"]);

    const lineGen = d3
      .line()
      .x((d) => x(d.monthDate))
      .y((d) => y(d.total))
      .curve(d3.curveMonotoneX);

    lineSeries.forEach((series) => {
      if (!series.points.length) return;

      const path = svg
        .append("path")
        .datum(series.points)
        .attr("fill", "none")
        .attr("stroke", color(series.cohort))
        .attr("stroke-width", 2.8)
        .attr("d", lineGen);

      const pathNode = path.node();
      const length = pathNode ? pathNode.getTotalLength() : 0;

      path
        .attr("stroke-dasharray", `${length} ${length}`)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(1100)
        .ease(d3.easeCubicInOut)
        .attr("stroke-dashoffset", 0);
    });
  }, [lineSeries]);

  return (
    <div className="app-shell">
      <div className="chart-grid">
        <section className="chart-column">
          <h2>Magnitude Story: Portfolio Concentration</h2>
          <p className="summary-insight">{magnitudeSummary}</p>
          <svg ref={barSvgRef} className="chart-svg" role="img" aria-label="Bar chart by income cohort" />
        </section>

        <section className="chart-column">
          <h2>Progression Story: Chronological Trend</h2>
          <p className="summary-insight">{trendSummary}</p>
          <svg ref={lineSvgRef} className="chart-svg" role="img" aria-label="Line chart by month and cohort" />
        </section>
      </div>
    </div>
  );
}

export default App;
