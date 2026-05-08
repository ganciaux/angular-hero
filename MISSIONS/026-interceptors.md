# Mission 026 — Intercepteurs HTTP

## Objectif

Créer un intercepteur fonctionnel qui logue chaque requête HTTP sortante dans la console.

## Contexte

Un intercepteur se place entre Angular et le réseau — il voit toutes les requêtes avant qu'elles partent et toutes les réponses avant qu'elles arrivent. C'est l'endroit idéal pour des comportements transversaux : logging, ajout de headers (token auth), gestion globale des erreurs.

## Concepts clés

### Intercepteur fonctionnel

```typescript
// core/interceptors/logger.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  return next(req);
};
```

- `req` — la requête sortante (`HttpRequest`)
- `next` — passe la requête au maillon suivant (réseau ou intercepteur suivant)
- **Toujours retourner `next(req)`** — sinon la requête ne part jamais

### Enregistrer l'intercepteur

```typescript
// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loggerInterceptor])),
  ]
};
```

### Intercepter la réponse

`next(req)` retourne un `Observable<HttpEvent>` — on peut le manipuler avec des opérateurs RxJS :

```typescript
import { tap } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[HTTP] → ${req.method} ${req.url}`);
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        console.log(`[HTTP] ← ${event.status} ${req.url}`);
      }
    })
  );
};
```

- `tap()` — opérateur RxJS qui exécute un effet de bord sans modifier la valeur
- `HttpResponse` — événement émis quand la réponse arrive (statut, body...)
- `instanceof HttpResponse` — nécessaire car `next()` émet plusieurs types d'événements

### Ce que font les intercepteurs vs les services

| | Intercepteur | Service |
|---|---|---|
| Portée | Toutes les requêtes HTTP | Une feature |
| Accès aux données | `req`, `res` HTTP bruts | Signals, modèles métier |
| Cas d'usage | Logging, auth headers, retry global | Loading local, erreurs métier |

## Exercice

### 1. Créer le logger interceptor

Crée `src/app/core/interceptors/logger.interceptor.ts`.

L'intercepteur doit logger dans la console :
- Avant la requête : méthode + URL
- Après la réponse : statut HTTP + URL

### 2. Enregistrer l'intercepteur

Dans `app.config.ts`, ajoute `withInterceptors([loggerInterceptor])` à `provideHttpClient()`.

### 3. Vérifier

Navigue vers `/inventory` — la console doit afficher :
```
[HTTP] → GET http://localhost:3000/inventory
[HTTP] ← 200 http://localhost:3000/inventory
```

Ajoute un item — tu dois voir le POST logué.

## Validation attendue

- `logger.interceptor.ts` dans `core/interceptors/`
- Requête ET réponse loguées dans la console
- `withInterceptors([loggerInterceptor])` dans `app.config.ts`
- Tous les appels HTTP (GET, POST, DELETE, PATCH) apparaissent dans la console
