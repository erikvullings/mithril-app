---
phase: 01-code-quality-cleanup
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - /Users/erik.vullings/dev/mithril-app/packages/gui/src/models/index.ts
  - /Users/erik.vullings/dev/mithril-app/packages/gui/src/services/meiosis.ts
  - /Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/local-ldb.ts
autonomous: true
requirements:
  - CODE-01
  - CODE-03
must_haves:
  truths:
    - "searchResults in State uses proper SearchResults type instead of any"
    - "local-ldb.ts has no commented-out code blocks"
    - "models/index.ts exports SearchResults and LdbOperation types"
  artifacts:
    - path: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/models/index.ts"
      provides: "Type definitions for SearchResults and LdbOperation"
      contains: "export type SearchResults"
    - path: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/services/meiosis.ts"
      provides: "State interface with SearchResults type"
      contains: "searchResults: SearchResults"
    - path: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/local-ldb.ts"
      provides: "Clean database operations without commented code"
      lines: 115
  key_links:
    - from: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/services/meiosis.ts"
      to: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/models/index.ts"
      via: "import SearchResults"
      pattern: "import.*SearchResults.*from.*models"
    - from: "/Users/erik.vullings/dev/mithril-app/packages/gui/src/services/meiosis.ts"
      to: "State.searchResults"
      via: "type annotation"
      pattern: "searchResults:\\s*SearchResults"
---

<objective>
Define core TypeScript interfaces for search results and local database operations, then remove commented-out code from local-ldb.ts

Purpose: Establish type safety foundation for Phase 1 by replacing `any` types with proper interfaces
Output: Type definition files, cleaned local-ldb.ts
</objective>

<execution_context>
@/Users/erik.vullings/.claude/get-shit-done/workflows/execute-plan.md
@/Users/erik.vullings/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md

@packages/gui/src/models/page.ts
@packages/gui/src/models/settings.ts
@packages/gui/src/models/data-model.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create SearchResults type in models/index.ts</name>
  <files>/Users/erik.vullings/dev/mithril-app/packages/gui/src/models/index.ts</files>
  <action>Create SearchResults type with generic parameter and LdbOperation type for local database operations:

```typescript
export type SearchResults<T = unknown> = T[];

export type LdbOperation<T> = Promise<T>;
```

Add to exports in models/index.ts alongside existing exports (Page, Pages, DataModel, Settings, ILokiObj).</action>
  <verify>File exists with SearchResults and LdbOperation types exported</verify>
  <done>Type definitions created and exported from models/index.ts</done>
</task>

<task type="auto">
  <name>Task 2: Replace searchResults any type with SearchResults in meiosis.ts</name>
  <files>/Users/erik.vullings/dev/mithril-app/packages/gui/src/services/meiosis.ts</files>
  <action>Update State interface to use SearchResults generic type:

1. Import SearchResults from models
2. Change `searchResults: any[]` to `searchResults: SearchResults<unknown>`

Keep the setSearchResults service behavior unchanged (returns empty array).</action>
  <verify>File compiles without errors, searchResults type is now SearchResults<unknown></verify>
  <done>State.searchResults uses proper type instead of any</done>
</task>

<task type="auto">
  <name>Task 3: Clean up local-ldb.ts by removing commented code</name>
  <files>/Users/erik.vullings/dev/mithril-app/packages/gui/src/utils/local-ldb.ts</files>
  <action>Remove all commented code blocks while keeping working code:

1. Remove lines 1-31 (block comment about IndexedDB wrapper)
2. Remove lines 148-274 (second block of commented code including dbFact function, ldb assignment, and type export)
3. Keep only lines 33-146 which contain the active dbFact function and ldb export
4. Clean up the remaining code structure</action>
  <verify>File has no commented blocks, only working code remains</verify>
  <done>Commented code removed from local-ldb.ts</done>
</task>

</tasks>

<verification>
- pnpm run build passes without type errors
- models/index.ts exports SearchResults and LdbOperation
- meiosis.ts State.searchResults is SearchResults<unknown>
- local-ldb.ts has no commented code blocks
</verification>

<success_criteria>
- CODE-01: No `any` types in searchResults - replaced with SearchResults<unknown>
- CODE-03: No commented-out code in local-ldb.ts
</success_criteria>

<output>
After completion, create `.planning/phases/01-code-quality-cleanup/01-SUMMARY.md`
</output>
