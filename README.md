# Data Visualizations and Apps Portfolio
Business intelligence dashboards and data apps built in Sigma, focused on real-world operations, workflows, and customer analytics.

## How to explore
This portfolio highlights a few representative projects. Each section links to the live challenge or includes screenshots/video where possible.

## About Me

Principal Analytics Consultant focused on building data products, dashboards, and data apps in modern BI tools (especially Sigma + Snowflake). I'm a contributor to [Workout Wednesday Sigma Challenges](https://workout-wednesday.com/author/cartervmac-com/)

## Skills & Tools

- **BI:** Sigma, Omni, Tableau, Power BI
- **Analytics:** Data modeling, forecasting, scenario modeling
- **Stack:** SQL, Snowflake, modern data workflows
- **AI:** ChatGPT (Projects, prompting), Claude, Gemini (NotebookLM)


## Experience
- phData (current) - Principal Analytics Consultant
- Softbank Robotics - Product Manager (Efficiency and Data Products) and Customer Experience Manager
- dwelo/Level Home - Data Analyst
- Former small business owner

## Connect
- LinkedIn: https://www.linkedin.com/in/carter-voekel/
- Workout Wednesday: https://workout-wednesday.com/author/cartervmac-com/
- Email: carterv@mac.com

## Projects

### 1. NPS Tool & Dashboard (Workout Wednesday)

Interactive dashboard that calculates Net Promoter Score and tracks trends over time.

- **Problem:** Make NPS usable beyond a single score, with trends and segmentation.
- **What I did:** Built an input-driven Sigma data app with score calc, filters, and trend view.
- **Tools:** Sigma (input tables, custom calcs, design, data apps, alerting)
- **Link:** [View challenge + walkthrough](https://workout-wednesday.com/2025-week-30-sigma-do-you-nps-why-yes/)


### 2. Custom Context Modal - Workout Wednesday
Right-click context menus that transform static cells into actionable insights, enabling external research and workflow triggers directly from the dashboard
- **Tools:** Sigma (input tables, actions, custom calcs, design, data apps)
- **[View Project](https://workout-wednesday.com/2025-week-26-sigma-context/)**

### 3. Sigma Notes App - Workout Wednesday
A Notion-like lightweight, no-code system for managing notes and reminders within Sigma
- **Tools:** Sigma (data apps, input tables, actions)
- **[View Project](https://workout-wednesday.com/2025-week-38-sigma-can-you-make-some-snotes/)**

### 4. Smart Allocation Modeler - Logistics & Planning
Simulates how to distribute limited inventory during a shortage. Use controls to test prioritization strategies and see the impact on order fulfillment.
- **Tools:** Sigma (data apps, input tables, actions, control elements)
  ![Smart Allocation Modeler Screenshot](project4-allocation/images/smart-allocation-model.png)

### Real-time Forecasting Tools

A set of forecasting views built in Sigma to project future demand based on historical data and user-driven assumptions. Designed for live scenario planning directly on top of warehouse data.

**Use case**  
Instead of exporting to Excel for every “what if” conversation, these tools let users adjust growth rates and assumptions in Sigma and instantly see the impact on future weeks.

**What it shows**  
- Historical time series at a weekly grain  
- Future periods generated on the fly  
- Growth models: flat, fixed growth %, and actuals-based growth  
- Controls for growth rate, horizon length, and scenario (baseline, optimistic, pessimistic)  
- Overlay of actuals vs. forecast for quick sanity checks  
- **Demo:** [View forecasting demo video](./WoWForecastvid.mp4)  
  (On GitHub: click “Download” or “View raw” to play)

<details>
  <summary><strong>Example logic / code</strong></summary>

<br>

```text
[GrowthRate] = 
  If([CE-GrowthRate] > 1, 
     [CE-GrowthRate] / 100, 
     [CE-GrowthRate])


## Workout Wednesday
- I'm a contributor to [Workout Wednesday Sigma Challenges](https://workout-wednesday.com/author/cartervmac-com/)

## Misc
- Foster Coordinator, [Dogs Matter](https://www.dogsmatter2.org/)
- Real estate investor
