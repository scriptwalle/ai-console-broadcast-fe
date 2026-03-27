# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

No test framework is configured.

## Architecture

React 19 + Vite SPA with no client-side router. Navigation is managed via `activeView` state in `App.jsx` using a switch statement. Theme (light/dark/auto) is provided via `ThemeContext`.

### Module Structure

All feature code lives in `src/modules/`, divided into four modules:

- **address-book** — contacts and groups management
- **templates** — multi-channel message templates (WhatsApp, SMS, Email) with approval workflow
- **campaigns** — 5-step creation wizard (Channel → Template → Details → Recipients → Schedule) plus campaign list
- **reports** — campaign analytics and reporting

Each module follows the same internal layout: `index.jsx` (entry/page export), `pages/`, `components/`, `hooks/`, `utils/`.

### State Management

Each module manages its own state via custom hooks using `useReducer` (e.g., `useTemplates`, `useCampaigns`, `useReports`). No Redux or global app state store. Theme is the only global state via Context API.

### API Layer

All API calls go through `src/services/api.js`. The `APIWrapper` class POSTs to a single endpoint (`/apiai`) with an action-based protocol:

```js
{
  data: {
    _action: "action_name",
    _param: { group_id: "...", ...params }
  }
}
```

The axios instance auto-injects the `authorization` header from `localStorage` via a request interceptor. Auth credentials (`authKey`, `groupId`) are managed in `src/utils/auth.js`.

### Environment

API environment is controlled by `VITE_API_ENV` (values: `dev`, `uat`, `prod`). URLs are set via `VITE_DEV_API_URL`, `VITE_UAT_API_URL`, `VITE_PROD_API_URL` in `.env`.

### Styling

Tailwind CSS v4 with dark mode via `.dark` class on `<html>`. Use `dark:` variants for dark mode styles. Theme auto-mode switches based on time (6am–6pm = light, else dark).
