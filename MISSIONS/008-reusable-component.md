# Mission 008 — Reusable StatBar Component

## Concept Angular

Combining `input()` + `output()`, reusable shared component, `shared/components/`.

## Objective

Create a reusable `StatBar` component that displays a labeled progress bar, and use it in `HeroStats` to display HP and XP.

## Background

A truly reusable component:
- Receives data via `input()`
- Emits events via `output()` when needed
- Has no knowledge of the feature it's used in
- Lives in `shared/components/`, not in a feature folder

This is the pattern behind Angular Material, PrimeNG and most UI libraries.

## Mission

- Create `StatBar` in `src/app/shared/components/stat-bar/`
- Declare inputs: `label` (string), `value` (number), `max` (number)
- Display: label, current value, max value, and a visual `<progress>` bar
- Use `StatBar` twice in `HeroStats` — once for HP, once for XP
- Remove the raw `<p>HP: ...>` and `<p>XP: ...>` from `HeroStats`

## Files concerned

- `src/app/shared/components/stat-bar/stat-bar.ts` (create)
- `src/app/shared/components/stat-bar/stat-bar.html` (create)
- `src/app/features/hero/hero-stats/hero-stats.ts` (modify — import StatBar)
- `src/app/features/hero/hero-stats/hero-stats.html` (modify)

## Validation expected

- `StatBar` is in `shared/components/`, not in `features/`
- Only `input()` used — no direct access to `HeroModel`
- `HeroStats` passes `[value]="hero().hp"` and `[max]="hero().maxHp"` to `StatBar`
- Visual progress bar renders correctly for HP and XP
- Component is generic enough to be reused for any stat
