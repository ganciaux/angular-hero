# Mission 006 — Hero Child Component

## Concept Angular

Signal-based input (`input()`), component decomposition, parent → child data flow.

## Objective

Extract hero stats display into a reusable child component using Angular's signal-based `input()`.

## Background

Angular 17+ introduces `input()` as a signal-based alternative to `@Input()`.
It integrates naturally with the signal ecosystem and is the recommended approach in Angular 20+.

```typescript
// Old way (decorator)
@Input() hero!: HeroModel;

// New way (signal-based)
hero = input.required<HeroModel>();
// Read in template: hero().name
// Read in class: this.hero().name
```

## Mission

- Create a `HeroStats` component in `features/hero/hero-stats/`
- Move the stats display (name, level, hp, xp) from `hero.html` to `hero-stats.html`
- Use `input.required<HeroModel>()` to receive the hero data
- Pass the hero signal value from `Hero` parent to `HeroStats` child
- Keep buttons and action log in the parent `Hero` component

## Files concerned

- `src/app/features/hero/hero-stats/hero-stats.ts` (create)
- `src/app/features/hero/hero-stats/hero-stats.html` (create)
- `src/app/features/hero/hero.html` (modify)
- `src/app/features/hero/hero.ts` (modify — import HeroStats)

## Validation expected

- Hero page still displays correctly
- Stats are rendered by `HeroStats`, not by `Hero` directly
- `input.required()` used instead of `@Input()` decorator
- Parent passes `[hero]="hero()"` to child
