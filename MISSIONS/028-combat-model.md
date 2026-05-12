# Mission 028 — Modèle de combat & Machine à états

## Objectif

Modéliser le système de combat : ennemi, état de la session de combat, et machine à états. Pas encore d'UI — juste les fondations.

## Contexte

Un système de combat au tour par tour a des états bien définis : on est soit en attente, soit en combat, soit terminé. Modéliser ces états explicitement évite les bugs de type "le joueur peut attaquer alors que le combat est fini" — c'est la **machine à états**.

---

## Concepts clés

### Machine à états — enum + signal

Une machine à états définit les états possibles d'un système et les transitions autorisées entre eux.

En Angular, un `enum` TypeScript + un `signal` est le pattern le plus simple :

```typescript
export enum CombatState {
  Idle = 'idle',           // pas de combat en cours
  Fighting = 'fighting',   // combat en cours
  Victory = 'victory',     // héros a gagné
  Defeat = 'defeat',       // héros a perdu
}
```

```typescript
private _state = signal<CombatState>(CombatState.Idle);
readonly state = this._state.asReadonly();
```

Dans le template :
```html
@if (combatService.state() === CombatState.Fighting) {
  <!-- actions de combat -->
}
```

### Pourquoi enum et pas string ?

```typescript
// ❌ string — erreur silencieuse, pas d'autocomplétion
private _state = signal<string>('idle');
if (state === 'figting') { ... } // faute de frappe → bug invisible

// ✅ enum — TypeScript détecte les erreurs à la compilation
if (state === CombatState.Figting) { ... } // ❌ erreur TypeScript immédiate
```

---

## Modèle ennemi

Les données `enemies` existent déjà dans `db.json`. Il faut créer le modèle TypeScript correspondant.

Chaque ennemi a : `id`, `name`, `level`, `hp`, `attack`, `defense`, `xpReward`, `goldReward`.

---

## Modèle de session de combat

La session de combat est l'état **en cours** d'un combat — elle n'est pas persistée, elle vit uniquement en mémoire le temps du combat.

```typescript
export interface CombatSessionModel {
  hero: HeroModel;
  enemy: EnemyModel;
  turn: number;
}
```

- `hero` — copie des stats du héros pour ce combat (le héros principal n'est pas modifié)
- `enemy` — l'ennemi affronté avec ses HP courants
- `turn` — numéro du tour actuel
- Les logs de combat sont gérés séparément via un `BehaviorSubject` dans le service (mission 029)

---

## Exercice

### 1. Créer l'enum CombatState

Dans `src/app/features/combat/combat-state.enum.ts` :
- `Idle`, `Fighting`, `Victory`, `Defeat`

### 2. Créer EnemyModel

Dans `src/app/features/combat/enemy.model.ts` — correspond aux données `enemies` de `db.json`.

### 3. Créer CombatSessionModel

Dans `src/app/features/combat/combat-session.model.ts` — session en mémoire uniquement.

### 4. Créer CombatService (squelette)

Dans `src/app/features/combat/combat.service.ts` :

- Signal `_state` typé `CombatState`, initialisé à `Idle`
- Signal `_session` typé `CombatSessionModel | null`, initialisé à `null`
- Exposer les deux en lecture seule
- Méthode `startCombat(enemy: EnemyModel)` — passe à `Fighting`, initialise la session (sans logs)
- Méthode `reset()` — repasse à `Idle`, session à `null`

Pas encore d'attaque ni de logique de tour — juste la structure.

---

## Validation attendue

- `CombatState` enum avec 4 valeurs
- `EnemyModel` interface avec tous les champs de `db.json`
- `CombatSessionModel` interface avec `hero`, `enemy`, `turn`, `logs`
- `CombatService` avec les deux signaux et les deux méthodes
- Aucune UI — juste les modèles et le service squelette
