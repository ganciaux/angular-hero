# Mission 031 — UI de combat

## Objectif

Construire l'interface de combat : sélection de l'ennemi, écran de combat au tour par tour, et écran de résultat.

## Contexte

Le service est prêt. Il reste à brancher l'UI sur les signaux et les Observables du `CombatService`, et à récupérer les ennemis depuis le backend.

---

## Nouveau concept — toSignal()

`logs$` est un `Observable` — les templates Angular ne consomment pas directement les Observables (sans `async pipe`). La solution moderne en Angular 17+ : **`toSignal()`** qui convertit un Observable en signal.

```typescript
import { toSignal } from '@angular/core/rxjs-interop';

readonly logs = toSignal(this.combatService.logs$, { initialValue: [] as string[] });
```

- `toSignal()` subscribe automatiquement et se désabonne à la destruction du composant
- `initialValue` — valeur émise avant le premier événement Observable
- Dans le template : `logs()` comme n'importe quel signal

### toSignal() vs async pipe

| | `async pipe` | `toSignal()` |
|---|---|---|
| Syntaxe template | `logs$ \| async` | `logs()` |
| Cohérence | Mélange signal/Observable | Tout signal |
| Null safety | retourne `null` avant la 1ère valeur | `initialValue` requis |
| Angular moderne | ✅ | ✅ préféré |

---

## Charger les ennemis

Ajoute dans `CombatService` :
- Un signal `_enemies` avec la liste des ennemis
- Une méthode `loadEnemies()` qui fetch `http://localhost:3000/enemies`
- Exposé en lecture seule

Le composant `Combat` appelle `loadEnemies()` dans le constructeur.

---

## Structure de l'UI

L'UI a trois états pilotés par `combatService.state()` :

### État Idle — choisir un ennemi

```
[Titre] Choisir un adversaire

[Goblin — Niveau 1]  [Attaquer]
[Wolf — Niveau 2]    [Attaquer]
```

Cliquer sur "Attaquer" appelle `combatService.startCombat(enemy)`.

### État Fighting — combat en cours

```
[Héros]                    [Ennemi]
HP: 100/100                HP: 30/30
ATK: 10 | DEF: 5           ATK: 5 | DEF: 1

        [Attaquer]

--- Journal de combat ---
Héros attaque Goblin pour 9 dégâts
Goblin riposte pour 1 dégât
```

- Bouton "Attaquer" appelle `combatService.heroAttacks()`
- Les logs s'affichent dans l'ordre chronologique
- Les HP se mettent à jour automatiquement via les signaux

### État Victory / Defeat

```
[Victoire ! / Défaite...]

[Nouveau combat]
```

Bouton "Nouveau combat" appelle `combatService.reset()`.

---

## Exercice

### 1. Charger les ennemis

Dans `CombatService` : signal `_enemies`, méthode `loadEnemies()`.
Dans `Combat` : appel dans le constructeur.

### 2. Template — état Idle

`@if` sur `CombatState.Idle` → liste des ennemis avec un bouton par ennemi.

### 3. Template — état Fighting

`@if` sur `CombatState.Fighting` → stats héros + ennemi, bouton attaque, journal.
Utilise `toSignal()` pour les logs.

### 4. Template — états Victory / Defeat

`@if` sur `CombatState.Victory` et `CombatState.Defeat` → message + bouton reset.

---

## Validation attendue

- [ ] Liste des ennemis affichée en état Idle
- [ ] `startCombat()` déclenché au clic
- [ ] HP héros et ennemi mis à jour à chaque tour
- [ ] Journal de combat affiché avec `toSignal()`
- [ ] Victoire/Défaite correctement affichés
- [ ] `reset()` ramène à l'état Idle avec la liste des ennemis
- [ ] Route `/combats` accessible depuis la navigation
