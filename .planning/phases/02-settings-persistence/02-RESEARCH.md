---
phase: 02-settings-persistence
researched: 2026-03-11
status: complete
---

# Phase 2: Settings Persistence - Research Report

**Phase Goal:** Ensure user settings changes are saved to localStorage and restored on startup

**Requirements:** SETT-01, SETT-02, SETT-03

## Current State Analysis

### What Exists

**Meiosis State:**
- `State.settings: Settings` field exists in `meiosis.ts`
- Settings type is currently `export type Settings = {};` (empty interface)
- `saveSettings` action exists but is commented out from settingsSvc integration

**Settings Service (commented out):**
```typescript
// const settingsSvc = restServiceFactory<Settings>('settings');
// await settingsSvc.save(settings);
// const settings = (await settingsSvc.loadList()).shift() || ({} as Settings);
```

**Storage Keys:**
- `LANGUAGE = 'SG_LANGUAGE'` - already used for language persistence
- `MODEL_KEY = 'MITHRIL_APP_MODEL'` - used for data model persistence

**Startup Logic:**
- `loadData()` loads role and model from localStorage
- Settings loading is commented out

### What's Missing

1. **Expanded Settings Type** - Currently empty, needs typed properties for:
   - Language preference
   - Theme selection (light/dark)
   - User preferences (view options, etc.)

2. **Settings Service** - Re-enable the commented-out settings service or create a working implementation

3. **Settings Loading on Startup** - Enable settings to be loaded alongside role and model

4. **Settings Persistence** - Ensure settings save to localStorage on changes

## Standard Stack

### Meiosis Pattern for Settings

The existing Meiosis setup uses:
- `cell.update({ settings })` to update settings state
- localStorage for persistence
- Services for side effects (like `setSearchResults`)

### Architecture Pattern

**Settings Flow:**
```
User changes setting
  → Action (e.g., updateSettings)
  → Update settings in cell
  → Service watches settings change
  → Service saves to localStorage
```

**Startup Flow:**
```
App starts
  → loadData()
  → Load settings from localStorage
  → Update cell with loaded settings
  → Settings applied to UI
```

## Don't Hand-Roll

- **Settings Service Pattern** - Already defined in codebase, just needs uncommenting/fixing
- **localStorage Persistence** - Already working for model and role
- **Meiosis Cell Updates** - Standard pattern used throughout

## Common Pitfalls

1. **Circular Dependencies** - Settings service may import services that depend on settings
2. **Race Conditions** - Settings loading may not complete before components render
3. **Type Safety** - Empty Settings type provides no type checking

## Implementation Approach

### Step 1: Define Settings Type
```typescript
export interface Settings {
  language?: string;
  theme?: 'light' | 'dark';
  preferences?: Record<string, unknown>;
}
```

### Step 2: Enable Settings Service
- Uncomment settingsSvc in meiosis.ts
- Ensure service properly saves to localStorage

### Step 3: Load Settings on Startup
- Add settings loading in loadData()
- Use a default Settings object if none exists

### Step 4: Save Settings on Change
- Settings service should persist to localStorage when settings change
- Or add explicit settings save action

## Code Examples

### Existing Pattern (from meiosis.ts)
```typescript
export const saveSettings: Service<State> = {
  onchange: (state) => state.settings,
  run: (cell) => {
    const state = cell.getState();
    localStorage.setItem('SETTINGS_KEY', JSON.stringify(state.settings));
  },
};
```

### Existing Pattern (from loadData)
```typescript
const settings = (await settingsSvc.loadList()).shift() || ({} as Settings);
cells().update({ settings: () => settings });
```

---

*Research completed: 2026-03-11*
*Mode: Implementation analysis*
*Decision: Simple fix - uncomment and fix settings service, expand Settings type*
