# Codebase Structure

**Analysis Date:** 2026-03-11

## Directory Layout

```
packages/gui/
├── src/
│   ├── app.ts                          # Main entry point
│   ├── env.ts                          # Environment variables
│   ├── assets/                         # Static assets (images, svg)
│   │   ├── background.jpg
│   │   └── logo.svg
│   ├── css/
│   │   └── style.css                  # Custom styles
│   ├── models/                        # Data models and types
│   │   ├── index.ts                   # Barrel exports
│   │   ├── page.ts                    # Page enum and Page interface
│   │   ├── settings.ts                # Settings type
│   │   └── data-model.ts              # DataModel interface
│   ├── components/                    # UI components
│   │   ├── index.ts                   # Barrel exports
│   │   ├── layout.ts                  # Layout component (navbar, sidenav)
│   │   ├── landing-page.ts            # Landing page component
│   │   ├── home-page.ts               # Home page component
│   │   ├── about-page.ts              # About page component
│   │   ├── settings-page.ts           # Settings page component
│   │   └── ui/                        # Reusable UI components
│   │       ├── preloader.ts
│   │       └── language-switcher.ts
│   ├── services/                      # Business logic and services
│   │   ├── index.ts                   # Barrel exports
│   │   ├── meiosis.ts                 # State management and actions
│   │   ├── routing-service.ts         # Route definitions and navigation
│   │   ├── translations.ts            # i18n service
│   │   ├── login-service.ts           # Authentication and roles
│   │   └── lang/                      # Translation files
│   │       ├── index.ts               # Language barrel exports
│   │       ├── en.ts                  # English translations
│   │       └── nl.ts                  # Dutch translations
│   ├── utils/                         # Utility functions
│   │   ├── index.ts                   # Barrel exports
│   │   ├── local-ldb.ts               # IndexedDB wrapper (async)
│   │   └── *.d.ts                     # Type declarations for assets
│   └── favicon.ico                    # Application icon
├── dist/                              # Development output (gitignored)
├── docs/                              # Production output (gitignored)
├── package.json
├── tsconfig.json
└── rspack.config.ts
```

## Directory Purposes

### `packages/gui/src/`

**Purpose:** Root source directory containing all TypeScript source code

**Contains:** Entry point, models, services, components, utils, CSS, assets

**Key Files:**
- `app.ts`: Application bootstrap

### `packages/gui/src/models/`

**Purpose:** Type definitions and data structures

**Contains:** TypeScript interfaces, enums, and type aliases

**Key Types:**
- `Page` interface (packages/gui/src/models/page.ts)
- `Pages` enum (packages/gui/src/models/page.ts)
- `DataModel` interface (packages/gui/src/models/data-model.ts)
- `Settings` type (packages/gui/src/models/settings.ts)
- `UserRole` type (packages/gui/src/services/login-service.ts)

### `packages/gui/src/components/`

**Purpose:** UI component definitions

**Contains:** Meiosis components that receive cell state and actions as props

**Patterns:**
- Components export `MeiosisComponent` type
- Each file exports one main component
- Page components use `oninit` to set current page
- Layout component wraps page components with navbar/sidenav

**Key Components:**
- `Layout`: Navbar, sidenav, search modal wrapper
- `LandingPage`: Introduction page
- `HomePage`: Main application page
- `AboutPage`: Role selection page
- `SettingsPage`: Settings page
- `LanguageSwitcher`: Language selector component

### `packages/gui/src/services/`

**Purpose:** Business logic, state management, and external integrations

**Contains:** Service implementations, actions, routing, i18n, authentication

**Key Services:**
- `meiosis.ts`: State management with actions and services
- `routing-service.ts`: Route definitions and navigation helper
- `translations.ts`: i18n with translate.js
- `login-service.ts`: Authentication and role management

### `packages/gui/src/services/lang/`

**Purpose:** Translation files for each supported language

**Contains:** Translation message objects

**Key Files:**
- `en.ts`: English translation messages
- `nl.ts`: Dutch translation messages

### `packages/gui/src/utils/`

**Purpose:** Reusable utility functions

**Contains:** Pure functions for string manipulation, date formatting, storage operations

