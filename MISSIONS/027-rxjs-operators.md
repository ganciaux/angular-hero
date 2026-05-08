# Mission 027 — RxJS : pipe, map, catchError, of

## Objectif

Comprendre comment transformer et gérer les erreurs d'un Observable sans faire de `subscribe()` — indispensable pour les guards asynchrones.

## Contexte

Jusqu'ici tu as utilisé les Observables d'une seule façon : `observable.subscribe(data => ...)`.
Mais un Observable peut être **transformé avant d'être consommé** grâce à des opérateurs RxJS.
C'est ce qu'on appelle composer un **pipeline**.

---

## Concepts clés

### pipe() — enchaîner des opérateurs

`pipe()` s'appelle sur un Observable et applique des opérateurs dans l'ordre :

```typescript
observable.pipe(
  operateur1(),
  operateur2(),
  operateur3()
)
```

Le résultat est un nouvel Observable transformé. Rien ne s'exécute tant qu'on ne subscribe pas.

---

### map() — transformer la valeur émise

Comme `Array.map()`, mais pour un flux. Transforme chaque valeur émise sans modifier les erreurs.

```typescript
import { map } from 'rxjs';

this.http.get<DonjonModel>('/donjons/1').pipe(
  map(donjon => donjon.name)  // Observable<DonjonModel> → Observable<string>
)
```

Dans un guard :

```typescript
this.http.get<DonjonModel>(`/donjons/${id}`).pipe(
  map(donjon => {
    if (heroService.hero().level >= donjon.minLevel) return true;
    return router.createUrlTree(['/donjons']);
  })
)
// Observable<DonjonModel> → Observable<boolean | UrlTree>
```

---

### catchError() — intercepter une erreur

Si l'Observable émet une erreur (ex: 404), `map()` est ignoré. `catchError()` intercepte l'erreur et **doit retourner un nouvel Observable** de remplacement.

```typescript
import { catchError } from 'rxjs';

observable.pipe(
  map(value => transform(value)),
  catchError(err => {
    // doit retourner un Observable
  })
)
```

---

### of() — créer un Observable depuis une valeur

`of(valeur)` crée un Observable qui émet immédiatement une valeur puis se complète.
Utile dans `catchError()` pour fournir une valeur de fallback :

```typescript
import { of } from 'rxjs';

of(true)   // Observable<boolean> qui émet true
of([])     // Observable<never[]> qui émet un tableau vide
```

---

## Pattern complet — guard asynchrone

```typescript
import { map, catchError } from 'rxjs';
import { of } from 'rxjs';

export const donjonLevelGuard: CanActivateFn = (route) => {
  const heroService = inject(HeroService);
  const http = inject(HttpClient);
  const router = inject(Router);
  const id = route.params['id'];

  return http.get<DonjonModel>(`http://localhost:3000/donjons/${id}`).pipe(
    map(donjon => {
      if (heroService.hero().level >= donjon.minLevel) return true;
      return router.createUrlTree(['/donjons']);
    }),
    catchError(() => of(router.createUrlTree(['/donjons'])))
  );
};
```

Lecture du pipeline :
1. `http.get()` — déclare l'Observable, n'envoie rien encore
2. `.pipe()` — compose les opérateurs sans déclencher quoi que ce soit
3. `map()` — sera appelé avec le donjon quand Angular subscribera
4. `catchError()` — sera appelé à la place de `map()` si la requête échoue (404...)
5. Angular subscribe au retour du guard → la requête part → `map()` ou `catchError()` s'exécute → Angular lit le `boolean | UrlTree`

---

## À retenir

| | Array | Observable |
|---|---|---|
| Transformer | `.map()` | `.pipe(map())` |
| Valeur immédiate | `value` | `of(value)` |
| Erreur | `try/catch` | `catchError()` |

- `map()` ne gère pas les erreurs — il est ignoré si l'Observable est en erreur
- `catchError()` doit toujours retourner un Observable (`of()`, `throwError()`, etc.)
- `pipe()` ne déclenche rien — il compose. Le `subscribe()` (ou Angular) déclenche.
