# Mission 021 — Route Guards

## Objectif

Protéger des routes avec des guards fonctionnels Angular.

## Contexte

Certaines routes ne doivent pas être accessibles à tout le monde ou dans toutes les situations. Un guard est une fonction qui s'exécute avant qu'Angular charge la route — il peut autoriser, rediriger, ou bloquer la navigation.

## Concepts clés

### Guard fonctionnel (Angular 14+)

Un guard est simplement une **fonction** qui retourne `true` (accès autorisé), `false` (accès bloqué), ou un `UrlTree` (redirection).

```typescript
// core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = false; // condition à vérifier

  if (isLoggedIn) return true;
  return router.createUrlTree(['/']);  // redirige vers home
};
```

### Appliquer un guard à une route

```typescript
{
  path: 'hero',
  canActivate: [authGuard],
  loadComponent: () => import('./features/hero/hero').then(m => m.Hero),
}
```

### Types de guards

| Guard | Rôle |
|---|---|
| `canActivate` | Accès à une route |
| `canActivateChild` | Accès aux child routes |
| `canDeactivate` | Quitter une route (ex: formulaire non sauvegardé) |
| `canMatch` | Choisir quelle route matcher |

Pour cette mission : **`canActivate`** uniquement.

### inject() dans un guard

Les guards fonctionnels ont accès à l'injection de dépendances via `inject()` — exactement comme dans un composant ou un service.

```typescript
export const heroGuard: CanActivateFn = () => {
  const heroService = inject(HeroService);
  const router = inject(Router);

  if (heroService.hero().level >= 5) return true;
  return router.createUrlTree(['/']);
};
```

## Exercice

Tu vas protéger la route `/hero` avec un guard basé sur un niveau minimum.

### 1. Créer le guard

Crée `src/app/core/guards/hero-level.guard.ts`.

Le guard vérifie que le héros est au niveau 5 minimum.
- Si niveau >= 5 → accès autorisé (`return true`)
- Si niveau < 5 → redirection vers `/` avec un message dans la console

### 2. Appliquer le guard

Applique `canActivate: [heroLevelGuard]` sur la route `/hero` dans `app.routes.ts`.

### 3. Tester

- Modifie temporairement le niveau initial du héros dans `HeroService` pour tester les deux cas
- Vérifie la redirection quand le niveau est insuffisant
- Vérifie l'accès quand le niveau est suffisant
- Remets le niveau initial à sa valeur d'origine après les tests

### 4. Amélioration — afficher un message

Au lieu d'une simple redirection silencieuse, fais en sorte que le guard stocke un message d'erreur quelque part pour que la page d'accueil puisse l'afficher.

Indice : un signal dans un service dédié (`NavigationService` ou directement dans `HeroService`) peut servir à transmettre ce message.

## Validation attendue

- Un guard fonctionnel dans `core/guards/`
- La route `/hero` est protégée par `canActivate`
- Niveau insuffisant → redirection vers `/`
- Niveau suffisant → accès normal
- `inject()` utilisé dans le guard (pas de classe)
