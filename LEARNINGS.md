# 📖 Learnings

Personal notes on concepts learned during the project.

---

## 🏗️ Architecture

### core/ is for providers, not data structures

`core/` is meant for singleton services, guards, and interceptors — things Angular instantiates once and injects globally.
Models and interfaces do NOT belong in `core/` because they are data structures, not providers.

### Where to put models

| Model type | Location |
|---|---|
| Specific to one feature | `features/<feature>/<feature>.model.ts` |
| Shared across multiple features | `shared/models/` |

### shared/components/ vs shared/ui/

Avoid splitting `shared/` into `components/` and `ui/`. In `shared/`, everything should be presentational by definition — one folder is enough.
- `shared/components/` → all reusable UI components

---

## 🔀 Routing

### Nested routing: one router-outlet = one children level

Every `<router-outlet />` in a template requires a `children: []` level in `app.routes.ts`.
If no child route matches, the outlet renders nothing — no error, just empty.

```
app.html      → <router-outlet />  = routes root level
layout.html   → <router-outlet />  = children: [] of layout route
```

### router-outlet vs component selector

`<router-outlet />` = dynamic slot — the router decides what to render based on the URL.
`<app-home>` = static — always renders Home regardless of the URL. Never use a component selector for routed content.

### path builds URLs like folders

```typescript
{ path: 'game', children: [
  { path: 'hero' }    // → /game/hero
  { path: 'combat' }  // → /game/combat
]}
```

### RouterLink active state — exact matching

`routerLinkActive="active"` marks a link active if the current URL **contains** the path.
With `path: ''` (home on root `/`), the link matches ALL URLs → both Home and About appear active.

Fix: use `[routerLinkActiveOptions]="{ exact: true }"` to require an exact URL match.

```html
<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
<a routerLink="/about" routerLinkActive="active">About</a>
```

Good reflex: when Angular behavior seems too broad → look for an `exact` or `strict` option.

### Flat layout component

A component without sub-components does not need its own subfolder.
`layout.ts` lives directly in `layout/` — sub-components (`header/`, `nav/`) get their own subfolder when created.

---

## ⚡ Signals

### signal() — writable reactive state

```typescript
hero = signal<HeroModel>({ name: 'Hero', hp: 100, ... });

hero.set({ ...newValue });                        // replace
hero.update(h => ({ ...h, hp: h.hp - 10 }));     // update from current
```

Always use spread `{ ...h }` to avoid mutating the object directly.

### computed() — derived state

```typescript
isAlive = computed(() => this.hero().hp > 0);
```

Auto-updates when any signal it reads changes. Read-only — cannot be set directly.

### @for — list rendering

```html
@for (log of logs(); track $index) {
  <p>{{ log }}</p>
}
```

`track` is mandatory. Use `$index` for simple lists, use a unique id for object lists.

### @if — conditional rendering

```html
@if (isAlive()) {
  <p>Alive</p>
} @else {
  <p>Fallen</p>
}
```

### @let — template local variable

```html
@let heroData = hero();
```

Avoids calling `hero()` multiple times in the template. Must end with `;`.

### Model naming conflict

With Angular 20 (no `Component` suffix), a component and its model can both want the same name.
Convention: suffix the interface with `Model` when it conflicts.

```typescript
export interface HeroModel { ... }  // in hero.model.ts
export class Hero { ... }           // component in hero.ts
```

### input() — signal-based parent → child

Angular 17+ alternative to `@Input()` decorator. Integrates natively with signals.

```typescript
// Child component
hero = input.required<HeroModel>();   // required input
name = input<string>('default');      // optional with default

// Read in template
hero().name

// Read in class
this.hero().name
```

Pass from parent template:
```html
<app-hero-stats [hero]="hero()" />
```

Note: pass the signal **value** (`hero()`), not the signal itself (`hero`).

### Template-driven forms

Import `FormsModule` in the component, then use `[(ngModel)]` for two-way binding.

```typescript
imports: [FormsModule]
```

```html
<form (submit)="onSubmit()">
  <input [(ngModel)]="name" name="name" required />
  <input type="number" [(ngModel)]="quantity" name="quantity" />
  <button type="submit">Add</button>
</form>
```

