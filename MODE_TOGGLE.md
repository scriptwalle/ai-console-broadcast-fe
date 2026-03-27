Extend the existing React (Vite + JavaScript + Tailwind) project in the CURRENT DIRECTORY.

========================
FEATURE: DARK / LIGHT MODE
========================

Add a global theme toggle (Light ↔ Dark mode) across the entire application.

-----------------------------------
1. THEME SETUP
-----------------------------------

- Use Tailwind's "class" strategy for dark mode
- Enable dark mode via `class` on <html> or <body>

-----------------------------------
2. TOGGLE IMPLEMENTATION
-----------------------------------

- Add a toggle button in the top navbar/header (or sidebar top)
- Toggle between:
  - Light Mode (default)
  - Dark Mode

- Use icons (lucide-react preferred):
  - Sun icon → Light mode
  - Moon icon → Dark mode

-----------------------------------
3. STATE MANAGEMENT
-----------------------------------

- Store theme preference in:
  - localStorage (persist across reloads)

- On app load:
  - Read saved theme
  - Apply correct class (dark / light)

-----------------------------------
4. STYLING (IMPORTANT)
-----------------------------------

Update existing UI to support both themes:

Light Mode (existing):
- Keep current Agentic AI neutral theme

Dark Mode:
- Background: dark gray / near black (#020617 / #0F172A)
- Cards: slightly lighter dark (#111827)
- Text:
  - Primary: light gray (#E5E7EB)
  - Secondary: muted gray (#9CA3AF)
- Borders: subtle dark (#1F2937)

-----------------------------------
5. COMPONENT COVERAGE
-----------------------------------

Ensure dark mode works across:

- Sidebar
- Tables (Contacts, Groups, Reports)
- Forms & Inputs
- Modals
- Buttons
- Template editors (WhatsApp, SMS, Email previews)

-----------------------------------
6. UX DETAILS
-----------------------------------

- Smooth transition between themes (150–300ms)
- Maintain readability and contrast
- Keep neutral, non-flashy colors (no neon)

-----------------------------------
7. STRUCTURE
-----------------------------------

Suggested:

- src/context/ThemeContext.jsx (or simple global state)
- src/hooks/useTheme.js
- src/components/ThemeToggle.jsx

-----------------------------------
8. CONSTRAINTS
-----------------------------------

- Do NOT change functionality
- Only enhance UI with theming
- Keep code modular and clean
- Desktop-only UI

-----------------------------------
DELIVERABLE
-----------------------------------

- Fully working dark/light mode toggle
- Theme persists across reloads
- Entire app supports both themes consistently