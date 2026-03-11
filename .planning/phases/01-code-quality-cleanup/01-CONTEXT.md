# Phase 1: Code Quality Cleanup - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Improve codebase maintainability by addressing code quality issues and type safety gaps. This phase removes technical debt without adding new user-facing functionality.

**Requirements addressed:** CODE-01, CODE-02, CODE-03, CODE-04, CODE-05

**Non-goals:**
- No new features or user-facing changes
- No changes to existing behavior beyond type safety
- No integration with external services

</domain>

<decisions>
## Implementation Decisions

### Type Replacement Strategy (CODE-01)

**searchResults type:**
- Use generic type parameter `T[]` for flexibility across components
- Define type once in meiosis.ts as single source of truth
- Import and reuse in components, minimal comments for brevity

**local-ldb.ts types:**
- Use `Promise<T>` generic for return types (Promise<string>, Promise<void>, etc.)
- TypeScript will infer the specific type from each operation
- Consistent with existing pattern in the codebase

### Auth Refactoring Approach (CODE-02)

**Export mechanism:**
- Convert Auth to Meiosis service pattern (onchange/run)
- Auth state stored in localStorage, not state tree
- Export helper functions from login-service.ts

**Type safety:**
- Define full Auth interface with all methods typed (isLoggedIn, isAdmin, isEditor, isOwner, canCRUD, canEdit, setUsername, setRoles, setAuthenticated, login, logout)

**Lifecycle management:**
- login/logout added to actions in meiosis.ts
- Existing localStorage persistence unchanged

**Migration path:**
- Find all usages of `(window as any).Auth`
- Replace with direct import from login-service.ts
- Remove window assignment at end of login-service.ts

### Commented Code Removal (CODE-03)

**local-ldb.ts cleanup:**
- Remove all commented code blocks (lines 1-31, 148-274)
- Remove TODO comment referencing old code
- Full cleanup: extract usable code, clean up indentation, fix naming, modernize syntax

**Documentation:**
- No external documentation needed
- Code will be self-explanatory for TypeScript developers
- Git history preserved for reference

### Utility Function Improvements (CODE-04, CODE-05)

**debounce function:**
- Type signature: `<T extends (...args: any[]) => void>(func: T, timeout: number) => T`
- Generic wrapper preserves function signature
- Return type inferred from input function type

**formatDate function:**
- Accept string inputs in addition to Date/number
- Default to current date when input is undefined
- No explicit validation - let Date constructor handle invalid input (returns 'Invalid Date')
- Keep current behavior for valid Date/number inputs

### Claude's Discretion

**File organization:**
- Location of type definitions (meiosis.ts vs models/ directory)
- Whether to create separate type declaration file

**Code organization:**
- How to structure local-ldb.ts after cleanup
- Whether to extract dbFact into separate utility file

**Testing:**
- Whether to add unit tests for the refactored utilities
- Test coverage requirements for Phase 1

</decisions>

<specifics>
## Specific Ideas

- Type definitions should follow existing naming conventions (PascalCase for interfaces)
- Meiosis service pattern should match existing pattern (setSearchResults in meiosis.ts)
- Auth methods should maintain backward compatibility with existing implementations
- Debounce generic type should preserve function overloads if any exist

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets

**local-ldb.ts (indexedDB wrapper):**
- dbFact() function returns localDb object with async operations
- Handles IndexedDB connection lifecycle
- Retry logic for async operations (50ms delay)
- Could be extracted to utils/ldb.ts for clarity

**meiosis.ts (state management):**
- State interface already defined with searchResults: any[]
- setSearchResults service pattern established
- Cell-based updates via cell.update()
- Existing service pattern can be extended for Auth

**login-service.ts (authentication):**
- Auth object already defined with all required methods
- Uses localStorage for persistence
- Pattern ready for conversion to Meiosis service

**utils/index.ts (utilities):**
- subSup, debounce, formatDate, getTextColorFromBackground already typed
- Deep copy with generic type parameter
- Existing utility patterns can be extended

### Established Patterns

**Meiosis Service Pattern:**
```typescript
export const serviceName: Service<State> = {
  onchange: (state) => state.propertyToWatch,
  run: (cell) => {
    // side effects
  },
};
```

**Auth State Storage:**
- localStorage keys: 'userid', 'userrole'
- No change to persistence mechanism needed

**TypeScript Conventions:**
- Strict mode enabled
- PascalCase for interfaces
- camelCase for functions/variables
- Generic types using T

### Integration Points

**Type definitions:**
- Add to meiosis.ts State interface or create dedicated type file
- Export from models/index.ts or services/index.ts

**Auth integration:**
- Connect to existing Meiosis services
- No new routes or components needed
- Existing components import and use Auth methods

**Utility functions:**
- Already exported from utils/index.ts
- No component changes required

</code_context>

<deferred>
## Deferred Ideas

- Commented code removal from other files (e.g., meiosis.ts lines 34-40)
- Additional type safety improvements beyond Phase 1 scope
- IndexedDB feature enhancement (currently unused, experimental)
- Auth method splitting (isOwner, canCRUD, canEdit - may be overly complex)

</deferred>

---

*Phase: 01-code-quality-cleanup*
*Context gathered: 2026-03-11*