`[()]` = "banana in a box" = two-way binding: reads AND writes the variable.

| Approach | Module | Logic in | Best for |
|---|---|---|---|
| Template-driven | `FormsModule` | Template | Simple forms |
| Reactive | `ReactiveFormsModule` | TypeScript | Complex, dynamic forms |

**`type="submit"` vs `type="button"`:**

| | `type="submit"` | `type="button" (click)` |
|---|---|---|
| Submit via `Enter` | ✅ | ❌ |
| Triggers form `(submit)` event | ✅ | ❌ |
| Angular Forms compatible | ✅ | partial |
| Usage | primary submit button | secondary buttons (Reset, Cancel) |

Always use `type="submit"` for the main form button.

**Pattern — dumb form component:**
- Declare local fields for form values
- Validate in `onSubmit()` before emitting
- Emit complete object via `output()`
- Reset fields after emit
- No service knowledge

### Smart vs Dumb components

| Type | Role | Example |
|---|---|---|
| Smart | Knows services, manages state | `Inventory` |
| Dumb | Only `input()` + `output()`, no service | `ItemCard` |

Dumb components are reusable and easy to test — they have no dependencies.

### $event and template variables

**`$event`** — always available in event bindings `()`:

| Source | `$event` contains |
|---|---|
| `(click)` DOM | `MouseEvent` |
| `(input)` DOM | `InputEvent` |
| `output<string>()` | `string` (emitted value) |
| `output<ItemModel>()` | `ItemModel` |
| `output<void>()` | `undefined` |

**`@for` variables:**

| Variable | Description |
|---|---|
| `$index` | Current item index |
| `$first` | True if first item |
| `$last` | True if last item |
| `$even` | True if index is even |
| `$odd` | True if index is odd |
| `$count` | Total number of items |

### `protected` vs `readonly` — where to use what

| Location | Pattern | Why |
|---|---|---|
| Component | `protected readonly heroService = inject(HeroService)` | Accessible from template + child classes, not from outside |
| Service | `readonly hero = this._hero.asReadonly()` | Public — must be accessible from any injecting component |

`protected` in a service makes no sense — it would prevent components from reading the signal.

### `@for` with objects — always track by id

```html
@for (item of items(); track item.id) { ... }
```

Use `track item.id` (unique field), not `track $index`.
`$index` is fragile: reordering or filtering causes Angular to re-render wrong items.

### crypto.randomUUID()

Native browser/Node API — no external dependency needed.
Returns a v4 UUID typed as `` `${string}-${string}-${string}-${string}-${string}` `` (TypeScript Template Literal Type).

```typescript
const id = crypto.randomUUID(); // "550e8400-e29b-41d4-a716-446655440000"
```

### Services — Injectable singleton

```typescript
@Injectable({ providedIn: 'root' })
export class HeroService {
  // private writable signals
  private _hero = signal<HeroModel>({...});
  private _actionLogs = signal<string[]>([]);

  // public read-only exposure
  readonly hero = this._hero.asReadonly();
  readonly actionLogs = this._actionLogs.asReadonly();
}
```

**`asReadonly()` vs getter method:**

```typescript
// ❌ getter — not reactive
getHero() { return this._hero(); }  // returns a value at a point in time

// ✅ asReadonly() — reactive
readonly hero = this._hero.asReadonly();  // Angular tracks changes, template updates automatically
```

**Inject in component:**

```typescript
export class Hero {
  readonly heroService = inject(HeroService);
}
```

**Rule:** service owns state and business logic, component is UI-only.

### Reusable shared component pattern

A component belongs in `shared/components/` when:
- It has no knowledge of any feature (no `HeroModel`, no service)
- It receives all data via `input()`
- It can be used in multiple features

```typescript
// shared/components/stat-bar/stat-bar.ts
export class StatBar {
  label = input.required<string>();
  value = input.required<number>();
  max = input.required<number>();
}
```

```html
<!-- feature template -->
<app-stat-bar [label]="'HP'" [value]="hero().hp" [max]="hero().maxHp" />
```

Pass string literals with `[label]="'HP'"` (not `label="HP"` — that would be a plain HTML attribute, not Angular binding).

### output() — signal-based child → parent

Angular 17+ alternative to `@Output()` + `EventEmitter`.

