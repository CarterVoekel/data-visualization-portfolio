# Sigma Workout Wednesday: Numbers of Different Magnitudes

This project is my Sigma plugin submission for Workout Wednesday.

Contents:
- `App.jsx`: React + D3 plugin app
- `App.css`: layout and styling
- `IDEAL_PROMPT_WORKOUT_WEDNESDAY.md`: reusable build prompt

Highlights:
- Side-by-side magnitude and trend storytelling
- Dynamic narrative summaries
- Cohort segmentation by income
- Animated bars and lines
- Sigma filter-aware updates

# Sigma Workout Wednesday: Numbers of Different Magnitudes

This submission showcases AI-assisted vibe coding in Sigma: building a custom React + D3 plugin that goes beyond out-of-the-box visual options while staying fully interactive with Sigma filters.

## Why this matters
Sigma users can now co-create bespoke visuals and narrative layers with AI, then deploy them directly in dashboards. This unlocks faster experimentation, enghanced storytelling, and design patterns not currently available in native chart types.

## What this plugin adds
- Side-by-side magnitude + trend storytelling layout
- Dynamic narrative insights driven by filtered data
- Income cohort segmentation and chronological trend animation
- Inline data labels and cohort endpoint labels
- Professional presentation styling for stakeholder-ready communication

## What AI helped with
- Translating design intent into a production-ready two-column storytelling layout.
- Writing dynamic narrative helpers (`getBarInsight()` and `getLineInsight()`) that update with filtered data.
- Implementing D3 animation patterns (bar rise + line draw via `stroke-dashoffset`) and label logic.
- Structuring Sigma integration (`workbook.addColumns`, `workbook.on("change")`) so charts and insights stay filter-aware.

## What I’d improve next
- Performance tuning for large datasets and faster first render in Sigma.
- Plugin packaging and deployment workflow (dev/prod config, hosting, versioning).
- Accessibility improvements (contrast validation, keyboard support, ARIA details, reduced-motion handling).


