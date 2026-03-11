# Architecture

**Analysis Date:** 2026-03-11

## Pattern Overview

**Overall:** Meiosis Pattern (a variant of Redux/Elm)

**Key Characteristics:**
- Single immutable state tree managed by `meiosis-setup`
- Actions are pure functions that update state via cell updates
- Services react to state changes asynchronously
- Components receive cell state as props and use actions to update state
- State changes trigger automatic re-rendering via `m.redraw()`

## Layers

### Application Layer

**Purpose:** Root entry point and initialization
**Location:** `packages/gui/src/app.ts`
**Contains:** Main application bootstrap, i18n initialization, language change listeners, routing initialization
**Depends on:** All services, routing, i18n
**Used by:** None (entry point)

### State Management Layer

**Purpose:** Global state and actions
**Location:** `packages/gui/src/services/meiosis.ts`
**Contains:**
- `State` interface: page, model, user, role, settings, searchFilter, searchResults
- `actions` object: pure functions to update state (setPage, changePage, saveModel, saveSettings, setSearchFilter, setRole)
- `setSearchResults` service: reacts to searchFilter changes
- `cells` cell: meiosis-setup cell with map listener that triggers `m.redraw()`
**Depends on:** Models, routing service
**Used by:** All components and services

### Service Layer

**Purpose:** Business logic and external integration
**Location:** `packages/gui/src/services/`
**Contains:**
- `meiosis.ts`: State management (actions, services)
- `routing-service.ts`: Route definitions and navigation
- `translations.ts`: i18n with translate.js library
- `login-service.ts`: Authentication and user roles
**Depends on:** Models, external libraries (meiosis-setup, translate.js)
**Used by:** Components, routing, other services

### Model Layer

**Purpose:** Type definitions and data structures
**Location:** `packages/gui/src/models/`
**Contains:**
- `page.ts`: Page enum and Page interface for routing
- `settings.ts`: Settings type
- `data-model.ts`: DataModel interface (version, lastUpdate)
**Depends on:** None
**Used by:** Services, components

### Component Layer

**Purpose:** UI rendering
**Location:** `packages/gui/src/components/`
**Contains:**
- Page components: LandingPage, HomePage, AboutPage, SettingsPage
- Layout component: Layout (navbar, sidenav, search dialog wrapper)
- UI components: Preloader, LanguageSwitcher
**Depends on:** Models, services (actions, t, routingSvc)
**Used by:** Routing service

### Utility Layer

**Purpose:** Shared helper functions
**Location:** `packages/gui/src/utils/`
**Contains:** subSup, debounce, formatDate, getTextColorFromBackground, getOptionsLabel, joinListWithAnd, isUnique, generateNumbers, getRandomValue, deepCopy, scrollToSection, scrollToTop, isActivePage, isSmallPage
**Depends on:** None (pure functions)
**Used by:** Components, services

### View Layer

**Purpose:** CSS styling
**Location:** `packages/gui/src/css/`
**Contains:** style.css (custom styles), imports Materialize CSS via mithril-materialized

## Data Flow

### Component Initialization Flow

1. `app.ts` initializes i18n with language list (en, nl)
2. `i18n.init()` loads language and sets up change listener
3. On language change, `routingSvc.init()` builds route table
4. `m.route()` initializes router with routing table
5. Each component receives `MeiosisCell<State>` via props
6. `cells.map()` listener triggers `m.redraw()` on state changes

### Action → State → View Flow

```
Component onclick
    ↓
action.setPage(cell, Pages.HOME)
    ↓
cell.update({ page: () => page })
    ↓
cells.map() listener fires
    ↓
m.redraw()
    ↓
Components re-render with new state
```

### Search Service Flow

1. Component calls `actions.setSearchFilter(cell, query)`
2. State updates `searchFilter`
3. `setSearchResults` service onchange fires (listens to `searchFilter`)
4. Service calls `cell.update({ searchResults: [] })`
5. Components render updated searchResults

### Page Navigation Flow

```
User clicks link
    ↓
routingSvc.switchTo(page, params, query)
    ↓
m.route.set(url, params)
    ↓
Router matches route
    ↓
Layout renders, passes cell to page component
    ↓
Page component's oninit calls actions.setPage
    ↓
State updates page
    ↓
m.redraw() triggers re-render
```

## Key Abstractions

### MeiosisComponent

**Purpose:** Type alias for components that receive Meiosis cell state

**Definition:** `type MeiosisComponent<A = {}> = FactoryComponent<MeiosisCell<State> & A>;`

**Examples:**
- `packages/gui/src/components/home-page.ts`
- `packages/gui/src/components/layout.ts`

**Pattern:** Components receive cell as `attrs` prop, use `attrs.state` for state, `attrs.actions` or action functions for updates

### FactoryComponent

**Purpose:** Mithril's component pattern

**Pattern:**
```typescript
export const Component: MeiosisComponent = () => {
  return {
    oninit: ({ attrs }) => { /* initialization */ },
    view: ({ attrs, children }) => {
      // Access state: attrs.state
      // Call actions: actions.setXxx(attrs, ...)
      // Render: m(tag, attrs, children)
    },
  };
};
```

### Routing Service Abstraction

**Purpose:** Centralized route management

**Location:** `packages/gui/src/services/routing-service.ts`

**Key Methods:**
- `init()`: Build route table from Page definitions
- `routingTable()`: Generate Mithril route definitions
- `route(page, query)`: Generate URL for a page
- `href(page)`: Generate link href
- `switchTo(page, params, query)`: Navigate to page
- `getList()`: Get all defined pages

**Page Definition:**
```typescript
interface Page {
  id: Pages;
  title: string;
  route: string;
  visible: boolean | VisibilityResolver;
  component: ComponentTypes;
  hasNavBar?: boolean;
  hasSidebar?: boolean;
}
```

### Translation Service Abstraction

**Purpose:** i18n with translate.js

**Location:** `packages/gui/src/services/translations.ts`

**Key Exports:**
- `i18n`: i18n instance with init, addOnChangeListener, loadAndSetLocale
- `t`: Translation function
- `Languages`: 'nl' | 'en'
- `Locale`: Language metadata (name, fqn, dir)

**Language Files:**
- `packages/gui/src/services/lang/en.ts`: English translations
- `packages/gui/src/services/lang/nl.ts`: Dutch translations

## Entry Points

### Main Entry Point

**Location:** `packages/gui/src/app.ts`
**Triggers:** Application start (npm start / pnpm start)
**Responsibilities:**
- Import CSS (material-icons, mithril-materialized, style.css)
- Initialize i18n with en/nl locales
- Set up language change listener that re-initializes routing
- Handle beforeunload event to track unsaved changes
- Set document language attribute

### Component Entry Points

**Location:** `packages/gui/src/components/index.ts`
**Purpose:** Barrel exports for page components

## Error Handling

**Strategy:** Basic console logging, no centralized error handling

**Patterns:**
- `console.log()` for debug/trace
- `console.error()` for indexedDB errors
- No try/catch blocks in current codebase
- Promises used for async operations (ldb.get/set) but no .catch() handlers

## Cross-Cutting Concerns

**Logging:** console.log/console.error - Used for tracing and errors
**Validation:** None visible in current codebase
**Authentication:** Role-based in `login-service.ts` - Auth object with username, roles, isLoggedIn(), isAdmin(), isEditor()

---

*Architecture analysis: 2026-03-11*
