# Mission 030 — Logique de combat

## Objectif

Implémenter le système de combat au tour par tour dans `CombatService` : attaque du héros, riposte de l'ennemi, gestion de la victoire et de la défaite.

## Contexte

Le service a déjà la structure (états, session, logs). Il faut maintenant implémenter la logique métier : calcul des dégâts, alternance des tours, et transitions d'état (Fighting → Victory / Defeat).

---

## Concepts clés

### Calcul des dégâts

Formule simple : les dégâts infligés = attaque de l'attaquant - défense du défenseur, avec un minimum de 1.

```typescript
const damage = Math.max(1, attacker.attack - defender.defense);
```

`Math.max(1, ...)` garantit qu'une attaque inflige toujours au moins 1 dégât.

### Immutabilité des signaux

Pour modifier les HP de l'ennemi dans la session, il faut créer un nouvel objet — jamais muter directement :

```typescript
// ❌ mutation directe — le signal ne détecte pas le changement
this._session().enemy.hp -= damage;

// ✅ nouvel objet via update
this._session.update(session => ({
  ...session!,
  enemy: { ...session!.enemy, hp: session!.enemy.hp - damage }
}));
```

### Non-null assertion `!`

Dans un `update`, TypeScript sait que `session` est `CombatSessionModel | null`. Si tu es certain que la session existe (ex: on ne peut attaquer que si `state === Fighting`), le `!` indique à TypeScript de faire confiance :

```typescript
this._session.update(session => ({ ...session!, ... }));
```

---

## Exercice

### 1. Méthode `heroAttacks()`

- Calcule les dégâts infligés à l'ennemi
- Met à jour les HP de l'ennemi dans la session
- Ajoute un log : `"Héros attaque [nom ennemi] pour [X] dégâts"`
- Si les HP de l'ennemi tombent à 0 ou moins → appelle `onVictory()`
- Sinon → appelle `enemyAttacks()`

### 2. Méthode privée `enemyAttacks()`

- Calcule les dégâts infligés au héros
- Met à jour les HP du héros dans la session
- Ajoute un log : `"[nom ennemi] riposte pour [X] dégâts"`
- Incrémente le numéro de tour
- Si les HP du héros tombent à 0 ou moins → appelle `onDefeat()`

### 3. Méthodes privées `onVictory()` et `onDefeat()`

- Passent l'état à `CombatState.Victory` ou `CombatState.Defeat`
- Ajoutent un log de fin ("Victoire !" / "Défaite...")

### 4. Réinitialiser les logs au `startCombat()`

Quand un nouveau combat commence, vider les logs du combat précédent :

```typescript
this._logs$.next([]);
```

---

## Validation attendue

- `heroAttacks()` publique — appelable depuis le composant
- `enemyAttacks()` privée — déclenchée automatiquement après l'attaque du héros
- Les HP ne descendent jamais en dessous de 0
- Les transitions Victory/Defeat correctement déclenchées
- Les logs reflètent chaque action dans l'ordre
- `startCombat()` remet les logs à zéro
