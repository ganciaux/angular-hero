# Mission 001 — Project Architecture

## Concept Angular

Angular project structure: feature-based architecture with core, shared, and features folders.

## Objective

Create the base folder structure of the application and understand the role of each layer.

## Mission

- Create the `core/` folder (singleton services, guards, interceptors)
- Create the `shared/` folder (reusable components, pipes, directives)
- Create the `features/` folder (one sub-folder per feature)
- Clean up the default `app.component` (remove boilerplate content)
- Verify the app still runs after cleanup

## Files concerned

- `src/app/core/` (create)
- `src/app/shared/` (create)
- `src/app/features/` (create)
- `src/app/app.component.ts`
- `src/app/app.component.html`

## Validation expected

- `ng serve` runs without error
- App displays a blank page (no Angular boilerplate)
- Folder structure matches CONVENTIONS.md
