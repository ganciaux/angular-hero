# Mission 024 — HTTP Mutations (POST, DELETE, PATCH)

## Objectif

Persister les modifications de l'inventaire dans json-server : ajout, suppression, et mise à jour d'un item.

## Contexte

Actuellement, `addItem`, `removeItem` et `toggleEquip` ne mettent à jour que le signal local — les changements disparaissent au rechargement. Il faut maintenant envoyer chaque modification au backend.

## Concepts clés

### POST — créer une ressource

```typescript
this.http.post<ItemModel>('http://localhost:3000/inventory', newItem).subscribe(created => {
  this._items.update(items => [...items, created]);
});
```

- Le corps de la requête est passé en 2e argument
- json-server retourne l'item créé (avec l'`id` généré) — on utilise cet objet, pas l'original
- On met à jour le signal **après** la réponse serveur (mise à jour pessimiste)

### DELETE — supprimer une ressource

```typescript
this.http.delete(`http://localhost:3000/inventory/${id}`).subscribe(() => {
  this._items.update(items => items.filter(item => item.id !== id));
});
```

- L'URL contient l'`id` de la ressource à supprimer
- `delete()` ne retourne pas de body utile — le callback est vide `() => {}`
- On met à jour le signal après confirmation du serveur

### PATCH — mise à jour partielle

```typescript
this.http.patch<ItemModel>(`http://localhost:3000/inventory/${id}`, { equipped: true })
  .subscribe(updated => {
    this._items.update(items => items.map(item => item.id === id ? updated : item));
  });
```

- `patch()` envoie uniquement les champs à modifier (≠ `put()` qui remplace tout)
- json-server retourne l'item complet mis à jour — on remplace l'entrée dans le signal

### Mise à jour pessimiste vs optimiste

| | Pessimiste | Optimiste |
|---|---|---|
| Quand | Après réponse serveur | Avant réponse (rollback si erreur) |
| UX | Légère latence | Réactif immédiat |
| Complexité | Simple | Plus complexe |

On utilise la mise à jour **pessimiste** ici — on attend la réponse avant de modifier le signal.

## Exercice

### 1. Modifier `addItem`

Remplace la mise à jour locale par un POST vers `/inventory`.

L'item à envoyer ne doit **pas** contenir d'`id` — json-server génère l'id côté serveur.
Utilise l'item retourné par le serveur pour mettre à jour le signal (il contient le vrai `id`).

### 2. Modifier `removeItem`

Remplace la mise à jour locale par un DELETE vers `/inventory/:id`.

Met à jour le signal seulement après confirmation du serveur.

### 3. Modifier `toggleEquip`

Remplace la mise à jour locale par un PATCH vers `/inventory/:id`.

Pour connaître la nouvelle valeur de `equipped` :
- Trouve l'item courant dans le signal
- Calcule `!item.equipped`
- Envoie `{ equipped: newValue }` au serveur
- Met à jour le signal avec l'item retourné

### 4. Adapter le formulaire d'ajout

`AddItemForm` génère actuellement un `id` avec `crypto.randomUUID()`. Puisque c'est maintenant json-server qui génère l'id, il faut retirer l'`id` du modèle émis par le formulaire.

Deux options :
- Émettre un objet `Omit<ItemModel, 'id'>` depuis le formulaire
- Ou garder l'`id` et laisser json-server l'écraser (moins propre)

Choisis l'option `Omit<ItemModel, 'id'>` — c'est le bon signal TypeScript : "cet objet n'a pas encore d'id".

### 5. Vérifier

- Ajoute un item → il apparaît dans `db.json` après rechargement de la page
- Supprime un item → il disparaît de `db.json`
- Équipe/déséquipe → `equipped` change dans `db.json`

## Validation attendue

- `addItem` fait un POST et utilise l'item retourné par le serveur
- `removeItem` fait un DELETE et attend la confirmation
- `toggleEquip` fait un PATCH avec la nouvelle valeur de `equipped`
- Aucun `crypto.randomUUID()` dans le flux d'ajout
- Les changements survivent à un rechargement de la page
