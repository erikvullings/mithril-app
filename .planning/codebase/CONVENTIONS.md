# Coding Conventions

**Analysis Date:** 2026-03-11

## Naming Patterns

**Files:**
- PascalCase for component files: `home-page.ts`, `about-page.ts`, `layout.ts`
- camelCase for utility functions: `deepCopy`, `debounce`, `formatDate`
- UpperCamelCase for type interfaces: `DataModel`, `Settings`, `Page`
- UPPERCASE with underscores for constants: `LANGUAGE`, `SAVED`, `MODEL_KEY`
- `-service.ts` suffix for service files: `routing-service.ts`, `login-service.ts`
- `-switcher.ts`, `-pager.ts` suffix for UI components: `language-switcher.ts`

**Functions:**
- camelCase for functions: `setSearchFilter`, `changePage`, `loadData`
- Verbs at start: `setX`, `getX`, `init`, `load`, `save`, `update`
- Component functions named as PascalCase: `HomePage`, `AboutPage`, `Login`

**Variables:**
- camelCase: `searchFilter`, `currentLanguage`, `sidenavOpen`
- State properties in Meiosis cells use camelCase

**Types:**
- PascalCase for interfaces: `DataModel`, `Settings`, `Page`, `User`
- PascalCase for type aliases: `UserRole`, `Languages`
- `type X =` or `interface X` used interchangeably

## Code Style

**Formatting:**
- No formal linting configuration file found
- Consistent use of single quotes for strings
- No trailing semicolons (based on code review)
- 2-space indentation

**TypeScript:**
- Target: ES6
- Module: CommonJS
- Strict mode enabled: `strict: true`, `noImplicitThis: true`, `alwaysStrict: true`
- No unused locals or parameters: `noUnusedLocals: true`, `noUnusedParameters: true`
- No implicit returns: `noImplicitReturns: true`
- Source maps enabled for TypeScript files

## Import Organization

**Order:**
1. External libraries (mithril, meiosis-setup, mithril-materialized, translate.js)
2. Relative imports from models (`../models`)
3. Relative imports from services (`../services`)
4. Relative imports from components (`../components`)
5. Relative imports from utils (`../utils`)

**Path Aliases:**
- None defined in tsconfig.json
- Uses relative paths with `../` prefixes

## Error Handling

**Patterns:**
- Errors thrown for invalid input: `generateNumbers`, `getRandomValue`
- Graceful degradation with fallbacks: `getRandomValue` returns `undefined` for empty arrays
- Console logging for debugging: `console.log`, `console.error`
- No try-catch blocks in core business logic files
- Async operations handle errors via Promise rejection chains

## Logging

**Framework:** `console`

**Patterns:**
- `console.log` for informational messages
- `console.error` for errors
- Used in services like `setSearchResults` for debugging state changes
- Environment-aware logging would require external logging service integration

## Comments

**When to Comment:**
- JSDoc-style comments for exported functions in some cases
- Inline comments for complex logic: regex patterns, color calculations
- Block comments for file-level documentation (e.g., `local-ldb.ts`)

**JSDoc/TSDoc:**
- Not consistently used
- Some function files lack type annotations for parameters

## Function Design

**Size:**
- Components typically 20-50 lines
- Utility functions kept under 30 lines
- Services (`onchange`/`run`) are 5-15 lines

**Parameters:**
- Optional parameters use `?` suffix
- Default values provided when appropriate
- Type annotations on all parameters and return values

**Return Values:**
- Components return view objects: `{ view: () => m(...) }`
- Services return undefined (side-effect based)
- Pure functions return transformed values

## Module Design

**Exports:**
- Barrel files in `index.ts` for each directory: `models/index.ts`, `services/index.ts`, `components/index.ts`
- `export * from` pattern used throughout
- Default exports avoided in favor of named exports

**Barrel Files:**
- `src/models/index.ts` - Re-exports all models
- `src/services/index.ts` - Re-exports all services
- `src/components/index.ts` - Re-exports all components
- `src/utils/index.ts` - Re-exports utility functions
- `src/services/lang/index.ts` - Re-exports language messages

## Meiosis Component Pattern

**Component Structure:**
```typescript
export const ComponentName: MeiosisComponent = () => {
  return {
    oninit: ({ attrs }) => { /* initialization */ },
    view: ({ attrs }) => {
      // View logic
      return m('element', attrs.state);
    },
  };
};
```

**MeiosisComponent Type:**
- `MeiosisComponent<A = {}>` extends `FactoryComponent<MeiosisCell<State> & A>`
- All components receive `cell` as `attrs.state`
- Actions called via `actions.actionName(attrs, ...)` or `attrs.actions...`

## CSS & Styling

**Framework:** Materialize CSS via `mithril-materialized`

**Patterns:**
- Inline styles for dynamic values: `style: 'color: ' + color`
- CSS classes for static styling
- Materialize class names: `btn`, `col s12`, `primary-text`

**Custom CSS:**
- `src/css/style.css` for global styles
- SCSS support via sass-loader with modifyVars

## State Management Conventions

**Meiosis State:**
```typescript
export interface State {
  page: Pages;
  model: DataModel;
  loggedInUser?: User;
  role: UserRole;
  settings: Settings;
  searchFilter?: string;
  searchResults: any[];
}
```

**Actions:**
- Pure functions that update cell state
- Signature: `(cell: MeiosisCell<State>, ...args) => void`
- State updates use `cell.update({ key: newValue })` or `cell.update({ key: () => newValue })`

**Services:**
- `onchange` function returns state property to watch
- `run` function performs side effects when watched property changes
- Services receive `MeiosisCell<State>` for state access and updates

---

*Convention analysis: 2026-03-11*
