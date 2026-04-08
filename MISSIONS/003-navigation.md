# Mission 003 — Navigation

## Concept Angular

RouterLink, RouterLinkActive: navigate between routes declaratively from templates.

## Objective

Create a navigation bar component inside the layout and link it to the application routes.

## Mission

- Create a `Nav` component in `layout/nav/`
- Add navigation links using `RouterLink`
- Highlight the active link using `RouterLinkActive`
- Integrate `Nav` into `LayoutComponent`
- Add a second route (`/about`) to have something to navigate to

## Files concerned

- `src/app/layout/nav/nav.ts` (create)
- `src/app/layout/nav/nav.html` (create)
- `src/app/layout/nav/nav.scss` (create)
- `src/app/layout/layout.ts` (modify — import Nav)
- `src/app/layout/layout.html` (modify — add nav)
- `src/app/features/about/about.ts` (create)
- `src/app/features/about/about.html` (create)
- `src/app/app.routes.ts` (modify — add /about route)

## Validation expected

- Clicking a nav link changes the URL and the displayed content
- The active link is visually distinct from the others
- Layout stays in place during navigation (only the router-outlet content changes)
