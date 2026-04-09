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
- Template Literal Types in TypeScript (`${string}-${string}-...`)
