# 📖 Learnings

Personal notes on concepts learned during the project.

---

## 🏗️ Architecture

### core/ is for providers, not data structures

`core/` is meant for singleton services, guards, and interceptors — things Angular instantiates once and injects globally.
Models and interfaces do NOT belong in `core/` because they are data structures, not providers.

### Where to put models

| Model type | Location |
|---|---|
| Specific to one feature | `features/<feature>/<feature>.model.ts` |
| Shared across multiple features | `shared/models/` |

### shared/components/ vs shared/ui/

Avoid splitting `shared/` into `components/` and `ui/`. In `shared/`, everything should be presentational by definition — one folder is enough.
- `shared/components/` → all reusable UI components

---

## 🔀 Routing

### Nested routing: one router-outlet = one children level

Every `<router-outlet />` in a template requires a `children: []` level in `app.routes.ts`.
If no child route matches, the outlet renders nothing — no error, just empty.

```
app.html      → <router-outlet />  = routes root level
layout.html   → <router-outlet />  = children: [] of layout route
```

### router-outlet vs component selector

`<router-outlet />` = dynamic slot — the router decides what to render based on the URL.
`<app-home>` = static — always renders Home regardless of the URL. Never use a component selector for routed content.

### path builds URLs like folders

```typescript
{ path: 'game', children: [
  { path: 'hero' }    // → /game/hero
  { path: 'combat' }  // → /game/combat
]}
```

### Flat layout component

A component without sub-components does not need its own subfolder.
`layout.ts` lives directly in `layout/` — sub-components (`header/`, `nav/`) get their own subfolder when created.

---

## ⚙️ Angular CLI & Tooling

### ng generate naming pitfall

`ng g c layout/LayoutComponent` converts `LayoutComponent` to `layout-component` and creates a subfolder with that name.
Prefer: `ng g c layout/layout --flat` to avoid unwanted nesting.

### Angular 20 naming convention

The CLI no longer generates `.component.` suffix in filenames or `Component` suffix in class names.

| Type | File | Class |
|---|---|---|
| Component | `hero.ts` | `Hero` |
| Service | `hero.service.ts` | `HeroService` |
| Guard | `auth.guard.ts` | `AuthGuard` |

### VS Code Language Server cache

After renaming/deleting files, the Angular Language Server may show stale errors.
Fix: `Ctrl+Shift+P` → `Developer: Reload Window`

---
