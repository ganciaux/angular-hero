# Mission 004 — Hero Component

## Concept Angular

Signals (`signal`, `computed`), template syntax (`@if`, `@for`), standalone component in a feature folder.

## Objective

Create a Hero component that displays hero stats using Angular Signals.

## Mission

- Create the `Hero` model in `features/hero/`
- Create the `Hero` component in `features/hero/`
- Display hero name, level, HP, and XP using signals
- Use `computed` for a derived stat (e.g. `isAlive`)
- Use `@if` to conditionally display a status message
- Add a `/hero` route in `app.routes.ts`
- Add a Hero link in the Nav

## Files concerned

- `src/app/features/hero/hero.model.ts` (create)
- `src/app/features/hero/hero.ts` (create)
- `src/app/features/hero/hero.html` (create)
- `src/app/app.routes.ts` (modify)
- `src/app/layout/nav/nav.html` (modify)

## Validation expected

- Navigating to `/hero` displays the hero stats
- Signals update the view reactively
- `@if` shows/hides the status message based on `isAlive`
- Nav link to Hero is active when on `/hero`
