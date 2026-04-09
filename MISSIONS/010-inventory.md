# Mission 010 — Inventory

## Concept Angular

Feature architecture, `@for` with objects, service with list state, `track` by unique id.

## Objective

Create an inventory feature with a list of items managed by a service.

## Background

`@for` with objects requires a `track` expression on a unique field — not `$index`.
Using `$index` is fragile: if the list is reordered or filtered, Angular may re-render wrong items.

```html
@for (item of items(); track item.id) {
  <p>{{ item.name }}</p>
}
```

## Mission

- Create `ItemModel` in `features/inventory/inventory.model.ts`
  - Fields: `id` (string), `name` (string), `type` (string), `quantity` (number)
- Create `InventoryService` in `features/inventory/inventory.service.ts`
  - Signal `items` with a few hardcoded items as initial state
  - Method `addItem(item: ItemModel)`
  - Method `removeItem(id: string)`
- Create `Inventory` component in `features/inventory/`
  - Inject `InventoryService`
  - Display list with `@for (item of items(); track item.id)`
  - Show item name, type, quantity
- Add `/inventory` route in `app.routes.ts`
- Add Inventory link in Nav

## Files concerned

- `src/app/features/inventory/inventory.model.ts` (create)
- `src/app/features/inventory/inventory.service.ts` (create)
- `src/app/features/inventory/inventory.ts` (create)
- `src/app/features/inventory/inventory.html` (create)
- `src/app/app.routes.ts` (modify)
- `src/app/layout/nav/nav.html` (modify)

## Validation expected

- `/inventory` route displays the item list
- `@for` uses `track item.id` (not `$index`)
- Items are managed by `InventoryService`, not the component
- `InventoryService` signals are private + exposed as readonly
