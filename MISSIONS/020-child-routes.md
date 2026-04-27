# Mission 020 — Child Routes

## Objectif

Structurer les routes d'une feature avec des sous-routes (`children`) et un `router-outlet` dédié.

## Contexte

Actuellement toutes tes routes sont à plat dans `app.routes.ts`. Quand une feature devient complexe (liste + détail, onglets, sous-pages), on utilise des **child routes** pour organiser la navigation à l'intérieur de la feature.

## Concepts clés

### Structure de base

```typescript
// app.routes.ts
{
  path: 'inventory',
  loadComponent: () => import('./features/inventory/inventory').then(m => m.Inventory),
  children: [
    {
      path: '',           // /inventory
      loadComponent: () => import('./features/inventory/inventory-list/inventory-list').then(m => m.InventoryList),
    },
    {
      path: ':id',        // /inventory/abc-123
      loadComponent: () => import('./features/inventory/inventory-detail/inventory-detail').then(m => m.InventoryDetail),
    }
  ]
}
```

- Le composant parent (`Inventory`) devient un **shell** — il affiche la structure commune et délègue le contenu via `<router-outlet />`
- Les enfants (`InventoryList`, `InventoryDetail`) s'affichent à l'intérieur du shell

### router-outlet dans le parent

```html
<!-- inventory.html -->
<h2>Inventory</h2>
<nav>
  <a routerLink="/inventory">List</a>
</nav>

<router-outlet />   ← les enfants s'affichent ici
```

### Route par défaut dans children

```typescript
children: [
  { path: '', component: InventoryList },   // /inventory → affiche la liste
  { path: ':id', component: InventoryDetail } // /inventory/123 → affiche le détail
]
```

`path: ''` dans `children` = route par défaut quand on arrive sur le parent sans sous-chemin.

### Lire un paramètre de route

```typescript
import { ActivatedRoute } from '@angular/router';

export class InventoryDetail {
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  }
}
```

## Exercice

Tu vas restructurer la feature `Inventory` pour avoir :
- `/inventory` → liste des items (ce qui existe déjà)
- `/inventory/:id` → page de détail d'un item

### Étapes

1. **Crée un composant** `inventory-detail` dans `features/inventory/inventory-detail/`
   - Il reçoit l'`id` depuis la route (`ActivatedRoute`)
   - Il affiche l'item correspondant (cherche dans `InventoryService`)
   - Si l'item n'existe pas → affiche "Item not found"

2. **Transforme `Inventory`** en shell
   - Retire la liste des items de `inventory.html`
   - Crée un composant `inventory-list` qui contient l'affichage de la liste actuelle
   - `inventory.html` ne garde que la structure commune + `<router-outlet />`

3. **Configure les child routes** dans `app.routes.ts`
   ```typescript
   {
     path: 'inventory',
     loadComponent: () => ...,
     children: [
       { path: '', loadComponent: () => ... },         // inventory-list
       { path: ':id', loadComponent: () => ... },      // inventory-detail
     ]
   }
   ```

4. **Ajoute un lien** depuis chaque item de la liste vers `/inventory/:id`
   ```html
   <a [routerLink]="['/inventory', item.id]">Voir le détail</a>
   ```

## Validation attendue

- `/inventory` affiche la liste des items
- `/inventory/:id` affiche le détail de l'item correspondant
- `/inventory/id-inexistant` affiche "Item not found"
- Le shell `Inventory` contient un `<router-outlet />`
- Les child routes utilisent `loadComponent`
- Le paramètre `:id` est lu depuis `ActivatedRoute`
