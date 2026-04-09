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

### RouterLink active state — exact matching

`routerLinkActive="active"` marks a link active if the current URL **contains** the path.
With `path: ''` (home on root `/`), the link matches ALL URLs → both Home and About appear active.

Fix: use `[routerLinkActiveOptions]="{ exact: true }"` to require an exact URL match.

```html
<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
<a routerLink="/about" routerLinkActive="active">About</a>
```

Good reflex: when Angular behavior seems too broad → look for an `exact` or `strict` option.

### Flat layout component

A component without sub-components does not need its own subfolder.
`layout.ts` lives directly in `layout/` — sub-components (`header/`, `nav/`) get their own subfolder when created.

---

## ⚡ Signals

### signal() — writable reactive state

```typescript
hero = signal<HeroModel>({ name: 'Hero', hp: 100, ... });

hero.set({ ...newValue });                        // replace
hero.update(h => ({ ...h, hp: h.hp - 10 }));     // update from current
```

Always use spread `{ ...h }` to avoid mutating the object directly.

### computed() — derived state

```typescript
isAlive = computed(() => this.hero().hp > 0);
```

Auto-updates when any signal it reads changes. Read-only — cannot be set directly.

### @for — list rendering

```html
@for (log of logs(); track $index) {
  <p>{{ log }}</p>
}
```

`track` is mandatory. Use `$index` for simple lists, use a unique id for object lists.

### @if — conditional rendering

```html
@if (isAlive()) {
  <p>Alive</p>
} @else {
  <p>Fallen</p>
}
```

### @let — template local variable

```html
@let heroData = hero();
```

Avoids calling `hero()` multiple times in the template. Must end with `;`.

### Model naming conflict

With Angular 20 (no `Component` suffix), a component and its model can both want the same name.
Convention: suffix the interface with `Model` when it conflicts.

```typescript
export interface HeroModel { ... }  // in hero.model.ts
export class Hero { ... }           // component in hero.ts
```

### input() — signal-based parent → child

Angular 17+ alternative to `@Input()` decorator. Integrates natively with signals.

```typescript
// Child component
hero = input.required<HeroModel>();   // required input
name = input<string>('default');      // optional with default

// Read in template
hero().name

// Read in class
this.hero().name
```

Pass from parent template:
```html
<app-hero-stats [hero]="hero()" />
```

Note: pass the signal **value** (`hero()`), not the signal itself (`hero`).

### Reusable shared component pattern

A component belongs in `shared/components/` when:
- It has no knowledge of any feature (no `HeroModel`, no service)
- It receives all data via `input()`
- It can be used in multiple features

```typescript
// shared/components/stat-bar/stat-bar.ts
export class StatBar {
  label = input.required<string>();
  value = input.required<number>();
  max = input.required<number>();
}
```

```html
<!-- feature template -->
<app-stat-bar [label]="'HP'" [value]="hero().hp" [max]="hero().maxHp" />
```

Pass string literals with `[label]="'HP'"` (not `label="HP"` — that would be a plain HTML attribute, not Angular binding).

### output() — signal-based child → parent

Angular 17+ alternative to `@Output()` + `EventEmitter`.

```typescript
// Child component
gainXP = output<void>();
takeDamage = output<number>();  // with payload

// Emit directly from template (no intermediate method needed)
// hero-actions.html
<button (click)="gainXP.emit()">Gain XP</button>
```

Listen in parent template:
```html
<app-hero-actions (gainXP)="onGainXP()" (takeDamage)="onTakeDamage()" />
```

**Rule:** child emits events, parent owns state and handles mutations.
Naming convention: `handle*` in child (if needed), `on*` in parent.

### computed() in child components

A child component can define its own `computed()` from an `input()` signal:

```typescript
hero = input.required<HeroModel>();
isAlive = computed(() => this.hero().hp > 0);
```

This keeps derived logic close to where it's displayed.

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
