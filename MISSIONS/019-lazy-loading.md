# Mission 019 — Lazy Loading

## Objectif

Comprendre et maîtriser le lazy loading de composants avec `loadComponent` dans Angular.

## Contexte

Tu utilises déjà `loadComponent` dans `app.routes.ts` — mais sais-tu exactement ce que ça fait, quand le bundle est chargé, et pourquoi c'est important ?

Cette mission formalise ce que tu as déjà en place et t'amène à observer et comprendre le comportement réel dans le navigateur.

## Concepts clés

### Eager vs Lazy loading

| | Eager | Lazy |
|---|---|---|
| Chargement | Au démarrage de l'app | Au premier accès à la route |
| Bundle | Tout dans `main.js` | Chunk séparé par composant/route |
| Temps de démarrage | Plus lent (tout chargé) | Plus rapide (minimum vital) |
| Cas d'usage | Shell, layout, composants critiques | Pages secondaires, features isolées |

### loadComponent — lazy loading d'un composant standalone

```typescript
{
  path: 'hero',
  loadComponent: () => import('./features/hero/hero').then(m => m.Hero)
}
```

- `import()` est une **dynamic import** — le navigateur ne charge ce fichier que si la route est visitée
- Angular crée un chunk JS séparé pour chaque `loadComponent`
- Le `.then(m => m.Hero)` extrait la classe exportée du module chargé

### Quand le chunk est-il chargé ?

Au **premier** accès à la route — pas au démarrage. Les accès suivants utilisent le cache du navigateur.

## Exercices

### 1. Observer les chunks dans le navigateur

Lance l'app (`ng serve`), ouvre les DevTools (onglet Network, filtre JS).

- Recharge la page sur `/`
- Note les fichiers JS chargés
- Navigue vers `/hero` — observe le nouveau chunk qui apparaît
- Navigue vers `/inventory` — observe un autre chunk

**Question :** combien de chunks vois-tu apparaître au fur et à mesure de la navigation ?

### 2. Comparer avec un import eager

Dans `app.routes.ts`, remplace temporairement une route lazy par un import statique :

```typescript
// Avant (lazy)
{
  path: 'about',
  loadComponent: () => import('./features/about/about').then(m => m.About)
}

// Après (eager)
import { About } from './features/about/about';

{
  path: 'about',
  component: About
}
```

Recharge et observe la différence dans le Network. Puis **rétablis le lazy loading**.

### 3. Ajouter un preload strategy (observation uniquement)

Angular peut précharger les chunks lazy en arrière-plan après le chargement initial.
Ajoute `PreloadAllModules` dans la config du router :

```typescript
// app.config.ts
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

provideRouter(routes, withPreloading(PreloadAllModules))
```

Recharge et observe : les chunks sont-ils chargés immédiatement ? Avant ou après le premier rendu ?

**Retire `withPreloading` après observation** — ce n'est pas toujours souhaitable.

### 4. loadChildren — lazy loading d'un groupe de routes (lecture)

`loadComponent` charge un composant seul.
`loadChildren` charge un fichier de routes entier — utile quand une feature a ses propres sous-routes.

```typescript
{
  path: 'inventory',
  loadChildren: () => import('./features/inventory/inventory.routes').then(m => m.INVENTORY_ROUTES)
}
```

Pour l'instant, **pas d'exercice pratique** — on reviendra dessus avec les child routes (mission 020).

## Validation attendue

- Tu peux expliquer la différence entre eager et lazy loading
- Tu as observé les chunks dans le DevTools Network
- Tu as testé la différence entre `component:` et `loadComponent:`
- Tu as observé le comportement de `PreloadAllModules`
- `app.routes.ts` est revenu à son état lazy loading sur toutes les routes
