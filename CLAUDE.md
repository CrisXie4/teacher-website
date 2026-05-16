# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Teacher Toolkit (教师工具箱) — a collection of browser-based teaching tools (sound detector, roll call, timer, whiteboard, grouping, classroom game, chart generator, etc.). Built as a static multi-page site with vanilla HTML/CSS/JS (no bundler, no framework). Deployed to Vercel with optional Supabase backend for the teacher camera feature.

Primary language of code comments and UI defaults is Chinese (zh-CN), with i18n support for English, Spanish, and French.

## Development

**Local dev — pick one:**
```bash
npx serve                    # or any static file server
python -m http.server 8000   # alternative
```
Open `index.html` in a browser. Each tool lives in its own page under `src/pages/`.

**Camera signaling server (optional, only for teacher-camera feature):**
```bash
node src/js/server-local.js          # uses Supabase (needs SUPABASE_URL, SUPABASE_ANON_KEY)
# or
node api/server.js                   # local-only variant using in-memory storage
```
Server runs on port 3000 by default.

**No build step, no linter, no test runner.** Changes take effect on browser refresh (append `?v=<version>` to bust cache if needed — current version is in `APP_VERSION` in `src/js/index.js`).

## Architecture

### Page structure
- `index.html` — homepage with tool cards grid, student management panel, announcements, donation modal, Spring Festival / Teachers' Day decorations, and PWA install prompt.
- `src/pages/*.html` — individual tool pages, each self-contained with inline or page-specific JS.
- `src/css/styles.css` — shared design tokens and base styles (CSS custom properties, dark mode via `.dark-mode`).
- `src/css/index.css` — homepage-specific styles.

### Key JS modules (all loaded via `<script defer>`, no module system)
- **`src/js/index.js`** — homepage controller: navigation, tool search, student CRUD UI, theme toggle, Spring Festival logic, fireworks, announcement loading (from `GONGGAO.md`), PWA install, service worker registration, donation modal, Umami analytics lazy-load.
- **`src/js/i18n.js`** — i18n IIFE. Translations are inline objects keyed by `zh`/`en`/`es`/`fr`. DOM elements use `data-lang` attributes for text, `data-lang-placeholder` for placeholders, `data-lang-title` for titles. Language cycles through `zh → en → es → fr` on button click. Stored in `localStorage('preferredLanguage')`.
- **`src/js/student-manager.js`** — `StudentManager` singleton. Persists student list to `localStorage('teacher_toolkit_students')`. Supports CSV/JSON/TXT import, export, backup/restore. Shared across homepage and tool pages.
- **`src/js/performance-optimizer.js`** — `PerformanceOptimizer` singleton for pausing animations/intervals when page is hidden.

### Teacher Camera (WebRTC)
Two deployment modes:
1. **Local** — `src/js/server-local.js` (Express + WebSocket + Supabase for room persistence). Teacher uses `teacher-camera.html` on phone, viewer uses `viewer.html` on desktop.
2. **Vercel** — `api/server.js` (Express + WS, in-memory rooms) + `*-vercel.html` pages. Vercel serverless functions in `api/` directory (`vercel.json` configures 300s max duration).

### PWA & Service Worker
- `manifest.json` — standalone PWA config.
- `sw.js` — cache-first strategy for core assets, network-first for API/analytics. Version tracked via `CACHE_VERSION` (keep in sync with `APP_VERSION`).

### Versioning
`APP_VERSION` in `src/js/index.js` and `CACHE_VERSION` in `sw.js` must stay in sync. On version mismatch the client clears caches and re-registers the service worker.

## Conventions

- **No build/bundle** — all JS is vanilla ES6+, loaded via `<script defer>`. No imports in browser code.
- **Server-side code** (under `api/` and `src/js/server-local.js`, `src/js/supabase-config.js`) uses CommonJS `require()`.
- **CSS custom properties** defined in `:root` in `styles.css`; dark mode overrides in `.dark-mode` selector.
- **i18n** — when adding UI text, add the key to both `zh` and `en` objects in `src/js/i18n.js`, use `data-lang="key"` on the element. For JS-initiated text, use `window.i18n.getTranslation('key')`.
- **Student data** flows through `StudentManager` — never access `localStorage` directly for student data.
- **Navigation** from the homepage goes through `navigateTo()` which may intercept for donation modals or redirect context.
