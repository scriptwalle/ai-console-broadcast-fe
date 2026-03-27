Extend the existing React (Vite + JavaScript + Tailwind) project in the CURRENT DIRECTORY.

Add a new submenu under:
Broadcast → Reports & Analytics

========================
FEATURE: REPORTS & ANALYTICS
========================

Build a Campaign Reports & Analytics module.

-----------------------------------
1. NAVIGATION
-----------------------------------

- Add new sidebar item under Broadcast:
  - Reports & Analytics

- Clicking it should open:
  - Campaign Reports Listing Page

-----------------------------------
2. CAMPAIGN REPORTS LIST PAGE
-----------------------------------

- Display list of campaigns (mock data is fine)
- Each row should include:
  - Campaign Name
  - Channel (WhatsApp / SMS / Email)
  - Status (Completed / Partial)
  - Date

- Add "View Report" action for each campaign

-----------------------------------
3. CAMPAIGN REPORT PAGE
-----------------------------------

When user clicks "View Report":

-----------------------------------
A. AGGREGATE METRICS (TOP SECTION)
-----------------------------------

Display the following:

- Total Recipients
- Total Sent
- Total Delivered
- Total Read / Opened
- Total Failed

Each metric should show:
- Count
- Percentage (calculated against Total Recipients)

UI:
- Use cards (clean dashboard style)
- Consistent spacing + neutral theme

-----------------------------------
B. RECIPIENT-LEVEL BREAKDOWN
-----------------------------------

Table with:

- Contact Name
- Identifier (Phone / Email)
- Channel
- Delivery Status

Features:
- Search (by name / identifier)
- Filter (by status)

-----------------------------------
C. CHANNEL-SPECIFIC STATUSES
-----------------------------------

Ensure statuses follow rules:

- WhatsApp:
  - Sent, Delivered, Read, Failed

- SMS:
  - Sent, Delivered, Failed

- Email:
  - Delivered, Opened, Failed

DO NOT mix statuses across channels.

-----------------------------------
D. REAL-TIME STATUS UPDATE (SIMULATION)
-----------------------------------

- Simulate webhook updates:
  - Use setTimeout / interval to update status dynamically
  - Reflect updates in UI

-----------------------------------
E. IMMUTABLE REPORT DATA (SIMULATION)
-----------------------------------

- Once a campaign report is generated:
  - Data should NOT change if contacts/groups are modified
  - Keep a snapshot of data at "execution time"

-----------------------------------
F. EXECUTION SNAPSHOT LOGIC
-----------------------------------

- Store recipient list snapshot when campaign is "executed"
- Even if:
  - Contact deleted later
  - Group modified later
→ Report remains unchanged

-----------------------------------
4. UI / UX
-----------------------------------

- Clean dashboard-style layout
- Use cards for metrics
- Table for breakdown
- Maintain Agentic AI neutral theme
- Desktop-only UI

-----------------------------------
5. STATE MANAGEMENT
-----------------------------------

- Use in-memory state (useState/useReducer)
- Mock campaign + report data
- Simulate API behavior

-----------------------------------
6. STRUCTURE
-----------------------------------

- src/modules/reports/
  - ReportsList.jsx
  - CampaignReport.jsx
  - components/
  - utils/

-----------------------------------
DELIVERABLE
-----------------------------------

- New submenu: Broadcast → Reports & Analytics
- Campaign list page
- Detailed campaign report page
- Aggregate metrics + recipient breakdown
- Simulated real-time updates
- Immutable snapshot behavior