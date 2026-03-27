Update the existing Campaigns module in the current React (Vite + JavaScript + Tailwind) project.

Build on top of Step 1 (basic campaign creation flow already exists).

========================
GOAL (STEP 2)
========================

Enhance campaign creation with:
- Scheduling
- Validations
- Scalable recipient selection
- Template filtering
- Dynamic variables handling
- Inline preview

DO NOT implement execution simulation or lifecycle actions.

========================
1. CHANNEL → TEMPLATE FILTERING
========================

- After selecting channel:
  - Show ONLY templates:
    - Matching selected channel
    - Status = "Approved" or "Active"

- Exclude:
  - Pending
  - Rejected
  - Inactive

========================
2. CAMPAIGN DETAILS
========================

Add:
- Campaign Name (required)

========================
3. RECIPIENT SELECTION (SCALABLE)
========================

IMPORTANT: Do NOT load all contacts/groups.

Implement:

A. Search-Based Selection
- Search input for:
  - Contacts (name / phone / email)
  - Groups (name)

- Simulate API:
  - searchContacts(query, page)
  - searchGroups(query, page)

- Show paginated results

- Allow selecting from results

-----------------------------------

B. Selected State
Maintain:

- selectedContacts = []
- selectedGroups = []

Display:
- Selected items as tags/chips

-----------------------------------

C. Select All (REPLACEMENT LOGIC)

Replace "Select All" with:

- Toggle:
  - "Target All Contacts"
  - "Target All Groups"

Store flags:
- selectAllContacts: boolean
- selectAllGroups: boolean

-----------------------------------

D. Count Display

DO NOT compute full unique count.

Show:
- "X contacts selected"
- "Y groups selected"

Optional:
- "Estimated reach" (mock value)

-----------------------------------

E. NOTE

- Deduplication is NOT frontend responsibility
- Assume backend handles duplicates

========================
4. TEMPLATE PREVIEW (INLINE)
========================

- Show preview panel (side or below)

Render based on channel:

- WhatsApp → chat UI
- SMS → simple message bubble
- Email → email layout

- Replace placeholders with mock values

========================
5. DYNAMIC VARIABLES INPUT
========================

- Parse template content for placeholders

Ignore:
- {{user_name}}
- {{phone_number}}
- {{email_id}}

For remaining variables:
- Generate dynamic input fields

Example:
{{otp}} → input field

========================
6. SCHEDULING
========================

Options:

A. Run Now
- Schedule time = current time + 1–2 minutes buffer

B. Run Later
- Show datetime picker

Validation:
- Must be future time

========================
7. LAPSE TIME
========================

- Datetime picker

Validation:
- Must be AFTER scheduled time

========================
8. FINAL REVIEW STEP
========================

Show summary:

- Campaign Name
- Channel
- Template
- Selected recipients (counts only)
- Variables
- Schedule time
- Lapse time

Add:
- "Schedule Campaign" button

========================
9. VALIDATIONS
========================

Required:
- Channel
- Template
- Campaign Name
- At least one recipient (or selectAll flag)
- Schedule time
- Lapse time

Block submission if invalid.

========================
10. SAVE BEHAVIOR
========================

- On submit:
  - Save campaign in state
  - Status = "Scheduled"

- Redirect to Campaign List

========================
CONSTRAINTS
========================

- Do NOT:
  - Load full datasets
  - Compute exact recipient count
  - Implement lifecycle or execution

- Maintain:
  - Agentic AI theme
  - Desktop-only UI
  - Clean modular code

========================
DELIVERABLE
========================

- Fully working scalable scheduling flow
- Search-based recipient selection
- Dynamic variable handling
- Inline preview
- Campaign saved as Scheduled