```typescript
// Child component
gainXP = output<void>();
takeDamage = output<number>();  // with payload

// Emit directly from template (no intermediate method needed)
// hero-actions.html
<button (click)="gainXP.emit()">Gain XP</button>
```

Listen in parent template:
```html
<app-hero-actions (gainXP)="onGainXP()" (takeDamage)="onTakeDamage()" />
```

**Rule:** child emits events, parent owns state and handles mutations.
Naming convention: `handle*` in child (if needed), `on*` in parent.

### computed() in child components

A child component can define its own `computed()` from an `input()` signal:

```typescript
hero = input.required<HeroModel>();
isAlive = computed(() => this.hero().hp > 0);
```

This keeps derived logic close to where it's displayed.

---

## 🔧 Pipes

### Built-in pipes

```html
{{ item.name | titlecase }}       <!-- Hello World -->
{{ item.name | uppercase }}       <!-- HELLO WORLD -->
{{ item.name | lowercase }}       <!-- hello world -->
{{ price | currency:'EUR' }}      <!-- €9.99 -->
{{ count | number:'1.0-2' }}      <!-- 3.14 -->
{{ obj | json }}                  <!-- debug output -->
{{ items | slice:0:3 }}           <!-- first 3 items -->
```

Import from `@angular/common` and add to component `imports: []`.

### Custom pipe

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemType', standalone: true })
export class ItemTypePipe implements PipeTransform {
  transform(type: string): string {
    if (type === 'sword') return '⚔️ Sword';
    if (type === 'potion') return '🧪 Potion';
    return '📦 ' + type.charAt(0).toUpperCase() + type.slice(1);
  }
}
```

Import in the component that uses it:
```typescript
imports: [ItemTypePipe]
```

Use in template:
```html
{{ item.type | itemType }}
```

### Pure pipes (default)

Pipes are **pure** by default — Angular only re-runs `transform()` when the input reference changes.
This makes them very performant. Avoid `pure: false` unless necessary.

### Pipe vs private method

For simple string formatting inside a pipe, a private method is fine:
```typescript
private titlecase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```
No need to inject `TitleCasePipe` inside another pipe — that's over-engineering for a simple fallback.

---

## 🔔 effect()

### What it is

`effect()` runs a side effect automatically whenever a signal it reads changes.
It must be called in an **injection context** (constructor, or with `injector`).

```typescript
constructor() {
  effect(() => {
    const hero = this.heroService.hero(); // subscribes to this signal
    console.log('Hero changed:', hero);
  });
}
```

### Service observing another service

A service can inject another service and listen to its signals via `effect()` — without the observed service knowing it exists.

```typescript
@Injectable({ providedIn: 'root' })
export class JournalService {
  private heroService = inject(HeroService);

  constructor() {
    effect(() => {
      const hero = this.heroService.hero(); // read-only
      // log changes without touching HeroService
    });
  }
}
```

This respects the **Open/Closed principle**: `HeroService` is closed to modification, open to observation.

### previousState pattern

To detect *what* changed between two emissions, store the previous state:

```typescript
private previousHero: HeroModel | null = null;

constructor() {
  effect(() => {
    const current = this.heroService.hero();

    if (this.previousHero) {
      if (current.xp > this.previousHero.xp) { /* XP gained */ }
      if (current.hp < this.previousHero.hp) { /* HP lost */ }
      if (current.level > this.previousHero.level) { /* Level up */ }
    }

    this.previousHero = current;
  });
}
```

First call: `previousHero` is null → skip comparisons → store initial state.
Subsequent calls: compare and log.

### Multiple effect() in one constructor

One `effect()` per signal source — cleaner, single responsibility:

```typescript
constructor() {
  effect(() => this._heroEffect());
  effect(() => this._itemEffect());
}
```

### @empty in @for

```html
@for (entry of entries(); track entry.id) {
  <div>{{ entry.content }}</div>
} @empty {
  <p>No entries yet.</p>
}
```

Renders the `@empty` block when the list is empty — no `@if` needed.

### JS truthy trap — empty array

```typescript
if ([]) { } // always true — [] is truthy in JS
```

Never use `if (arr)` to check for an empty array. Use `if (arr.length > 0)` instead.

---

## 🔍 Reactive Filter & Sort with computed()

### Pattern

Use private signals for filter criteria + one `computed()` that derives the filtered/sorted list:

```typescript
private name = signal('');
private type = signal('all');
private sortAsc = signal(true);

