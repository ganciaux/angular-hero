# 📊 Progress

## ✅ Completed Missions

- 000-prelude
- 001-project-architecture
- 002-routing-and-layout
- 003-navigation
- 004-hero-component
- 005-hero-interactions
- 006-hero-child-component
- 007-hero-output
- 008-reusable-component
- 009-hero-service
- 010-inventory
- 011-item-component
- 012-add-item-form
- 013-equip-unequip
- 014-pipes
- SQ-01-journal

## 🧠 Learned Concepts

- Project setup
- Tooling (Jest, json-server)
- Jest config (ts-jest, esModuleInterop)
- Git workflow (branch, squash, commit conventions)
- Angular project architecture (core, shared, features, layout)
- Where to put models (feature vs shared)
- Test maintenance (update tests when component changes)
- Signals (`signal`, `computed`) for reactive local state
- `@let` and `@if` template syntax (Angular 17+)
- Model naming conflict resolution (`HeroModel` vs `Hero` component)
- `signal.update()`, `@for`, event binding `(click)`
- Component decomposition — extract child component from parent
- Signal-based `input.required()` for parent → child data flow
- Signal-based `output<void>()` for child → parent event flow
- Component responsibility: child emits, parent mutates state
- Reusable shared component (`StatBar`) with `input.required()`
- `shared/components/` for generic UI components with no feature knowledge
- `xpNextLevel` model field + dynamic level-up progression formula
- `Injectable` + `providedIn: 'root'` — singleton service
- `inject()` — new Angular injection API
- `asReadonly()` — expose signal read-only from service
- Separation of concerns: service owns state, component owns UI
- `@for` with `track item.id` for object lists
- `crypto.randomUUID()` for unique ids
- `protected readonly` on injected service in component (template access only)
- Smart vs dumb components pattern
- `output<string>()` with payload — `$event` receives the emitted value
- Template-driven forms — `FormsModule`, `ngModel`, two-way binding `[()]`
- Form validation in component before emitting
- Dumb form component — emits data, no service knowledge
- Template Literal Types in TypeScript (`${string}-${string}-...`)
- Dynamic CSS class binding — `[class.equipped]="condition"` (single class toggle)
- `output<string>()` named `equipped` — child emits id, parent calls `toggleEquip`
- Immutable signal array update with `.map()` + spread operator
- `@if` in template for conditional button label
- Pipes — built-in (`titlecase`, `uppercase`) and custom (`@Pipe`, `PipeTransform`, `transform()`)
- Standalone pipe — imported directly in component `imports: []`
- Pure pipes — only re-run when input value changes (performant by default)
- Private helper method in pipe vs injecting another pipe — keep it simple
- `effect()` — runs automatically when a signal it reads changes, must be in injection context (constructor)
- Service observing another service — inject read-only, use `effect()` to listen (Open/Closed principle)
- `previousHero` pattern — store previous state to detect what changed between two signal emissions
- Two `effect()` in one constructor — one per signal source, each with clear responsibility
- `@empty` block in `@for` — renders when the list is empty
- Array truthy check — empty array `[]` is truthy in JS, `if (arr)` never protects against empty
