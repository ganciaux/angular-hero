# Mission 015 — Template References & ViewChild

## Concept Angular

Template references (`#ref`) and `ViewChild` — access DOM elements or child components
directly from the template or from TypeScript.

## Objective

Add a search input to the inventory page that auto-focuses when the page loads,
using a template reference and `ViewChild`.

## Mission

- In `inventory.html`, add a text input above the item list with a template reference `#searchInput`
- Add a button "Focus Search" next to it that calls `searchInput.focus()` directly from the template
- In `inventory.ts`, declare a `@ViewChild('searchInput')` property typed as `ElementRef`
- In `ngAfterViewInit()`, auto-focus the input when the page loads
- Import `ElementRef`, `ViewChild`, `AfterViewInit` from `@angular/core`
- Implement `AfterViewInit` on the component class

## Files concerned

- `src/app/features/inventory/inventory.ts`
- `src/app/features/inventory/inventory.html`

## Validation expected

- Clicking "Focus Search" sets focus on the input (template ref used directly in template)
- The input is automatically focused when navigating to the inventory page (ViewChild + ngAfterViewInit)
- No TypeScript errors