readonly adventurers = computed(() => {
  const list = this._items().filter(item => {
    const matchName = item.name.includes(this.name());
    const matchType = this.type() === 'all' || item.type === this.type();
    return matchName && matchType;
  });
  return list.sort((a, b) =>
    this.sortAsc() ? a.level - b.level : b.level - a.level
  );
});

filter(criteria: { name: string; type: string; sortAsc: boolean }) {
  this.name.set(criteria.name);
  this.type.set(criteria.type);
  this.sortAsc.set(criteria.sortAsc);
}
```

- No "Search" button needed — `computed()` re-runs automatically when any signal changes
- `computed()` is synchronous — the filtered list is immediately available after `filter()` is called

### Deselect on filter change

When the selected item may no longer be in the filtered list, reset it:

```typescript
formChange() {
  this.service.filter({ ... });
  if (this.selected()) {
    const stillVisible = this.service.items().find(i => i.id === this.selected()!.id);
    if (!stillVisible) this.selected.set(null);
  }
}
```

### Smart/dumb with nullable selection

- Smart component: `selected = signal<ItemModel | null>(null)`
- Template: `@if (selected()) { <app-card [item]="selected()!"> }`
- Dumb card: `item = input.required<ItemModel>()` — no null handling needed

The `!` (non-null assertion) in the template is safe here because `@if` already guards.

### Type union must match option values

```typescript
// model
type: 'warrior' | 'magician' | 'elf'

// template — values must match exactly
<option value="magician">magician</option>  // ✅
<option value="magical">magical</option>    // ❌ never matches
```

---

## 🔍 Template References & ViewChild

### Template reference (`#ref`) — accès direct dans le template

```html
<input #searchInput type="text" />
<button (click)="searchInput.focus()">Focus</button>

<app-hero-stats #statBar [hero]="heroData" />
<button (click)="statBar.flash()">Flash</button>
```

- Sur un élément DOM → accès aux propriétés DOM (`value`, `focus()`, `textContent`...)
- Sur un composant → accès à l'instance du composant (ses méthodes publiques)
- Portée limitée au bloc où la ref est déclarée — une ref dans un `@if` n'est pas accessible en dehors

### ViewChild — accès depuis le TypeScript

```typescript
// Élément DOM natif → ElementRef
@ViewChild("heroDiv") heroDiv!: ElementRef<HTMLDivElement>;

// Composant Angular → type du composant
@ViewChild("statBar") statBar!: HeroStats;

ngAfterViewInit() {
  this.heroDiv.nativeElement.textContent = 'Updated!';
  this.statBar.flash();
}
```

Règle : `ElementRef` pour les éléments DOM, type du composant pour les composants Angular.
Ne jamais appeler `nativeElement` sur un composant — ça n'expose pas ses méthodes.

### Cycle de vie — quand ViewChild est disponible

```
constructor()      → pas de DOM
ngOnInit()         → DOM absent (sauf static: true sur élément toujours présent)
ngAfterViewInit()  → DOM disponible ✅
```

### static: true vs static: false

| | `static: false` (défaut) | `static: true` |
|---|---|---|
| Résolu | après le rendu | avant le rendu |
| Disponible dans `ngOnInit` | ❌ | ✅ (si hors `@if`) |
| Disponible dans `ngAfterViewInit` | ✅ | ✅ |
| Dans un `@if` | ✅ (`undefined` si condition false) | ❌ toujours `undefined` |

`static: true` + `@if` = toujours `undefined` — Angular ne peut pas résoudre un élément conditionnel statiquement.

**Règle pratique :** utilise toujours `static: false` (défaut). Ne mets `static: true` que si tu as besoin de l'élément dans `ngOnInit` ET qu'il est toujours présent dans le template.

---

## 📦 Content Projection — ng-content

### Principe

`ng-content` permet à un composant d'être une "coquille" — il définit la structure, le parent décide du contenu.
Le composant ne sait pas ce qu'il affiche. C'est ce qui le rend vraiment réutilisable.

