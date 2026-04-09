# Mission 005 — Hero Interactions

## Concept Angular

Signal mutation (`signal.set`, `signal.update`), event binding `(click)`, `@for` template syntax.

## Objective

Add interactive buttons to modify hero stats and display a combat log using signals.

## Mission

- Add buttons to the Hero component : gain XP, take damage, heal
- Use `signal.update()` to mutate hero state
- Prevent HP from going below 0 or above `maxHp`
- Add a `logs` signal (array of strings) to record actions
- Display the log list using `@for`
- Use `computed` to derive `isAlive` from `hp` (already done — verify it reacts correctly)

## Files concerned

- `src/app/features/hero/hero.ts` (modify)
- `src/app/features/hero/hero.html` (modify)

## Validation expected

- Clicking "Gain XP" increases XP
- Clicking "Take Damage" decreases HP (min 0)
- Clicking "Heal" increases HP (max maxHp)
- Status message reacts to `isAlive` computed signal
- Combat log displays each action in order
- No direct mutation of signal value (always use `.set` or `.update`)
