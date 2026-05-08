# Mission 025 — Loading & Error States

## Objectif

Gérer les états intermédiaires d'une requête HTTP : chargement en cours et erreur serveur.

## Contexte

Actuellement, `loadItems()` fait la requête et met à jour le signal — mais si le serveur est lent ou hors ligne, l'utilisateur voit une liste vide sans aucun feedback. Une app HTTP correcte gère trois états : **loading**, **error**, **data**.

## Concepts clés

### Les trois états d'une requête HTTP

```
loading → data    (cas nominal)
loading → error   (serveur hors ligne, 404, 500...)
```

On modélise ces états avec deux signals supplémentaires dans le service :

```typescript
private _loading = signal(false);
private _error = signal<string | null>(null);

readonly loading = this._loading.asReadonly();
readonly error = this._error.asReadonly();
```

### Gérer les états dans subscribe()

`subscribe()` accepte un objet avec trois callbacks :

```typescript
this.http.get<ItemModel[]>(url).subscribe({
  next: (items) => {
    this._items.set(items);
    this._loading.set(false);
  },
  error: (err) => {
    this._error.set('Impossible de charger les items.');
    this._loading.set(false);
  }
});
```

- `next` — appelé quand la réponse arrive (statut 2xx)
- `error` — appelé si la requête échoue (réseau, 4xx, 5xx)
- `complete` — appelé quand l'Observable se termine (rarement utile avec HttpClient)

### Afficher les états dans le template

```html
@if (inventoryService.loading()) {
  <p>Chargement...</p>
} @else if (inventoryService.error()) {
  <p>{{ inventoryService.error() }}</p>
} @else {
  @for (item of inventoryService.items(); track item.id) {
    <app-item-card [item]="item" />
  }
}
```

### Réinitialiser l'état avant chaque requête

```typescript
loadItems() {
  this._loading.set(true);
  this._error.set(null);  // reset de l'erreur précédente
  this.http.get<ItemModel[]>(url).subscribe({ ... });
}
```

## Exercice

### 1. Ajouter les signals dans InventoryService

Ajoute `_loading` et `_error` dans le service, exposés en lecture seule.

### 2. Mettre à jour loadItems()

- Set `_loading` à `true` avant la requête
- Reset `_error` à `null` avant la requête
- Dans `next` : set les items, set `_loading` à `false`
- Dans `error` : set un message d'erreur, set `_loading` à `false`

### 3. Afficher les états dans le template

Dans `inventory-list.html`, remplace l'affichage de la liste par une logique à trois branches :
- loading → message "Chargement..."
- error → message d'erreur
- sinon → liste des items

### 4. Tester les deux cas

**Cas nominal :** json-server tourne → liste s'affiche après un court instant.

**Cas erreur :** arrête json-server (`Ctrl+C`), recharge la page → message d'erreur s'affiche.

## Validation attendue

- `InventoryService` expose `loading` et `error` en lecture seule
- `loadItems()` gère `next` et `error` dans `subscribe()`
- Le template affiche un état de chargement, un état d'erreur, ou la liste
- Le message d'erreur s'affiche bien quand json-server est hors ligne
