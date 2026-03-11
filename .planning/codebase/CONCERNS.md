# Codebase Concerns

**Analysis Date:** 2026-03-11

## Tech Debt

### LandingPage Placeholder Content
- Issue: The `LandingPage` component contains hardcoded "TODO" text that appears to be placeholder content never replaced.
- Files: `packages/gui/src/components/landing-page.ts` (lines 31-32, 39-40, 47-48)
- Impact: Users see "TODO" text on the landing page when the app loads
- Fix approach: Replace placeholder content with actual landing page copy or implement proper content management

### Excessive Use of `any` Type
- Issue: Multiple files use `any` type instead of proper TypeScript types, weakening type safety.
- Files: `packages/gui/src/utils/local-ldb.ts`, `packages/gui/src/utils/index.ts`, `packages/gui/src/models/page.ts`
- Specific instances:
  - `packages/gui/src/utils/local-ldb.ts` (lines 41-43, 62, 67, 80, 115, 126, 156-158): IndexedDB type assertions with `as any`
  - `packages/gui/src/utils/index.ts` (lines 22, 24): `debounce` function parameter types
  - `packages/gui/src/utils/index.ts` (lines 134-150): `deepCopy` function uses `any` extensively
  - `packages/gui/src/services/meiosis.ts` (line 28): `searchResults: any[]`
- Impact: Reduced type safety, potential runtime errors, harder to maintain
- Fix approach: Define proper TypeScript interfaces and use generics consistently

### Unimplemented Settings Service
- Issue: Settings persistence is commented out. The `settingsSvc` is imported but never used.
- Files: `packages/gui/src/services/meiosis.ts` (lines 15, 66)
- Impact: Settings changes are not persisted to storage
- Fix approach: Implement or remove the settings service

### Auth Object Attached to Window
- Issue: The `Auth` object is attached to `window` object directly, which is a anti-pattern in TypeScript.
- Files: `packages/gui/src/services/login-service.ts` (line 77)
- Impact: Type safety issues, potential security concerns
- Fix approach: Use proper dependency injection or module export pattern

### Large Commented-Out Code Blocks
- Issue: Significant amounts of code are commented out, making the codebase harder to read and maintain.
- Files: `packages/gui/src/utils/local-ldb.ts` (lines 1-31, 148-273): Entire file content duplicated in comments
- Impact: Code bloat, confusion about what is active vs deprecated
- Fix approach: Remove commented code or move to git history

### Inconsistent Date Handling
- Issue: The `formatDate` function uses the non-null assertion operator (`!`) without proper validation.
- Files: `packages/gui/src/utils/index.ts` (line 32-34)
- Impact: Potential runtime errors with invalid dates
- Fix approach: Add proper date validation

## Known Bugs

### Debounce Function Type Signature
- Issue: The `debounce` function uses `any` for parameters, making it difficult to use with typed functions.
- Files: `packages/gui/src/utils/index.ts` (lines 22-29)
- Symptoms: TypeScript compiler warnings when using with typed functions
- Trigger: Using debounce with typed callback functions
- Workaround: Use type assertions

### DeepCopy Function Type Safety
- Issue: The `deepCopy` function has complex type casting with `as any` that obscures the actual type behavior.
- Files: `packages/gui/src/utils/index.ts` (lines 129-153)
- Symptoms: Potential runtime issues with circular references or special objects
- Trigger: Deep copying complex nested objects
- Workaround: Consider using `structuredClone` (native) or a proven library like `lodash.cloneDeep`

## Security Considerations

### Local Storage for Sensitive Data
- Issue: User roles and authentication state are stored in localStorage, which is accessible via JavaScript and vulnerable to XSS attacks.
- Files: `packages/gui/src/services/login-service.ts` (lines 18, 19, 54, 59), `packages/gui/src/services/meiosis.ts` (line 80)
- Risk: XSS attacks could steal authentication tokens and impersonate users
- Current mitigation: None beyond basic role checking
- Recommendations: Use httpOnly cookies for authentication tokens, implement proper CSRF protection

### Auth Role Bypass Risk
- Issue: The `isOwner` and `canEdit` functions rely on client-side username checks that can be bypassed.
- Files: `packages/gui/src/services/login-service.ts` (lines 41-51)
- Risk: Users can modify localStorage to gain unauthorized access
- Recommendations: Implement server-side authorization for all sensitive operations

