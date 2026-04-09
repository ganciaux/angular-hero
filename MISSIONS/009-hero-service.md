# Mission 009 — Hero Service

## Concept Angular

`Injectable`, `providedIn: 'root'`, `inject()`, separation of concerns (state vs UI).

## Objective

Extract hero state and business logic from the `Hero` component into a `HeroService`.

## Background

A component should only handle UI. State and business logic belong in a service.

```typescript
// Old way (decorator injection)
constructor(private heroService: HeroService) {}

// New way (signal-based injection)
private heroService = inject(HeroService);
```

A service with `providedIn: 'root'` is a singleton — one instance shared across the entire app.

## Mission

- Create `HeroService` in `features/hero/hero.service.ts`
- Move signals (`hero`, `actionLogs`) from `Hero` component to `HeroService`
- Move all methods (`updateHP`, `updateLogs`, `onGainXP`, `onTakeDamage`, `onHeal`) to `HeroService`
- Expose signals as `readonly` to prevent external mutation
- Inject `HeroService` in `Hero` component via `inject()`
- `Hero` component becomes UI-only — no state, no business logic

## Files concerned

- `src/app/features/hero/hero.service.ts` (create)
- `src/app/features/hero/hero.ts` (modify — inject service, remove state and methods)

## Validation expected

- `HeroService` is decorated with `@Injectable({ providedIn: 'root' })`
- Signals in service are private + exposed as `readonly`
- `Hero` component only calls service methods and reads service signals
- App still works identically from the user's perspective
