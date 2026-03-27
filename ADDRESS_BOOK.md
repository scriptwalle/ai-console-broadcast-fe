Extend the existing React (Vite + JavaScript + Tailwind) project in the CURRENT DIRECTORY.

Add a new feature module under the existing "Broadcast → Address Book" section.

========================
FEATURE: ADDRESS BOOK
========================

Create a complete Address Book system with two sections:
1. Contacts
2. Groups

-----------------------------------
1. CONTACTS MODULE
-----------------------------------

Build UI + logic for managing contacts.

Fields for Contact:
- Full Name (required)
- Email Address (required)
- Phone Number (required, exactly 10 digits)
- WhatsApp Number (optional, exactly 10 digits if provided)

Features:

1. Create Contact (Form UI)
- Form-based UI to add a single contact
- Validate required fields
- Validate Phone & WhatsApp: must be numeric and exactly 10 digits
- Show field-level validation errors
- On success → add to contact list

2. Contact List View
- Display all contacts in a table/list
- Show all fields
- Include Edit and Delete actions

3. Edit Contact
- Allow updating all fields
- Persist and reflect immediately in UI

4. Delete Contact
- Remove contact from list
- (No need to implement backend persistence, simulate in-memory state)

5. Bulk Upload (CSV/Excel simulation)
- Allow file upload (CSV is enough)
- Parse file and extract contacts
- Validate each row:
  - Skip invalid rows
  - Import valid rows
- Show summary:
  - Total imported
  - Total skipped

6. Error Handling for Bulk Upload
- Generate an error report (in UI or downloadable JSON/text)
- Include:
  - Row number
  - Error reason

7. Group Assignment During Upload
- If row includes group name:
  - If group exists → assign contact
  - If not → mark as error

8. Simulate Email Notification
- After bulk upload with errors:
  - Simulate email by showing a "Send Report" UI or console log

-----------------------------------
2. GROUPS MODULE
-----------------------------------

Build UI + logic for managing groups.

Features:

1. Create Group
- Unique group name required
- Prevent duplicates
- Show error if duplicate

2. Group List
- Display all groups

3. Add Contacts to Group
- Multi-select contacts
- Add to group

4. Contact in Multiple Groups
- Allow same contact in multiple groups

5. Remove Contact from Group
- Remove only from group (not from contacts)

6. Delete Group
- Delete group only
- Contacts remain unaffected

7. Group Membership View
- Show contacts inside each group

-----------------------------------
GENERAL IMPLEMENTATION NOTES
-----------------------------------

- Use React functional components
- Use useState/useReducer for state (no backend required)
- Keep data in memory (simulate API behavior)
- Use Tailwind for styling
- Clean, modular structure

Suggested structure:
- src/modules/address-book/
  - components/
  - pages/
  - hooks/
  - utils/
- src/modules/address-book/Contacts.jsx
- src/modules/address-book/Groups.jsx

Optional:
- Use simple context or global state if needed

-----------------------------------
UX NOTES
-----------------------------------

- Desktop-first (no mobile support required)
- Clean admin dashboard style
- Tables + modals/forms preferred
- Use icons (lucide-react)

-----------------------------------
DELIVERABLE
-----------------------------------

Fully working Address Book UI inside:
Broadcast → Address Book

All features should be usable and testable in UI.