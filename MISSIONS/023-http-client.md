# Mission 023 — HttpClient & GET

## Objectif

Remplacer les données codées en dur dans `InventoryService` par un appel HTTP vers json-server.

## Contexte

Jusqu'ici, l'inventaire charge des items depuis un tableau statique dans le service. En production, les données viennent d'un backend. `HttpClient` est le module Angular pour faire des requêtes HTTP.

json-server tourne déjà sur `http://localhost:3000`. Il expose un endpoint `/inventory`.

## Concepts clés

### Activer HttpClient

```typescript
// app.config.ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ...
  ]
};
```

`provideHttpClient()` rend `HttpClient` injectable dans toute l'application.

### Observable — flux de données asynchrone

`HttpClient` retourne des **Observables** (RxJS), pas des Promises ni des valeurs directes.

```typescript
// Un Observable est lazy — rien ne se passe tant qu'on ne subscribe pas
const obs$ = this.http.get<ItemModel[]>('/api/items'); // pas encore de requête HTTP ici

obs$.subscribe(items => {
  // la requête est lancée ici
  // items contient les données quand elles arrivent
});
```

Conventions :
- Les variables Observable sont suffixées par `$` : `items$`, `hero$`
- Un Observable HTTP se complète automatiquement après la réponse — pas besoin de désabonnement

### HttpClient dans un service

```typescript
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);
  private _items = signal<ItemModel[]>([]);
  readonly items = this._items.asReadonly();

  loadItems() {
    this.http.get<ItemModel[]>('http://localhost:3000/inventory').subscribe(items => {
      this._items.set(items);
    });
  }
}
```

### Déclencher le chargement

Le service expose une méthode `loadItems()`. C'est le **composant smart** qui décide quand charger :

```typescript
export class Inventory {
  private readonly inventoryService = inject(InventoryService);

  constructor() {
    this.inventoryService.loadItems();
  }
}
```

`constructor` est un endroit valide pour déclencher un chargement — pas besoin de `ngOnInit` si on n'a pas besoin du DOM.

## Exercice

### 1. Adapter db.json

Les items dans `db.json` doivent correspondre au modèle `ItemModel` du projet.

Remplace le tableau `inventory` dans `server/db.json` par :

```json
"inventory": [
  { "id": "1", "name": "Rusty Sword", "type": "sword", "quantity": 1, "equipped": true },
  { "id": "2", "name": "Leather Armor", "type": "armor", "quantity": 1, "equipped": false },
  { "id": "3", "name": "Healing Potion", "type": "potion", "quantity": 3, "equipped": false }
]
```

Note : les `id` sont des strings pour correspondre au type `string` dans `ItemModel`.

### 2. Activer HttpClient

Dans `app.config.ts`, ajoute `provideHttpClient()` aux providers.

### 3. Modifier InventoryService

- Injecte `HttpClient`
- Remplace les données codées en dur par un signal vide `signal<ItemModel[]>([])`
- Ajoute une méthode `loadItems()` qui fait un GET vers `http://localhost:3000/inventory` et set le signal

### 4. Déclencher le chargement

Dans le composant `Inventory`, appelle `inventoryService.loadItems()` dans le constructeur.

### 5. Vérifier

- Lance json-server : `npm run server` (ou la commande habituelle)
- Lance l'app : `ng serve`
- Navigue vers `/inventory` → les items de `db.json` doivent s'afficher

## Validation attendue

- `provideHttpClient()` dans `app.config.ts`
- `InventoryService` injecte `HttpClient`, plus de données hardcodées
- `loadItems()` fait un `GET /inventory` et remplit le signal
- `Inventory` déclenche `loadItems()` au démarrage
- Les données viennent bien de json-server (vérifie en modifiant `db.json` et rechargeant)
