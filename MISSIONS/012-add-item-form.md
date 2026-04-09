# Mission 012 — Add Item Form

## Concept Angular

Template-driven form, `FormsModule`, `ngModel`, basic form validation.

## Objective

Add a form to the inventory page to create and add new items.

## Background

Angular has two form approaches:

| | Template-driven | Reactive Forms |
|---|---|---|
| Module | `FormsModule` | `ReactiveFormsModule` |
| Logic in | Template (HTML) | Component (TypeScript) |
| Best for | Simple forms | Complex forms, dynamic validation |

Template-driven uses `ngModel` to bind form fields to a variable:

```html
<input [(ngModel)]="name" name="name" />
```

`[()]` = "banana in a box" = two-way binding (read + write).

## Mission

- Create an `AddItemForm` component in `features/inventory/add-item-form/`
- Declare a local form object with fields: `name`, `type`, `quantity`
- Use `FormsModule` + `ngModel` for two-way binding on each field
- Add a "Add" button that emits an `added = output<ItemModel>()` with the new item
- Generate the `id` with `crypto.randomUUID()` in the component
- Reset form fields after submission
- Use `AddItemForm` in `inventory.html`
- Parent `Inventory` listens to `(added)` and calls `inventoryService.addItem($event)`

## Files concerned

- `src/app/features/inventory/add-item-form/add-item-form.ts` (create)
- `src/app/features/inventory/add-item-form/add-item-form.html` (create)
- `src/app/features/inventory/inventory.ts` (modify — import AddItemForm)
- `src/app/features/inventory/inventory.html` (modify)

## Validation expected

- `AddItemForm` uses `FormsModule` and `ngModel`
- Form emits a complete `ItemModel` via `output()`
- Fields reset after submission
- New item appears in the list immediately (signal reactivity)
- `AddItemForm` has no knowledge of `InventoryService`
