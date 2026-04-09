# Mission 007 — Hero Output

## Concept Angular

Signal-based output (`output()`), child → parent event flow, component communication.

## Objective

Extract action buttons into a `HeroActions` child component that emits events to the parent using `output()`.

## Background

Angular 17+ introduces `output()` as a signal-based alternative to `@Output()` + `EventEmitter`.

```typescript
// Old way (decorator)
@Output() gainXP = new EventEmitter<void>();

// New way (signal-based)
gainXP = output<void>();

// Emit from child
this.gainXP.emit();

// Listen in parent template
<app-hero-actions (gainXP)="onGainXP()" />
```

## Mission

- Create a `HeroActions` component in `features/hero/hero-actions/`
- Move the three buttons (Gain XP, Take Damage, Heal) from `hero.html` to `hero-actions.html`
- Declare three outputs: `gainXP`, `takeDamage`, `heal` using `output<void>()`
- Emit the corresponding output on each button click
- In parent `Hero`, listen to each output and call the existing methods
- Remove the buttons from `hero.html`, add `<app-hero-actions>`

## Files concerned

- `src/app/features/hero/hero-actions/hero-actions.ts` (create)
- `src/app/features/hero/hero-actions/hero-actions.html` (create)
- `src/app/features/hero/hero.html` (modify)
- `src/app/features/hero/hero.ts` (modify — import HeroActions)

## Validation expected

- Buttons are in `HeroActions`, not in `Hero`
- `output<void>()` used instead of `@Output()` + `EventEmitter`
- Parent reacts to child events via `(gainXP)="gainXP()"` syntax
- All interactions still work as before
