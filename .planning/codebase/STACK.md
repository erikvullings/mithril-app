# Technology Stack

**Analysis Date:** 2026-03-11

## Languages

**Primary:**
- TypeScript 5.9.3 - Used throughout the entire codebase for type safety

**Secondary:**
- HTML/CSS - Template and styling
- SCSS - Advanced styling with Mithril Materialized

## Runtime

**Environment:**
- Node.js (via Rspack dev server)
- Browser runtime (client-side application)

**Package Manager:**
- pnpm 10.32.1 (monorepo root)
- npm (for development scripts)

## Frameworks

**Core:**
- Mithril.js 2.3.8 - Reactive view library for building single-page applications
- Meiosis-setup 6.2.3 - State management pattern implementation with Cell-based architecture

**UI:**
- Mithril Materialized 3.14.5 - Material Design components wrapper for Mithril
- Material Icons 1.13.14 - Icon library
- Materialize CSS - CSS framework (via mithril-materialized)

**Build/Dev:**
- Rspack 1.7.8 - Build tool (Webpack alternative) with SWC loader
- SWC - TypeScript/JavaScript compiler (via builtin:swc-loader)
- Sass 1.98.0 - CSS preprocessor with SCSS support
- Sass Loader 16.0.7 - Webpack/Spack loader for SCSS

## Key Dependencies

**Critical:**
- `meiosis-setup` [6.2.3] - Core state management pattern implementation
- `mithril` [2.3.8] - Reactive view library
- `mithril-materialized` [3.14.5] - Material Design UI components
- `translate.js` [1.3.2] - Internationalization library

**Infrastructure:**
- `@rspack/core` [1.7.8] - Build system core
- `@rspack/cli` [1.7.8] - Command line interface
- `@types/materialize-css` [1.0.14] - TypeScript definitions
- `@types/mithril` [2.2.7] - TypeScript definitions

## Configuration

**Environment:**
- Uses `dotenv` for environment variable loading
- Development server runs on port 65533
- `SERVER` environment variable configures backend URL (defaults to localhost)

**Build:**
- Configuration: `packages/gui/rspack.config.ts`
- TypeScript config: `packages/gui/tsconfig.json`
- Output: `dist/` (development), `../../docs/` (production)

## Platform Requirements

**Development:**
- Node.js with npm/pnpm
- TypeScript compiler
- Browser with ES6+ support

**Production:**
- Static file hosting (GitHub Pages supported)
- Browser with ES6+ support, CSS Modules, and WebAssembly support

---

*Stack analysis: 2026-03-11*
