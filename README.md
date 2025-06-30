# MacroView Canvas & Dashboard Prototype

A first-pass, fully-branded prototype of an embedded Canvas for AI-agent workflows and a companion dashboard overview — built to demonstrate drag-and-drop macro creation, side-drawer customization, and high-level insights.

---

## 📦 Project Structure

- **Canvas Macro Builder**  
  - Drag-and-drop node palette (Agents, Control Flow, Data & Knowledge, Collaboration)  
  - Configurable nodes:  
    - API Agent  
    - LLM Agent  
    - Webhook Agent  
    - Decision  
    - Loop  
    - Parallel  
    - KB Lookup  
    - Database Query  
    - Cache/State  
    - Note  
    - Comment  
  - Live side-drawer for each node type with inputs, constraints, and previews  
  - Real-time card re-render on save (badges, summaries, icons)

- **Dashboard Overview**  
  - Top-line metric cards (Cells Online, Macros Active, Runs Today & Success Rate)  
  - Mini-cards for performance (Avg Execution Time, Error Rate by Node Type)  
  - Leaderboard of Top 5 Macros by run count  
  - “Unmapped Intents” table with frequency and quick-create actions  
  - Alerts banner for disconnected Cells or approval latency  

- **Finer Sidebar**  
  - **Workspace header**: logo, global search  
  - **Navigation**: Overview, Macros, Templates, Analytics, Integrations, Settings  
  - **Nested Macros menu**: Categories (Order Processing, Inventory, Notifications, Shipping) → individual workflows  
  - **Cells list**: Active API integrations (Orders, Inventory, Users, Shipping, Notifications, Billing)  
  - **Support & Docs**: in-app help, tutorials, API reference  

---



## Getting Started

1. **Clone & install**  
   ```bash
   git clone https://github.com/your-org/macroview-canvas.git
   cd macroview-canvas
   npm install
   ```

2. **Run locally**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` on desktop.

## Next Steps

* Connect real APIs
* Persist macro definitions
* Hook up analytics & alerts

## Contact

* Anthony (Founder)
* Jai (Co-Founder)
* Daniel: dbabs297@gmail..com