```typescript
// panel.ts — aucun input(), aucune logique
@Component({ selector: 'app-panel', ... })
export class Panel {}
```

```html
<!-- panel.html -->
<div class="panel">
  <ng-content></ng-content>
</div>

<!-- parent.html — le parent injecte ce qu'il veut -->
<app-panel>
  <p>N'importe quel contenu ici.</p>
</app-panel>
```

### Projection nommée — plusieurs zones avec select

Quand on veut des zones distinctes (titre, corps...), on utilise `select` :

```html
<!-- panel.html -->
<div class="panel">
  <div class="panel-header">
    <ng-content select="[panel-title]"></ng-content>
  </div>
  <div class="panel-body">
    <ng-content select="[panel-body]"></ng-content>
  </div>
  <ng-content></ng-content> <!-- contenu sans attribut -->
</div>

<!-- parent.html -->
<app-panel>
  <h3 panel-title>Titre</h3>
  <p panel-body>Corps du panneau.</p>
  <p>Contenu libre (capturé par ng-content générique).</p>
</app-panel>
```

`select` accepte n'importe quel sélecteur CSS : attribut `[panel-title]`, classe `.title`, balise `h3`...

### @ViewChild par type vs par string

```typescript
// Par string — fonctionne, mais fragile si la ref change dans le template
@ViewChild('Modal') modal!: Modal;

// Par type — plus robuste, pas besoin de #ref dans le template
@ViewChild(Modal) modal!: Modal;
```

Préférer `@ViewChild(ComponentType)` quand on cible un composant Angular.
Garder `@ViewChild('ref')` pour les éléments DOM natifs (`ElementRef`).

### Règle clé

Un composant avec `ng-content` ne modifie pas le contenu projeté — il lui fournit juste un emplacement.
Le même composant peut accueillir des contenus radicalement différents selon le contexte d'utilisation.

| Approche | Quand l'utiliser |
|---|---|
| `input()` | Le composant contrôle comment afficher la donnée |
| `ng-content` | Le parent contrôle entièrement ce qui s'affiche |

---

## 🎲 Random Draw — signal vs computed()

### When NOT to use computed()

`computed()` derives a value from existing signal state — it re-runs when its dependencies change.
A random draw has **no upstream state that changes** — it's an action triggered by user input.

```typescript
// ❌ computed() — wrong: no signal to react to, result would be frozen
readonly chestItems = computed(() => this.pickRandomItems(3)); // only runs once

// ✅ signal + method — correct: explicit action mutates state
private _chestItems = signal<ChestItemModel[]>([]);
readonly chestItems = this._chestItems.asReadonly();

pickRandomItems(n: number) {
  const shuffled = [...this.items()].sort(() => 0.5 - Math.random());
  this._chestItems.set(shuffled.slice(0, n));
}
```

Mental model: **computed = derivation (what is it?), signal + method = action (do something).**

### Spread before sort — avoid mutating signal array

`.sort()` sorts **in place** — it mutates the original array.
If `this.items()` returns the signal's internal array, sorting it would corrupt the signal's state.

```typescript
// ❌ mutates signal internal array
this.items().sort(() => 0.5 - Math.random());

// ✅ spread first — works on a copy
[...this.items()].sort(() => 0.5 - Math.random());
```

---

## 🧬 Interface Inheritance

### extends — add fields without modifying the base

`ChestItemModel` needs all fields from `ItemModel` plus a `description`.
Use `extends` to inherit — the base interface stays unchanged (Open/Closed).

```typescript
// inventory.model.ts
export interface ItemModel {
  id: string;
  name: string;
  type: string;
  quantity: number;
  equipped: boolean;
}

// chest.model.ts
import { ItemModel } from '../inventory/inventory.model';

export interface ChestItemModel extends ItemModel {
  description: string; // adds one field
}
```

`ChestItemModel` has all 5 fields from `ItemModel` + `description`.
Since `ChestItemModel extends ItemModel`, anywhere `ItemModel` is expected you can pass a `ChestItemModel`.

This allows reusing `ItemCard` (which expects `ItemModel`) in the chest template without modification.

### output() opt-in — unlistened outputs are silently ignored

