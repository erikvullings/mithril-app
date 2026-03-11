# Mithril TypeScript Application Framework

## What This Is

A framework for building Mithril.js single-page applications using TypeScript and Materialize CSS. It provides a starter template with Meiosis state management pattern, routing, internationalization (Dutch/English), and role-based authentication. The application is a client-side SPA with localStorage persistence and optional GitHub Pages deployment.

## Core Value

Provide a minimal, typed foundation for building Mithril.js SPAs with proven patterns: Meiosis for state management, Mithril Materialized for UI, and a clear component/service separation.

## Requirements

### Validated

- ✓ Client-side SPA with Mithril.js v2.3.8 — existing
- ✓ Meiosis state management with meiosis-setup v6.2.3 — existing
- ✓ Routing with custom routing-service — existing
- ✓ Materialize CSS via mithril-materialized v3.14.5 — existing
- ✓ Internationalization with translate.js (en/nl) — existing
- ✓ LocalStorage persistence for model, user role, language — existing
- ✓ Role-based authentication (admin/editor/user) — existing
- ✓ Pages: LANDING, LOGIN, HOME, SETTINGS, ABOUT — existing

### Active

- [ ] Replace TODO placeholders on landing page with actual content
- [ ] Implement search functionality (currently returns empty results)
- [ ] Fix Settings persistence (service imported but not used)
- [ ] Remove or refactor Auth object attached to window
- [ ] Remove commented-out code from local-ldb.ts
- [ ] Improve type safety (reduce `any` type usage)

### Out of Scope

- Server-side backend — Client-only SPA by design
- Database integration — Uses browser storage only
- OAuth providers (Google/GitHub) — Custom localStorage auth only
- Mobile app — Web-first, desktop browser focus
- Real-time features — No WebSocket or server push
- Analytics tracking — No external services integrated

## Context

This is a monorepo using pnpm workspaces (single `packages/gui` package). The project uses:

- **Build:** Rspack 1.7.8 with SWC for TypeScript, Sass for CSS preprocessing
- **Development:** Port 65533, hot module replacement enabled
- **Production:** GitHub Pages compatible output to `docs/` directory
- **State:** Single immutable state tree via Meiosis Cell pattern
- **Components:** FactoryComponent pattern receiving cell as props

## Constraints

- **Tech Stack:** Mithril.js v2.3.8 (stable, lightweight), Meiosis-setup v6.2.3
- **UI Framework:** mithril-materialized v3.14.5 - Material Design components
- **Build Output:** Static files (no server-side rendering)
- **Browser Support:** ES6+ required, WebAssembly support for production builds
- **Storage Limit:** ~5-10MB localStorage capacity per domain

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Meiosis pattern over Redux | Meiosis provides cleaner unidirectional flow with Mithril | State management implemented |
| Custom routing over mithril-route | Routing service provides more control and i18n integration | Routing service created |
| localStorage for persistence | Simple, no backend required for MVP | Data persisted across sessions |
| TypeScript strict mode | Type safety catches errors early | Compile-time type checking |

---

*Last updated: 2026-03-11 after initialization*
