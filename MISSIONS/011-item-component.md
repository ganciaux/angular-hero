# Mission 011 — Item Component

## Concept Angular

Component decomposition in a list context, `input()` + `output()` combined, smart vs dumb components.

## Objective

Extract item display into a reusable `ItemCard` component used inside the inventory list.

## Background

**Smart component** = knows about services, manages state (ex: `Inventory`)
**Dumb component** = receives data via `input()`, emits events via `output()`, no service knowledge (ex: `ItemCard`)

This separation makes dumb components reusable and easy to test.

## Mission

- Create `ItemCard` in `features/inventory/item-card/`
- Declare input: `item = input.required<ItemModel>()`
- Declare output: `removed = output<string>()` (emits the item id)
- Display item name, type, quantity in `item-card.html`
- Add a "Remove" button that emits `removed` with `item().id`
- Use `ItemCard` in `inventory.html` inside the `@for` loop
- Parent `Inventory` listens to `(removed)` and calls `inventoryService.removeItem($event)`

## Files concerned

- `src/app/features/inventory/item-card/item-card.ts` (create)
- `src/app/features/inventory/item-card/item-card.html` (create)
- `src/app/features/inventory/inventory.ts` (modify — import ItemCard)
- `src/app/features/inventory/inventory.html` (modify)

## Validation expected

- `ItemCard` has no knowledge of `InventoryService`
- `removed` output emits the item id (string), not the whole item
- `Inventory` handles the removal via `(removed)="inventoryService.removeItem($event)"`
- List still renders and removes items correctly