## Performance Bottlenecks

### IndexedDB Performance with Recursive Calls
- Issue: The local DB implementation uses recursive setTimeout calls when the database is not initialized, which can cause delays.
- Files: `packages/gui/src/utils/local-ldb.ts` (lines 74-76, 86-88, 100-102, 110-112, 121-123, 132-134)
- Problem: 50ms recursive delay with no upper bound
- Cause: Waiting for database connection that may never complete
- Improvement path: Use a Promise-based approach with timeout and proper connection state tracking

### Repeated Array Filtering in Layout Component
- Issue: The `Layout` component filters the page list multiple times on each render.
- Files: `packages/gui/src/components/layout.ts` (lines 85-108, 135-163)
- Problem: Same filter operation repeated in navigation and sidenav
- Improvement path: Cache filtered results or move to computed property

## Fragile Areas

### RoutingService Initialization
- Issue: The `RoutingService` is a singleton that must be initialized before use, but there's no guarantee of initialization order.
- Files: `packages/gui/src/services/routing-service.ts` (lines 8-119)
- Why fragile: `routingSvc` is used in `app.ts` before `i18n.init` completes, which calls `routingSvc.init()`
- Safe modification: Ensure `routingSvc.init()` is called before any routing operations
- Test coverage: No tests for routing initialization sequence

### State Type Mismatch Risk
- Issue: The `State` interface uses `any[]` for searchResults, which can lead to unexpected behavior.
- Files: `packages/gui/src/services/meiosis.ts` (line 28)
- Why fragile: Type information is lost, making it hard to track what search results should contain
- Safe modification: Define a proper `SearchResult` interface

### Authentication State Management
- Issue: The `Auth` object has mutable state that can be changed asynchronously, creating potential race conditions.
- Files: `packages/gui/src/services/login-service.ts` (lines 17-74)
- Why fragile: Multiple methods can modify `username`, `roles`, and `isAuthenticated` independently
- Safe modification: Use immutable patterns or ensure all changes go through a single entry point

## Scaling Limits

### LocalStorage Capacity
- Issue: The entire model is stored in localStorage, which has a typical 5-10MB limit per domain.
- Current capacity: No explicit limit checking
- Limit: Browser localStorage capacity (typically 5-10MB)
- Scaling path: Implement database pagination or server-side storage for large models

### No Code Splitting
- Issue: All code is bundled together, causing slow initial load for users.
- Current setup: Single entry point `app.ts`
- Limit: All components loaded at once, regardless of visibility
- Scaling path: Implement route-based code splitting using dynamic imports

## Dependencies at Risk

### mithril-materialized v3
- Risk: The project uses `mithril-materialized` version 3.14.5, which may have breaking changes or unmaintained dependencies
- Impact: UI rendering issues, missing components
- Migration plan: Monitor for updates, consider migrating to a more modern UI library if maintenance issues arise

### translate.js v1.3.2
- Risk: The translation library is at version 1.3.2; check for security vulnerabilities
- Impact: Potential internationalization issues
- Migration plan: Consider migrating to `i18next` for better ecosystem support

## Missing Critical Features

### No Search Implementation
- Problem: Search functionality exists in the UI but the search results service returns an empty array.
- Files: `packages/gui/src/services/meiosis.ts` (lines 86-94): `setSearchResults` service always returns `[]`
- Blocks: Users cannot search through content
- Priority: High - search is a key user feature

### No Model Persistence
- Problem: While the code saves to localStorage, there's no mechanism for version control, backups, or collaboration.
- Files: `packages/gui/src/services/meiosis.ts` (lines 58-63)
- Impact: Data loss risk, no history, no collaboration
- Priority: High for production use

## Test Coverage Gaps

### No Unit Tests
- What's not tested: No test files exist in the codebase
- Files: `packages/gui/src/` - no `.test.ts` or `.spec.ts` files
- Risk: No automated verification of functionality; bugs may go undetected
- Priority: Medium - start with core utility functions (`utils/index.ts`)

### No Integration Tests
- What's not tested: No integration tests for component interaction
- Risk: Integration issues may only surface in production
- Priority: Medium - add tests for component composition

---

*Concerns audit: 2026-03-11*