`ItemCard` declares `removed` and `equipped` outputs.
In the chest context, the parent doesn't bind them — Angular does not throw an error.
Outputs are opt-in: the parent decides whether to listen.

```html
<!-- ✅ valid — chest only uses [item], ignores removed/equipped outputs -->
<app-item-card [item]="item"></app-item-card>
```

This makes dumb components safe to reuse in contexts that only need a subset of their features.

---

## 🔗 Template References (#ref)

### Reference on a native DOM element

Add `#ref` on any HTML element to access it directly in the template — no `ngModel`, no signal, no component property needed.

```html
<input #heroInput />
<button (click)="log(heroInput.value)">Print</button>
```

`heroInput` is an `HTMLInputElement` — you can access `.value`, `.focus()`, etc. directly.

### Reference on a child component

Add `#ref` on a component selector to access its **instance** and call its public methods:

```html
<app-hero-stats #statBar [hero]="heroData" />
<button (click)="statBar.flash()">Flash</button>
```

The referenced method must be `public` — `protected` or `private` will cause a compile error.

### Scope — references are block-scoped

A `#ref` is only accessible within the structural block where it is declared (`@if`, `@for`, etc.).

```html
@if (condition) {
  <p #myRef>...</p>
  <button (click)="log(myRef.textContent)">OK</button>  <!-- ✅ inside the block -->
}
<button (click)="log(myRef.textContent)">KO</button>  <!-- ❌ compile error — myRef out of scope -->
```

If you need access from TypeScript (not just the template), use `ViewChild` instead.

---

## 🚦 Lazy Loading

### Eager vs Lazy

| | Eager | Lazy |
|---|---|---|
| Chargement | Au démarrage | Au premier accès à la route |
| Bundle | Tout dans `main.js` | Chunk JS séparé par route |
| Temps de démarrage | Plus lent | Plus rapide |

### loadComponent — dynamic import

```typescript
{
  path: 'hero',
  loadComponent: () => import('./features/hero/hero').then(m => m.Hero)
}
```

- `import()` = dynamic import — le navigateur ne charge le fichier qu'à la première navigation
- Le chunk est mis en **cache** après le premier chargement — les navigations suivantes ne re-téléchargent rien
- La liste des chunks est visible à la compilation (`ng build`) ou dans le terminal `ng serve`

### Chunks partagés anonymes

Quand plusieurs features utilisent le même composant (`Panel`, `Modal`...), Angular extrait ce code dans un chunk commun sans nom. Ce chunk est chargé une seule fois et partagé entre toutes les features qui en ont besoin.

```
chunk-HKVNHQQT.js   | -    ← code partagé (Panel, Modal, etc.)
chunk-JGDS2HHE.js   | about ← chunk de la route /about
chunk-QDWCW5TT.js   | inventory ← chunk de la route /inventory
```

### PreloadAllModules

```typescript
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

provideRouter(routes, withPreloading(PreloadAllModules))
```

Précharge tous les chunks lazy **en arrière-plan** après le premier rendu — sans bloquer l'affichage initial.
À utiliser avec prudence : charge tout même ce que l'utilisateur ne visitera peut-être pas.

---

## 🗂️ Child Routes

### Structure

Un composant parent devient un **shell** : il affiche la structure commune et délègue le contenu via `<router-outlet />`.

```typescript
// app.routes.ts
{
  path: 'inventory',
  loadComponent: () => import('./features/inventory/inventory').then(m => m.Inventory),
  children: [
    { path: '', loadComponent: () => import('./inventory-list/inventory-list').then(m => m.InventoryList) },
    { path: ':id', loadComponent: () => import('./inventory-detail/inventory-detail').then(m => m.InventoryDetail) }
  ]
}
```

```html
<!-- inventory.html — shell -->
<h2>Inventory</h2>
<router-outlet />   ← les enfants s'affichent ici
```

### Piège — loadComponent manquant sur le parent

Sans `loadComponent` sur la route parent, Angular ne monte pas le shell — il va directement aux children. Le `<h2>` et le `<router-outlet />` n'apparaissent jamais.

```typescript
// ❌ pas de shell — Angular ignore le composant parent
{ path: 'inventory', children: [...] }

// ✅ shell monté avant les children
{ path: 'inventory', loadComponent: () => ..., children: [...] }
```

