# Mission 022 — Resolvers

## Objectif

Précharger des données avant l'affichage d'une route avec un resolver fonctionnel.

## Contexte

Actuellement, `InventoryDetail` charge l'item dans `ngOnInit` — la page s'affiche d'abord vide, puis les données apparaissent. Un resolver résout ce problème : Angular attend que les données soient prêtes **avant** d'activer la route.

## Concepts clés

### Resolver fonctionnel

```typescript
// core/resolvers/item.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const itemResolver: ResolveFn<ItemModel | undefined> = (route) => {
  const inventoryService = inject(InventoryService);
  const id = route.paramMap.get('id') ?? '';
  return inventoryService.findItemById(id);
};
```

- `ResolveFn<T>` — type du resolver, `T` est le type de la donnée retournée
- Peut retourner une valeur directe, une `Promise`, ou un `Observable`
- S'exécute **avant** que le composant soit créé

### Appliquer un resolver à une route

```typescript
{
  path: ':id',
  resolve: { item: itemResolver },
  loadComponent: () => import('./inventory-detail').then(m => m.InventoryDetail)
}
```

La clé `item` correspond au nom sous lequel la donnée sera accessible dans le composant.

### Lire les données du resolver dans le composant

```typescript
export class InventoryDetail {
  private route = inject(ActivatedRoute);
  protected item = this.route.snapshot.data['item'] as ItemModel | undefined;
}
```

`route.snapshot.data` contient toutes les données résolues pour cette route.

### Resolver vs ngOnInit

| | `ngOnInit` | Resolver |
|---|---|---|
| Quand | Après affichage du composant | Avant affichage |
| Données disponibles | Après chargement async | Dès le premier rendu |
| Composant affiché si pas de données | Oui (état vide) | Non (attend) |
| Cas d'usage | Données non critiques | Données nécessaires au rendu |

## Exercice

### 1. Créer le resolver

Crée `src/app/features/inventory/resolvers/item.resolver.ts`.

Le resolver lit l'`:id` depuis la route et retourne l'item correspondant depuis `InventoryService`.

### 2. Appliquer le resolver

Dans `app.routes.ts`, ajoute `resolve` sur la route `/inventory/:id`.

### 3. Simplifier InventoryDetail

`InventoryDetail` n'a plus besoin de `ngOnInit` ni de `signal` — la donnée est déjà disponible dans `route.snapshot.data` dès la construction.

```typescript
export class InventoryDetail {
  private route = inject(ActivatedRoute);
  protected item = this.route.snapshot.data['item'] as ItemModel | undefined;
}
```

### 4. Tester

- Navigue vers `/inventory/:id` avec un id valide → item affiché immédiatement
- Navigue vers `/inventory/id-inexistant` → `item` est `undefined`, affiche "Item not found"

## Validation attendue

- Resolver fonctionnel dans `features/inventory/resolvers/`
- `resolve: { item: itemResolver }` sur la route `:id`
- `InventoryDetail` lit depuis `route.snapshot.data` — plus de `ngOnInit`, plus de `signal`
- Cas "not found" géré
