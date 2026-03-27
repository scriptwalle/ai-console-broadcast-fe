# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (output: dist/)
npm run lint      # ESLint check
npm run preview   # Preview production build locally
```

No test runner is configured.

## Architecture

**React 19 + Vite SPA** — no traditional router. Navigation is state-based: `App.jsx` holds an `activeView` string, and the sidebar updates it via `setActiveView`. Each view renders the corresponding module page.

### Module structure

Features live under `src/modules/`, each self-contained:

```
src/modules/<feature>/
  components/   # UI components
  hooks/        # Custom hooks (state + data fetching)
  pages/        # Top-level page components
  utils/        # Validation, constants, helpers
  index.jsx     # Public exports
```

The four modules are: `address-book`, `templates`, `campaigns`, `reports`.

### State management

- **ThemeContext** (`src/context/ThemeContext.jsx`) — global light/dark mode, auto-switches by time (6 AM–6 PM = light)
- **Per-module hooks** using `useReducer` — each module owns its data; no global store

### API layer

`src/services/api.js` — Axios wrapper that:
- Selects base URL from `VITE_API_ENV` env var (`dev` / `uat` / `prod`)
- Injects auth headers from `localStorage` (`authKey`, `groupId`) on every request
- Uses a non-REST convention: requests include `_action` and `_param` fields

`src/services/addressBookAPI.js` — module-specific API calls built on top of `api.js`.

### Authentication

Credentials are stored in `localStorage` via `src/utils/auth.js`. The `AuthModal` component (opened from `ProfileIcon`) is how users enter their API key and Group ID. All API requests automatically include these.

### Environment variables

Defined in `.env`:
```
VITE_API_ENV=dev
VITE_DEV_API_URL=http://localhost:8004/api/v4
VITE_UAT_API_URL=...
VITE_PROD_API_URL=...
```

### Styling

Tailwind CSS 4 via PostCSS. Theme uses CSS custom properties defined in `src/index.css`. Dark mode uses a `@custom-variant dark` directive (not the standard `class` strategy). React Select styles are also overridden in `index.css`.

### ESLint config

Flat config format (`eslint.config.js`). Unused variables starting with an uppercase letter are allowed (component names pattern).
