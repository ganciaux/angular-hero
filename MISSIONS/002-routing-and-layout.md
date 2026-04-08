# Mission 002 — Routing & Layout

## Concept Angular

Angular Router: routes configuration, provideRouter, RouterOutlet, and layout component.

## Objective

Set up the application routes and create a layout component that wraps all pages.

## Mission

- Create a `Layout` component in `layout/` (flat — no subfolder) with a basic shell (header + router-outlet)
- Create a `Home` component in `features/home/` (simple placeholder page)
- Declare both routes in `app.routes.ts` (Layout as parent, Home as child)
- Verify navigation works

## Files concerned

- `src/app/layout/layout.ts` (create)
- `src/app/layout/layout.html` (create)
- `src/app/layout/layout.scss` (create)
- `src/app/features/home/home.ts` (create)
- `src/app/features/home/home.html` (create)
- `src/app/app.routes.ts` (modify)

## Validation expected

- `ng serve` runs without error
- Navigating to `/` displays the layout with the home page inside it
- DOM shows: `app-root > app-layout > app-home`
