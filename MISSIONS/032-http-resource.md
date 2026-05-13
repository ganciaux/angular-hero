# Mission 032 — httpResource()

## Objectif

Remplacer le pattern manuel `signal + subscribe` par `httpResource()` pour le chargement des ennemis.

## Contexte

Dans `CombatService`, le chargement des ennemis utilise le pattern manuel :

```typescript
private _enemies = signal<EnemyModel[]>([]);
readonly enemies = this._enemies.asReadonly();

loadEnemies() {
  this.httpClient.get<EnemyModel[]>('http://localhost:3000/enemies')
    .subscribe(data => this._enemies.set(data));
}
```

Le composant appelle `loadEnemies()` dans son constructeur.

C'est verbeux : 3 lignes de signal + une méthode + un subscribe + un appel dans le constructeur.

---

## Nouveau concept — resource() et httpResource()

Angular 19+ introduit deux APIs déclaratives pour le chargement de données :

### resource()

Version générique — pour n'importe quelle source asynchrone (fetch, timer, Promise) :

```typescript
import { resource } from '@angular/core';

readonly data = resource({
  loader: () => fetch('/api/items').then(r => r.json())
});
```

### httpResource()

Wrapper spécialisé pour HttpClient — la version recommandée pour les appels HTTP Angular :

```typescript
import { httpResource } from '@angular/common/http';

readonly enemies = httpResource<EnemyModel[]>('http://localhost:3000/enemies');
```

Une seule ligne remplace signal + subscribe + méthode de chargement.

---

## Ce que retourne httpResource()

`httpResource()` retourne un objet avec plusieurs signaux intégrés :

| Signal | Type | Description |
|---|---|---|
| `.value()` | `T \| undefined` | La donnée chargée |
| `.isLoading()` | `boolean` | `true` pendant le chargement |
| `.error()` | `unknown` | L'erreur si la requête échoue |
| `.status()` | `ResourceStatus` | État complet (Idle / Loading / Resolved / Error) |
| `.reload()` | méthode | Re-déclenche la requête |

Pas de `subscribe()`, pas de gestion manuelle des signaux. Tout est automatique.

---

## URL statique vs URL réactive

```typescript
// URL fixe — chargé une fois à la création
readonly enemies = httpResource<EnemyModel[]>('http://localhost:3000/enemies');

// URL réactive — re-fetch automatique quand selectedId() change
readonly enemy = httpResource<EnemyModel>(() => `http://localhost:3000/enemies/${this.selectedId()}`);
```

Passer une **fonction** à `httpResource()` active la réactivité : chaque fois qu'un signal lu dans la fonction change, Angular re-déclenche la requête automatiquement.

---

## Exercice

### 1. Refactoriser CombatService

Remplace dans `CombatService` :
- `private _enemies` signal
- `readonly enemies` asReadonly
- `loadEnemies()` méthode
- `inject(HttpClient)` si plus utilisé ailleurs

Par une seule ligne `httpResource()`.

> `httpResource()` injecte `HttpClient` en interne — pas besoin de l'injecter manuellement si c'est son seul usage.

### 2. Mettre à jour le composant Combat

- Supprimer l'appel `loadEnemies()` du constructeur
- Adapter le template pour utiliser les signaux `.value()` et `.isLoading()`

### 3. Afficher l'état de chargement dans le template

En état Idle, gérer les trois cas :

```
@if (isLoading) → "Chargement des adversaires..."
@else if (liste vide) → "Aucun adversaire disponible"
@else → liste des ennemis
```

---

## Pattern avant / après

**Avant :**
```typescript
private _enemies = signal<EnemyModel[]>([]);
readonly enemies = this._enemies.asReadonly();
private readonly httpClient = inject(HttpClient);

loadEnemies() {
  this.httpClient.get<EnemyModel[]>('http://localhost:3000/enemies')
    .subscribe(data => this._enemies.set(data));
}
```

```typescript
// Composant
constructor() {
  this.combatService.loadEnemies();
}
```

**Après :**
```typescript
readonly enemiesResource = httpResource<EnemyModel[]>('http://localhost:3000/enemies');
```

```typescript
// Composant — constructeur vide ou supprimé
```

---

## Validation attendue

- [ ] `httpResource()` remplace le pattern manuel dans `CombatService`
- [ ] `loadEnemies()` supprimée
- [ ] Constructeur du composant nettoyé
- [ ] Template gère `isLoading()` en état Idle
- [ ] Les ennemis s'affichent toujours correctement
- [ ] Aucune régression sur le combat en cours

---

## Comparaison des patterns

| | Pattern manuel | httpResource() |
|---|---|---|
| Lignes de code | ~5 | 1 |
| États auto | ❌ à coder | ✅ isLoading, error |
| Réactivité | ❌ manuelle | ✅ avec fonction |
| Annulation | ❌ à gérer | ✅ automatique |
| CRUD complet | ✅ naturel | ⚠️ limité aux GET* |

> *`httpResource()` supporte POST/PATCH/DELETE via options, mais le pattern manuel reste plus naturel pour les mutations.

---

## Quand utiliser quoi

- **httpResource()** — lecture simple (GET), chargement à l'initialisation, re-fetch réactif
- **Pattern manuel** — mutations (POST/PATCH/DELETE), logique métier au retour, CRUD complet
