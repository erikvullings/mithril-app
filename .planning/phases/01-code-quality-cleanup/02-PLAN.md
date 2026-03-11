---
phase: 01-code-quality-cleanup
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - /Users/erik.vullings/dev/mithril-app/packages/gui/src/services/login-service.ts
  - /Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/index.ts
autonomous: true
requirements:
  - CODE-02
  - CODE-04
  - CODE-05
must_haves:
  truths:
    - "Auth object is no longer attached to window object"
    - "debounce function has proper generic type signature"
    - "formatDate function validates input and handles invalid dates"
    - "Module exports provide safe Auth access"
  artifacts:
    - path: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/services/login-service.ts"
      provides: "Auth module exports without window assignment"
      contains: "export.*getAuthUser|export.*getAuthRoles|export.*isUserAuthenticated"
      not_contains: "(window as any).Auth"
    - path: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/index.ts"
      provides: "debounce with generic type and formatDate with validation"
      contains: "debounce = <T extends"
      lines: 10
  key_links:
    - from: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/services/login-service.ts"
      to: "module.exports"
      via: "Auth helper functions"
      pattern: "export const getAuthUser|export const getAuthRoles|export const isUserAuthenticated"
    - from: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/index.ts"
      to: "debounce"
      via: "generic type Parameters<T>"
      pattern: "debounce.*<T.*extends.*Parameters<T>"
    - from: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/index.ts"
      to: "formatDate"
      via: "input validation"
      pattern: "formatDate.*invalid.*Date"
---

<objective>
Remove Auth from window object, fix debounce function type, and add date validation to formatDate

Purpose: Address auth security issue and improve utility function type safety
Output: Cleaned login-service.ts, improved utils/index.ts
</objective>

<execution_context>
@/Users/erik.vullings/.claude/get-shit-done/workflows/execute-plan.md
@/Users/erik.vullings/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md

@packages/gui/src/services/meiosis.ts
@packages/gui/src/models/page.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Remove Auth from window and add module exports</name>
  <files>/Users/erik.vullings/dev/mithril-app/packages/gui/src/services/login-service.ts</files>
  <action>Refactor Auth to remove window assignment and add module-level helper functions:

1. Remove line 77: `(window as any).Auth = Auth;`
2. Add exports for:
   - `getAuthUser()` - returns Auth.username
   - `getAuthRoles()` - returns Auth.roles
   - `isUserAuthenticated()` - returns Auth.isAuthenticated
   - `checkRole(role: UserRole)` - returns Auth.roles.includes(role)
3. Update Auth.login() to also set isAuthenticated based on login status
4. Keep Auth object and all its methods (isLoggedIn, isAdmin, isEditor, isOwner, canCRUD, canEdit)</action>
  <verify>File compiles without errors, Auth no longer assigned to window</verify>
  <done>Auth removed from window, module exports added</done>
</task>

<task type="auto">
  <name>Task 2: Fix debounce function type signature</name>
  <files>/Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/index.ts</files>
  <action>Update debounce function to use proper generic typing:

```typescript
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  timeout: number
) => {
  let timer: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
```

Preserve existing behavior and functionality.</action>
  <verify>File compiles without errors, debounce has proper generic type</verify>
  <done>debounce function has proper type signature</done>
</task>

<task type="auto">
  <name>Task 3: Add date validation to formatDate function</name>
  <files>/Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/index.ts</files>
  <action>Update formatDate function to accept string inputs in addition to Date/number:

1. Update function signature to accept: `date: number | Date | string | undefined`
2. Default to current date when input is undefined
3. No explicit validation - let Date constructor handle invalid input (returns 'Invalid Date')

Keep existing behavior for valid Date/number inputs.</action>
  <verify>File compiles without errors, formatDate handles undefined by defaulting to current date</verify>
  <done>formatDate has proper type signature with validation handling</done>
</task>

</tasks>

<verification>
- pnpm run build passes without type errors
- Auth object no longer on window
- Module exports for Auth helper functions exist
- debounce has generic type T extends (...args: any[]) => void
- formatDate returns empty string for invalid date inputs
</verification>

<success_criteria>
- CODE-02: Auth object no longer attached to window, uses module exports
- CODE-04: debounce function has proper generic type signature
- CODE-05: formatDate includes date validation
</success_criteria>

<output>
After completion, create `.planning/phases/01-code-quality-cleanup/02-SUMMARY.md`
</output>