**Key Functions:**
- `subSup()`: Markdown-style subscript/superscript conversion
- `debounce()`: Debounce function wrapper
- `formatDate()`: Date formatting to YYYY-MM-DD
- `deepCopy()`: Deep clone function
- `isActivePage()`: Page active state checker
- `isSmallPage()`: Responsive breakpoint checker
- `local-ldb.ts`: IndexedDB wrapper

### `packages/gui/src/css/`

**Purpose:** CSS styling

**Contains:** Custom styles that override or extend Materialize CSS

**Key Files:**
- `style.css`: Custom styles

### `packages/gui/src/assets/`

**Purpose:** Static assets

**Contains:** Images, SVGs, and other static files

**Key Files:**
- `logo.svg`: Application logo
- `background.jpg`: Landing page background

## Key File Locations

### Entry Points

**Main Entry:**
- `packages/gui/src/app.ts`: Application bootstrap, i18n init, routing init

### Configuration

**Build:**
- `packages/gui/rspack.config.ts`: Rspack build configuration with SWC, Sass, assets

**TypeScript:**
- `packages/gui/tsconfig.json`: TypeScript configuration with ES6 target, strict mode

### Core Logic

**State Management:**
- `packages/gui/src/services/meiosis.ts`: Cell state, actions, services

**Routing:**
- `packages/gui/src/services/routing-service.ts`: Route definitions, navigation

**Translations:**
- `packages/gui/src/services/translations.ts`: i18n service
- `packages/gui/src/services/lang/en.ts`: English translations
- `packages/gui/src/services/lang/nl.ts`: Dutch translations

**Authentication:**
- `packages/gui/src/services/login-service.ts`: Auth object, role checks

## Naming Conventions

### Files

**Components:** `kebab-case` for page components (e.g., `landing-page.ts`)

**Services:** `snake_case` for services (e.g., `routing-service.ts`, `login-service.ts`)

**Utilities:** `snake_case` for utilities (e.g., `local-ldb.ts`)

**Models:** `PascalCase` for types (e.g., `data-model.ts`, `settings.ts`)

**Language Files:** `locale code` only (e.g., `en.ts`, `nl.ts`)

### Directories

**All lowercase** with `kebab-case` or `snake_case` (e.g., `components/`, `services/`, `lang/`, `ui/`)

### Code Patterns

**Variables/Functions:** `camelCase` (e.g., `searchFilter`, `deepCopy`, `formatDate`)

**Constants:** `SCREAMING_SNAKE_CASE` (e.g., `LANGUAGE`, `SAVED`, `MODEL_KEY`)

**Types/Interfaces:** `PascalCase` (e.g., `State`, `DataModel`, `MeiosisComponent`)

**Enums:** `PascalCase` (e.g., `Pages`, `UserRole`)

**CSS Classes:** `kebab-case` (e.g., `nav-wrapper`, `brand-logo`)

## Where to Add New Code

### New Feature (Page + Logic)

1. **Create Page Component:**
   - File: `packages/gui/src/components/my-feature-page.ts`
   - Export `MeiosisComponent`

2. **Add Page to Enum:**
   - File: `packages/gui/src/models/page.ts`
   - Add to `Pages` enum

3. **Register Route:**
   - File: `packages/gui/src/services/routing-service.ts`
   - Add to routes array in `init()`

4. **Export Component:**
   - File: `packages/gui/src/components/index.ts`
   - Add export statement

### New Utility Function

**File:** `packages/gui/src/utils/feature-name.ts` or add to existing `index.ts`

**Export:** Add to `packages/gui/src/utils/index.ts`

### New Service

**File:** `packages/gui/src/services/service-name.ts`

**Export:** Add to `packages/gui/src/services/index.ts`

### New UI Component (Reusable)

**File:** `packages/gui/src/components/ui/component-name.ts`

**Export:** Add to barrel if needed

### New Translation

**File:** `packages/gui/src/services/lang/en.ts` (English)
**File:** `packages/gui/src/services/lang/nl.ts` (Dutch)

## Special Directories

### `node_modules/`

**Purpose:** pnpm workspace dependencies

**Generated:** Yes (via `pnpm i`)

**Committed:** No (.gitignore)

### `dist/`

**Purpose:** Rspack development build output

**Generated:** Yes (via `npm run dev`)

**Committed:** No (.gitignore)

### `docs/`

**Purpose:** Rspack production build output (GitHub Pages)

**Generated:** Yes (via `npm run build`)

**Committed:** No (.gitignore)

---

*Structure analysis: 2026-03-11*
