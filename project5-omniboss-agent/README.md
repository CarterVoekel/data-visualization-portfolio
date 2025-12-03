# OmniBoss – AI Knowledge Assistant for Omni Analytics

**Type:** Internal AI agent / knowledge tool  
**Tools:** Omni, Glean

## Overview

OmniBoss is an internal Glean AI agent that turns my Omni Analytics training documentation and certification notes into a virtual BI expert. It answers questions about modeling, cohort analysis, LOD strategies, and Omni vs Sigma trade-offs for project teams.

![OmniBoss Glean agent](images/omniboss-home.png)

## Problem

Omni modeling patterns and best practices were spread across personal notes, Notion pages, and slide decks. New consultants asked the same questions in Slack and ramp-up depended on direct access to a few SMEs.

## Solution

- Curated a focused corpus of Omni docs and internal training guides.  
- Designed a Glean agent (“OmniBoss”) scoped to these sources.  
- Wrote a system prompt and example Q&A to return:
  - a short summary,
  - recommended modeling / dashboard pattern,
  - links to deeper documentation.

## Impact

- Reduced repeated “how do I model this in Omni?” questions.  
- Faster ramp-up for new team members on Omni projects.  
- Created a reusable pattern for future agents (Sigma, dbt, etc.).

*(Implementation details and metrics available on request; internal to employer.)*
