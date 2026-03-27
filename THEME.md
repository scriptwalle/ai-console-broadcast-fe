Update the existing React (Vite + JS + Tailwind) project to implement a Tailwind-compatible theme system with automatic light/dark mode switching based on time.

========================
TAILWIND + CSS VARIABLES
========================

1. Create a global theme file:

* src/styles/theme.css

Add:

@layer base {
:root {
--bg-main: #0B0F1A;
--bg-surface: #111827;
--bg-card: #1F2937;

```
--text-primary: #FFFFFF;
--text-secondary: #A1A1AA;

--accent-purple: #6D5EF3;
--accent-blue: #4F7CFF;

--gradient-ai: linear-gradient(135deg, #6D5EF3, #4F7CFF);

--border: rgba(255,255,255,0.08);
--glass: rgba(255,255,255,0.03);
```

}

.light {
--bg-main: #F8FAFC;
--bg-surface: #FFFFFF;
--bg-card: #F1F5F9;

```
--text-primary: #0F172A;
--text-secondary: #475569;

--border: rgba(0,0,0,0.08);
--glass: rgba(0,0,0,0.02);
```

}

.dark {
--bg-main: #0B0F1A;
--bg-surface: #111827;
--bg-card: #1F2937;

```
--text-primary: #FFFFFF;
--text-secondary: #A1A1AA;

--border: rgba(255,255,255,0.08);
--glass: rgba(255,255,255,0.03);
```

}

body {
@apply bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300;
}
}

========================
TAILWIND CONFIG
===============

2. Update tailwind.config.js:

export default {
darkMode: "class",
theme: {
extend: {
colors: {
bg: "var(--bg-main)",
surface: "var(--bg-surface)",
card: "var(--bg-card)",
primary: "var(--text-primary)",
secondary: "var(--text-secondary)",
border: "var(--border)",
},
backgroundImage: {
"ai-gradient": "var(--gradient-ai)",
}
}
}
}

========================
AUTO THEME SWITCHING
====================

3. Create:

* src/utils/theme.js

export const getThemeByTime = () => {
const hour = new Date().getHours();
return hour >= 6 && hour < 18 ? "light" : "dark";
};

export const applyTheme = (theme) => {
const root = document.documentElement;
root.classList.remove("light", "dark");
root.classList.add(theme);
};

4. Initialize in App.jsx:

import { useEffect } from "react";
import { getThemeByTime, applyTheme } from "./utils/theme";

useEffect(() => {
const theme = getThemeByTime();
applyTheme(theme);
}, []);

========================
TAILWIND USAGE (IMPORTANT)
==========================

5. Replace hardcoded styles with Tailwind + variables:

Instead of:

* bg-gray-900 → bg-bg
* text-white → text-primary
* border-gray-700 → border-border

Use:

className="bg-bg text-primary border border-border"

========================
AI BUTTON STYLE
===============

6. Gradient button:

className="bg-ai-gradient text-white rounded-xl px-4 py-2"

========================
CARD (GLASS STYLE)
==================

7. Card:

className="bg-[var(--glass)] border border-border backdrop-blur-md rounded-2xl"

========================
INPUT STYLE
===========

8. Inputs:

className="bg-transparent border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"

========================
PREVIEW PAGE ALIGNMENT
======================

9. Ensure Template Preview uses:

* bg-surface / bg-card
* gradient for highlights
* consistent typography

Channel styling:

* WhatsApp → bg-surface + rounded chat bubbles
* SMS → minimal text bubble
* Email → bg-card with structured layout

========================
CONSTRAINTS
===========

* Do NOT remove Tailwind usage
* Do NOT rewrite components
* Only replace colors with variables
* Keep UI minimal (AI agent style)
* Desktop-first only

========================
DELIVERABLE
===========

* Tailwind-compatible theme system
* Auto theme switching (time-based)
* Unified color system across app
