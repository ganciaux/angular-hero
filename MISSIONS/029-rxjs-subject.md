# Mission 029 — RxJS : Subject & BehaviorSubject

## Objectif

Comprendre la différence entre Observable, Subject et BehaviorSubject — et savoir lequel choisir selon le contexte.

## Contexte

Jusqu'ici les Observables venaient de `HttpClient` — Angular les créait pour toi. Un `Subject` est un Observable que **tu crées et contrôles toi-même** : tu peux émettre des valeurs quand tu veux.

---

## Concepts clés

### Observable vs Subject

| | Observable | Subject |
|---|---|---|
| Qui émet ? | La source (HTTP, timer...) | Toi, via `.next()` |
| Combien d'abonnés ? | Un par `subscribe()` | Plusieurs en même temps |
| Froid ou chaud ? | Froid (repart à zéro à chaque subscribe) | Chaud (partagé entre tous les abonnés) |

```typescript
import { Subject } from 'rxjs';

const events$ = new Subject<string>();

events$.subscribe(e => console.log('A:', e));
events$.subscribe(e => console.log('B:', e));

events$.next('click');  // A: click, B: click — les deux reçoivent
```

### BehaviorSubject — Subject avec mémoire

Un `Subject` normal n'émet rien aux nouveaux abonnés — ils ratent ce qui s'est passé avant.
Un `BehaviorSubject` garde la **dernière valeur émise** et la rejoue immédiatement à chaque nouvel abonné.

```typescript
import { BehaviorSubject } from 'rxjs';

const count$ = new BehaviorSubject<number>(0);  // valeur initiale obligatoire

count$.subscribe(v => console.log('A:', v));  // A: 0 (immédiatement)

count$.next(1);  // A: 1
count$.next(2);  // A: 2

count$.subscribe(v => console.log('B:', v));  // B: 2 (dernière valeur)
```

- Valeur initiale **obligatoire** dans le constructeur
- `.value` — accès synchrone à la valeur courante sans subscribe
- `.next(valeur)` — émet une nouvelle valeur

### BehaviorSubject vs signal

Les deux gardent une valeur courante et notifient les observateurs. Dans Angular moderne, les signaux sont préférés pour l'état UI. Le `BehaviorSubject` reste pertinent quand :

- tu dois partager un flux d'événements entre plusieurs services
- tu utilises des opérateurs RxJS complexes (`switchMap`, `combineLatest`...)
- tu travailles avec du code qui attend des Observables (ex: certaines libs tierces)

| | Signal | BehaviorSubject |
|---|---|---|
| Syntaxe | `signal(0)` | `new BehaviorSubject(0)` |
| Lecture | `count()` | `count$.value` ou `subscribe` |
| Écriture | `count.set(1)` | `count$.next(1)` |
| Intégration Angular | Native (templates, computed) | Via `async pipe` ou `subscribe` |
| Opérateurs RxJS | ❌ | ✅ |

### asObservable() — exposer sans permettre d'émettre

Par convention, un service expose son `BehaviorSubject` en lecture seule via `.asObservable()` :

```typescript
private _logs$ = new BehaviorSubject<string[]>([]);
readonly logs$ = this._logs$.asObservable();  // l'extérieur ne peut pas appeler .next()
```

---

## Exercice

### 1. Ajouter un flux de logs au CombatService

Dans `CombatService`, ajoute un `BehaviorSubject<string[]>` pour les logs de combat :

- Initialisé avec un tableau vide
- Exposé en lecture seule via `asObservable()`
- Une méthode `addLog(message: string)` qui ajoute un message à la liste courante

### 2. Tester dans la console

Dans n'importe quel composant existant (temporairement), injecte `CombatService` et subscribe aux logs :

```typescript
constructor() {
  this.combatService.logs$.subscribe(logs => console.log('[Combat logs]', logs));
}
```

Appelle `addLog('test')` depuis la console ou un bouton pour vérifier que les abonnés reçoivent bien les mises à jour.

---

## Validation attendue

- `BehaviorSubject<string[]>` dans `CombatService`
- `logs$` exposé via `asObservable()`
- `addLog(message)` fonctionne et les abonnés reçoivent les mises à jour
- Comprendre pourquoi `BehaviorSubject` et pas `Subject` ici (un nouvel abonné doit voir les logs existants)
