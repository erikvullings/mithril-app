# External Integrations

**Analysis Date:** 2026-03-11

## APIs & External Services

**No external APIs are currently integrated.**

The application is a standalone client-side SPA with no backend service dependencies.

## Data Storage

**Databases:**
- None - Application uses browser-based storage only

**Local Storage (Browser):**
- `MITHRIL_APP_MODEL` - Stores the application data model as JSON
- `USER_ROLE` - Stores user role as string ('user', 'editor', 'admin')
- `LANGUAGE` - Stores user's language preference

**IndexedDB:**
- `ldb` database - Experimental local database (defined in `utils/local-ldb.ts`, currently unused in main code path)
- Stores key-value pairs with structure `{ k: key, v: value }`

**File Storage:**
- Local filesystem via static assets
- Assets located in `packages/gui/src/assets/`
- Supported formats: SVG, PNG, JPG, JPEG, GIF, WebP
- Build configuration: `packages/gui/rspack.config.ts` (asset/resource type)

**Caching:**
- None - No explicit caching mechanism

## Authentication & Identity

**Auth Provider:**
- Custom (no external provider)
- Implementation: Simple localStorage-based authentication in `services/login-service.ts`

**Authentication Flow:**
- Username stored in localStorage key `userid`
- Roles stored in localStorage key `userrole` as comma-separated string
- Auth module: `Auth` object in `login-service.ts`
- Roles: `admin`, `editor`, `user`

## Monitoring & Observability

**Error Tracking:**
- None - No external error tracking

**Logs:**
- Browser console logging only
- Uses `console.log()` throughout codebase
- Debug flag in translation service outputs missing translations

## CI/CD & Deployment

**Hosting:**
- Static file hosting (GitHub Pages supported per build configuration)
- Production output to `../../docs/` directory
- Public path configurable via `publicPath` in rspack config

**CI Pipeline:**
- None detected

## Environment Configuration

**Required env vars:**
- `SERVER` - Backend server URL (defaults to `http://localhost:4545` in development, GitHub Pages URL in production)
- `NODE_ENV` - Set to `development` for dev mode, otherwise production

**Secrets location:**
- `.env` file (not present in repository)
- `.env.example` provides template with `SERVER` variable

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None - Application is client-side only with no external HTTP requests

---

*Integration audit: 2026-03-11*
