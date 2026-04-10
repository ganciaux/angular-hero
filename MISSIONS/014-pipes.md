# Mission 014 — Pipes

## Concept Angular

Custom pipes, built-in pipes, `transform()` method, `pure` pipes.

## Objective

Format item data in the template using Angular pipes — both built-in and custom.

## Background

A pipe transforms a value in a template without modifying the underlying data.

```html
{{ value | pipeName }}
{{ value | pipeName:arg1:arg2 }}
```

**Built-in pipes:**
| Pipe | Usage | Example |
|---|---|---|
| `uppercase` | Uppercase string | `{{ 'hello' \| uppercase }}` → `HELLO` |
| `lowercase` | Lowercase string | `{{ 'HELLO' \| lowercase }}` → `hello` |
| `titlecase` | Capitalize each word | `{{ 'hello world' \| titlecase }}` → `Hello World` |
| `number` | Format number | `{{ 3.14159 \| number:'1.0-2' }}` → `3.14` |
| `date` | Format date | `{{ date \| date:'dd/MM/yyyy' }}` |
| `currency` | Format currency | `{{ 9.99 \| currency:'EUR' }}` |
| `json` | Debug output | `{{ obj \| json }}` |
| `slice` | Slice array/string | `{{ items \| slice:0:3 }}` |

**Custom pipe:**
```typescript
@Pipe({ name: 'itemType', standalone: true })
export class ItemTypePipe implements PipeTransform {
  transform(type: string): string {
    // return formatted value
  }
}
```

Pipes are **pure** by default — Angular only re-runs them when the input value changes (not when an object mutates internally). This makes them performant.

## Mission

- Create a custom pipe `ItemTypePipe` in `features/inventory/pipes/item-type.pipe.ts`
- The pipe receives a `type: string` and returns a formatted label:
  - `'sword'` → `'⚔️ Sword'`
  - `'potion'` → `'🧪 Potion'`
  - `'armor'` → `'🛡️ Armor'`
  - Any other → `'📦 ' + titlecase(type)`
- Import and use the pipe in `ItemCard`
- Also use the built-in `titlecase` pipe on the item name
- Use the built-in `uppercase` pipe on the "Equip"/"Unequip" button label

## Files concerned

- `src/app/features/inventory/pipes/item-type.pipe.ts` (create)
- `src/app/features/inventory/item-card/item-card.ts` (modify — import pipe)
- `src/app/features/inventory/item-card/item-card.html` (modify — use pipes)

## Validation expected

- `ItemTypePipe` is a standalone pipe with `@Pipe({ name: 'itemType' })`
- `transform()` returns the correct emoji + label
- Pipe is imported in `ItemCard` (dumb component — no service)
- Item name uses `titlecase`
- Item type uses `itemType` custom pipe
- Button label uses `uppercase`
- No data is mutated — pipes only format display values
