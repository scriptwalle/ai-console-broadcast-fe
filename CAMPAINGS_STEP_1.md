Extend the existing React (Vite + JavaScript + Tailwind) project in the CURRENT DIRECTORY.

DO NOT implement full campaign logic yet.

========================
GOAL (STEP 1 ONLY)
========================

Set up the basic Campaigns module:
- Navigation
- Campaign List Page
- Basic Create Campaign flow (only 3 steps, minimal logic)

========================
1. SIDEBAR INTEGRATION
========================

Under:
Broadcast → Campaigns

- Add navigation route for Campaigns

========================
2. CAMPAIGN LIST PAGE
========================

Create:

- src/modules/campaigns/CampaignsList.jsx

Features:

- Table with columns:
  - Campaign Name
  - Channel
  - Status (just show static for now)
  - Scheduled Time (can be placeholder)
  - Actions (View / Edit)

- Add "Create Campaign" button (top-right)

- If no campaigns:
  - Show empty state with CTA

Use mock data (hardcoded state is fine)

========================
3. CREATE CAMPAIGN PAGE (BASIC)
========================

Create:

- src/modules/campaigns/CreateCampaign.jsx

Implement ONLY 3 steps (no scheduling yet):

STEP 1: SELECT CHANNEL
- Options:
  - WhatsApp
  - SMS
  - Email

STEP 2: SELECT TEMPLATE
- Show list of templates (mock or from existing state)
- Filter based on selected channel

STEP 3: SELECT TARGET GROUPS
- Multi-select groups (mock or reuse Address Book groups)

========================
4. VALIDATION (BASIC ONLY)
========================

- All 3 fields required:
  - Channel
  - Template
  - Target group(s)

- Show simple field-level errors

========================
5. NAVIGATION FLOW
========================

- "Create Campaign" → opens CreateCampaign page
- After completing steps:
  - Just log data or store in state
  - Redirect back to Campaign List

(No scheduling, no execution yet)

========================
6. UI / UX
========================

- Use stepper UI (simple)
- Keep Agentic AI neutral theme
- Use existing components where possible

========================
7. CONSTRAINTS
========================

- DO NOT implement:
  - Scheduling
  - Lapse logic
  - Campaign lifecycle
  - Execution simulation

- Keep everything minimal and working

========================
DELIVERABLE
========================

- Campaigns menu working
- Campaign list page
- Basic 3-step campaign creation flow
- Navigation fully functional