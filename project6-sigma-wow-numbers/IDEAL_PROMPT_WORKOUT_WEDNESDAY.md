# Ideal Prompt: Sigma Plugin Data Story (Workout Wednesday Submission)

Use this prompt to recreate this project from scratch with consistent quality.

## Copy/Paste Prompt

```md
You are a senior data visualization engineer and Sigma plugin developer.
Build a polished React + D3 Sigma plugin for a Workout Wednesday submission focused on "Numbers of Different Magnitudes."

## Goal
Create a side-by-side storytelling dashboard:
- Left: Bar chart (magnitude story)
- Right: Line chart (trend story)

The deliverable must feel presentation-ready for LinkedIn and GitHub.

## Layout and UX Requirements
1. Use a two-column layout:
   - `display: flex;`
   - `flex-direction: row;`
   - `gap: 40px;`
   - each chart column is `50%` width
2. Add a strong page title and subtitle above both charts.
3. Add cohort definitions in visible text:
   - Low Earner: `< $50k`
   - Middle Class: `$50k–$120k`
   - High Earner: `> $120k`
4. Each chart section must include:
   - bold `<h2>` title
   - summary narrative directly below title: `<p className="summary-insight">...`
   - chart below summary
5. Keep both charts vertically aligned so x-axes sit on the same baseline.
6. Use high-end styling (clean typography, subtle depth, strong hierarchy, professional spacing).

## Data and Cohort Logic
1. Use these columns from Sigma:
   - month (Issue Month)
   - amount (Loan Amount)
   - income (Annual Income)
2. Use `workbook.addColumns(...)` and `workbook.on("change", ...)`.
3. Recompute all visuals and summaries when filters change.
4. Cohort classification:
   - Low: income `< 50000`
   - Middle: `50000 <= income <= 120000`
   - High: income `> 120000`
5. Month ordering must be chronological using a real date parser.

## Storytelling Functions (Required)
Implement and use:
- `getBarInsight(barData)`
- `getLineInsight(linePoints)`

### `getBarInsight(barData)`
- Find max and min cohorts by total loan volume.
- Calculate ratio = max / min.
- Return narrative in this form:
  - "Our portfolio volume is concentrated in the [Max] segment, which accounts for $[Amount]. This creates a clear magnitude gap, with this cohort [Ratio]x larger than the [Min] group."

### `getLineInsight(linePoints)`
- Compare first chronological month vs last chronological month.
- Compute percentage change.
- Return narrative in this form:
  - "From [Start Month] to [End Month], volume shows a [X]% [increase/decrease]."

## Charts and Animation
### Bar chart (left)
- D3 vertical bars by cohort totals.
- Animate bars upward with slower narrative pacing (story reveal, not instant).
- Add numeric data labels above bars.
- Add axis labels:
  - X: Income Cohort
  - Y: Total Loan Volume (USD)
- Increase axis font size for readability.
- Remove tick marks (keep labels).

### Line chart (right)
- D3 multi-line chart by cohort across months.
- Draw lines chronologically with stroke-dashoffset animation.
- Add endpoint numeric labels and endpoint cohort text labels (inline, no legend dependency).
- Add axis labels:
  - X: Issue Month
  - Y: Monthly Loan Volume (USD)
- Increase axis font size for readability.
- Remove tick marks (keep labels).

## Technical Expectations
- React functional component with hooks.
- D3 for rendering and animation.
- Clean helper functions for parsing numbers, parsing dates, formatting money.
- Robust month parser for common date formats.
- Handle empty/filtered states gracefully.
- Keep code readable and production-ready.

## Deliverables
Provide:
1. Full `App.jsx`
2. Full `App.css`
3. Clear notes on how to run locally (Vite) and in Sigma
4. A brief explanation of how dynamic updates work with Sigma filters

## Quality Bar
- Visual output should look like a professional data story slide.
- Narrative text must be specific and data-driven (no placeholder copy).
- Animations should support the story, not distract.
- Final result should be suitable for a public Workout Wednesday showcase and LinkedIn post.
```
