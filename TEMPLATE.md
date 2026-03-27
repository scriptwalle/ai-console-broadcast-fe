Update the existing Templates module in the current React (Vite + JS + Tailwind) project.

Keep everything as-is (UI, forms, styling), and extend the flow with a proper preview experience.

========================
FLOW (FINAL EXPECTATION)
========================

1. Templates Landing Page
- Show list/table of templates (if present)
- Show empty state if none exist
- Include "Create Template" button

2. Create Template Flow
- Step 1: Select Template Type (WhatsApp / SMS / Email)
- Step 2: Fill Template Form (already implemented)

3. NEW: Preview Step (IMPORTANT)
- After user fills template form, add a "Preview" action/button
- This should navigate to a dedicated Preview Page

========================
TEMPLATE PREVIEW PAGE
========================

Create a new page:
- Shows a fully rendered preview of the template

Channel-specific preview:

1. WhatsApp Preview
- Render as WhatsApp chat UI
- Show message bubble with content
- Render placeholders with mock data:
  - {{user_name}} → "John Doe"
  - {{phone_number}} → "9876543210"
- Show media (if attached) inside chat bubble

2. SMS Preview
- Render as SMS-style message
- Plain text bubble
- Replace placeholders with mock data

3. Email Preview
- Render like an email client:
  - Subject at top
  - Body below
- Render formatted content
- Show inline images and attachments preview

========================
PREVIEW FEATURES
========================

- Use mock/sample data for placeholder substitution
- Ensure preview looks realistic (same UI as editor style)
- Add "Back to Edit" button
- Add "Save Template" button (final step)

========================
TEMPLATE LIST INTEGRATION
========================

- From Templates list:
  - Each template should have a "Preview" action
  - Clicking it opens the same preview page (read-only mode)

========================
IMPLEMENTATION NOTES
========================

- Reuse existing UI components where possible
- Keep preview component reusable across:
  - Create flow
  - List preview

Suggested structure:
- src/modules/templates/preview/TemplatePreview.jsx

========================
CONSTRAINTS
========================

- Do NOT break existing functionality
- Keep Agentic AI neutral theme
- Desktop-only UI
- Clean routing/navigation

========================
DELIVERABLE
========================

- Dedicated Template Preview Page
- Integrated into create/edit flow
- Accessible from template list
- Realistic channel-specific preview experience