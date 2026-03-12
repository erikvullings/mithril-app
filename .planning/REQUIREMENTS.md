# Requirements: Mithril TypeScript Template

**Defined:** 2026-03-11
**Core Value:** Provide a minimal, typed foundation for building Mithril.js SPAs with proven patterns

## v1 Requirements

### Code Quality

- [ ] **CODE-01**: Replace `any` types with proper TypeScript interfaces (searchResults, local-ldb types)
- [ ] **CODE-02**: Remove Auth object from window object, use module exports instead
- [ ] **CODE-03**: Remove commented-out code blocks from local-ldb.ts
- [ ] **CODE-04**: Fix debounce function type signature to work with typed callbacks
- [ ] **CODE-05**: Add proper date validation to formatDate function

### Settings Persistence

- [x] **SETT-01**: Settings changes are saved to localStorage persistently
- [x] **SETT-02**: Settings are loaded on application startup
- [x] **SETT-03**: Settings include language preference, theme, and user preferences

### Search Functionality

- [x] **SRCH-01**: User can enter a search query and see filtered results
- [x] **SRCH-02**: Search results are displayed dynamically as query changes
- [x] **SRCH-03**: Empty search returns appropriate message or all items

## v2 Requirements

### Documentation

- [ ] **DOCS-01**: Project README includes getting started guide
- [ ] **DOCS-02**: Code examples for adding new pages
- [ ] **DOCS-03**: Architecture documentation explains Meiosis pattern usage
- [ ] **DOCS-04**: API documentation for services and actions

### User Experience

- [ ] **UX-01**: Landing page shows placeholder content that guides next steps
- [ ] **UX-02**: Search results show helpful message when no results found
- [ ] **UX-03**: Loading states for async operations (IndexedDB, localStorage)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Server-side backend | Client-only SPA by design, template purpose |
| Database integration | Browser storage only, template simplicity |
| OAuth providers | Custom auth sufficient for template |
| Mobile app | Web-first, mobile later if needed |
| Real-time features | No WebSocket needed for static template |
| Analytics tracking | No external services for template |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CODE-01 | Phase 1 | Pending |
| CODE-02 | Phase 1 | Pending |
| CODE-03 | Phase 1 | Pending |
| CODE-04 | Phase 1 | Pending |
| CODE-05 | Phase 1 | Pending |
| SETT-01 | Phase 2 | Complete |
| SETT-02 | Phase 2 | Complete |
| SETT-03 | Phase 2 | Complete |
| SRCH-01 | Phase 3 | Complete (2026-03-12) |
| SRCH-02 | Phase 3 | Complete (2026-03-12) |
| SRCH-03 | Phase 3 | Complete (2026-03-12) |
| DOCS-01 | v2 | Pending |
| DOCS-02 | v2 | Pending |
| DOCS-03 | v2 | Pending |
| DOCS-04 | v2 | Pending |
| UX-01 | v2 | Pending |
| UX-02 | v2 | Pending |
| UX-03 | v2 | Pending |

**Coverage:**
- v1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0

- v2 requirements: 7 total (deferred to future milestone)

---

*Requirements defined: 2026-03-11*
*Last updated: 2026-03-12 - Phase 3 Plan 01 complete (SRCH-01, SRCH-02, SRCH-03)*
