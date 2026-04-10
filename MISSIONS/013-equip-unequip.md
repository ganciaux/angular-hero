# Mission 013 — Equip / Unequip System

## Concept Angular

UI state management with signals, conditional rendering `@if`, dynamic CSS classes `[class]`.

## Objective

Add an equip/unequip toggle on each item, with visual feedback for equipped state.

## Background

UI state (equipped or not) can live in the item model or as a separate signal.
The simplest approach: add an `equipped` boolean to `ItemModel`.

Dynamic CSS class binding:
```html
<!-- Single class toggle -->
<div [class.equipped]="item().equipped">...</div>

<!-- Multiple classes -->
<div [class]="{ equipped: item().equipped, rare: item().type === 'rare' }">...</div>
```

## Mission

- Add `equipped: boolean` to `ItemModel`
- Update hardcoded items in `InventoryService` with `equipped: false`
- Add `toggleEquip(id: string)` method in `InventoryService`
- Add `equipped` output in `ItemCard` — emits item id when equip button clicked
- Add an "Equip" / "Unequip" button in `item-card.html` using `@if`
- Apply a CSS class `equipped` on the item card when equipped
- Parent `Inventory` listens to `(equipped)` and calls `inventoryService.toggleEquip($event)`

## Files concerned

- `src/app/features/inventory/inventory.model.ts` (modify — add `equipped`)
- `src/app/features/inventory/inventory.service.ts` (modify — add `toggleEquip`)
- `src/app/features/inventory/item-card/item-card.ts` (modify — add output)
- `src/app/features/inventory/item-card/item-card.html` (modify)
- `src/app/features/inventory/item-card/item-card.scss` (modify — add `.equipped` style)
- `src/app/features/inventory/inventory.html` (modify — listen to output)

## Validation expected

- Clicking "Equip" toggles the item state
- Button label changes between "Equip" and "Unequip" based on `item().equipped`
- Equipped item has a visible visual difference (CSS class)
- `toggleEquip` mutates the signal immutably with spread operator
- `ItemCard` emits id only — no direct service call
