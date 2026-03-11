---
phase: 1
slug: 01-code-quality-cleanup
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler |
| **Config file** | packages/gui/tsconfig.json |
| **Quick run command** | `cd packages/gui && npx tsc --noEmit` |
| **Full suite command** | `cd packages/gui && npx tsc --noEmit` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd packages/gui && npx tsc --noEmit`
- **After every plan wave:** Run `cd packages/gui && npx tsc --noEmit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01 | 01 | 1 | CODE-01 | unit | `npx tsc --noEmit packages/gui/src/services/meiosis.ts` | ✅ | ⬜ pending |
| 01-02 | 01 | 1 | CODE-03 | unit | `npx tsc --noEmit packages/gui/src/utils/local-ldb.ts` | ✅ | ⬜ pending |
| 02-01 | 02 | 1 | CODE-02 | unit | `npx tsc --noEmit packages/gui/src/services/login-service.ts` | ✅ | ⬜ pending |
| 02-02 | 02 | 1 | CODE-04 | unit | `npx tsc --noEmit packages/gui/src/utils/index.ts` | ✅ | ⬜ pending |
| 02-03 | 02 | 1 | CODE-05 | unit | `npx tsc --noEmit packages/gui/src/utils/index.ts` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `packages/gui/src/models/index.ts` — SearchResults and LdbOperation types
- [ ] `packages/gui/src/utils/local-ldb.ts` — Clean code without comments
- [ ] `packages/gui/src/utils/index.ts` — Fixed debounce and formatDate types

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Auth not on window | CODE-02 | Requires checking global object | Open browser console, check `window.Auth` is undefined |
| localStorage persistence | CODE-02, CODE-03 | Requires session test | Change settings, refresh page, verify persisted |
| Search results filtering | CODE-01 | Requires runtime test | Enter search query, verify results update |

*If none: "All phase behaviors have automated verification."*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