### Lire un paramètre de route

```typescript
export class InventoryDetail implements OnInit {
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // string | null
    if (!id) return;
    // utiliser id
  }
}
```

`snapshot.paramMap.get()` retourne `string | null` — toujours vérifier avant d'utiliser.

### Lien vers une child route

```html
<!-- chemin relatif — résolu depuis la route courante -->
<a [routerLink]="[item.id]">Détail</a>

<!-- chemin absolu -->
<a [routerLink]="['/inventory', item.id]">Détail</a>
```

### input<boolean>(false) — comportement optionnel dans un dumb component

Quand un composant est réutilisé dans plusieurs contextes avec des besoins différents, un `input<boolean>` optionnel évite de dupliquer le composant :

```typescript
// item-card.ts
showLink = input<boolean>(false);
```

```html
<!-- item-card.html -->
@if(showLink()) {
  <a [routerLink]="[item().id]">Détail</a>
}
```

```html
<!-- liste → lien visible -->
<app-item-card [item]="item" [showLink]="true" />

<!-- détail → lien masqué (défaut false) -->
<app-item-card [item]="item" />
```

---

## 🖼️ SQ-04 — Galerie des Légendes

### @let pour le type narrowing dans le template

Quand un signal est typé `T | null`, chaque appel `signal()` est indépendant pour le type checker — même à l'intérieur d'un `@if`, il exige `?.` sur chaque accès.

Solution : capturer la valeur une fois avec `@let`, puis la narrower avec `@if` :

```html
@let l = legend();
@if(l) {
  <p>{{ l.name }}</p>    <!-- ✅ plus besoin de ?. -->
  <p>{{ l.level }}</p>
}
```

Alternative avec `@if ... as` :

```html
@if(legend(); as l) {
  <p>{{ l.name }}</p>
}
```

Dans les deux cas, `l` est de type `T` (non-null) à l'intérieur du bloc.

### input<T | null> vs input.required<T> — le cas ng-content dans une modal

Quand un composant est projeté via `ng-content` dans une modal, il existe dans le DOM **dès le chargement** — même avant que la modal soit ouverte.

```html
<app-modal>
  <app-legend-card modal-body [legend]="selectedLegend()"></app-legend-card>
</app-modal>
```

Si `selectedLegend()` est `null` au démarrage et que `LegendCard` déclare `input.required<LegendModel>()`, Angular exigera une valeur non-nulle à tout moment — impossible ici.

```typescript
// ❌ input.required — impossible si la valeur peut être null au démarrage
legend = input.required<LegendModel>();

// ✅ input nullable — le composant gère lui-même le cas null
legend = input<LegendModel | null>(null);
```

Le piège associé : mettre `<app-modal>` dans un `@if(selectedLegend())` pour forcer `input.required()` — ça résout le type mais casse `@ViewChild(Modal)` (l'élément conditionnel ne peut pas être résolu statiquement).

**Règle :** si le composant doit exister avant que la donnée soit disponible, utilise `input<T | null>` et gère le cas null avec `@if`/`@let` dans le template.

### Où placer les données statiques

| Cas | Emplacement |
|---|---|
| Données utilisées par une seule feature | `features/<feature>/<feature>.data.ts` |
| Données partagées entre plusieurs features | `shared/data/` ou `app/data/` |

```
features/gallery/
  legends.data.ts    ← ✅ uniquement utilisé par LegendsService
  legend.model.ts
  legends.service.ts
```

---

## ⚙️ Angular CLI & Tooling

### ng generate naming pitfall

`ng g c layout/LayoutComponent` converts `LayoutComponent` to `layout-component` and creates a subfolder with that name.
Prefer: `ng g c layout/layout --flat` to avoid unwanted nesting.

### Angular 20 naming convention

The CLI no longer generates `.component.` suffix in filenames or `Component` suffix in class names.

| Type | File | Class |
|---|---|---|
| Component | `hero.ts` | `Hero` |
| Service | `hero.service.ts` | `HeroService` |
| Guard | `auth.guard.ts` | `AuthGuard` |

### VS Code Language Server cache

After renaming/deleting files, the Angular Language Server may show stale errors.
Fix: `Ctrl+Shift+P` → `Developer: Reload Window`

---
