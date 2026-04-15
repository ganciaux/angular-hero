# Mission 015 — Template References

## Concept Angular

Template references (`#ref`) — accéder directement à un élément DOM ou à une instance de composant depuis le template.

## Objective

Comprendre comment cibler un élément ou un composant dans le template avec `#ref`, et l'utiliser dans d'autres parties du template sans passer par le composant TypeScript.

## Contexte

Jusqu'ici, toute interaction entre éléments du template passait par le composant TypeScript (signal, méthode, event binding). Les template references permettent de créer des liens directs **dans le template**, sans impliquer le TypeScript pour des cas simples.

## Mission

### Étape 1 — Référence sur un élément DOM natif

Dans le template du composant `Hero` (ou tout autre existant) :

- Ajoute un champ `<input>` avec une référence `#heroInput`
- Ajoute un bouton qui appelle une méthode en lui passant `heroInput.value` directement depuis le template
- La méthode reçoit la valeur et l'affiche dans la console
- **Aucun `[(ngModel)]` ni `FormsModule` n'est nécessaire ici**

> Observe : tu accèdes à la valeur de l'input sans passer par un signal ou une propriété du composant.

### Étape 2 — Référence sur un composant enfant

- Ajoute une référence `#statBar` sur une instance de `<app-stat-bar>` dans le template parent
- Depuis un bouton dans le template parent, appelle directement une méthode publique de `StatBar` via `statBar.maMethode()`
- Ajoute une méthode publique simple dans `StatBar` (ex: `flash()` qui log "flash!" dans la console)

> Observe : tu accèdes à l'instance du composant enfant et tu appelles ses méthodes directement depuis le template.

### Étape 3 — Référence avec `@if`

- Dans un template avec un `@if`, place une référence sur l'élément conditionnel
- Essaie d'utiliser cette référence en dehors du bloc `@if`
- Observe ce qui se passe (erreur ou comportement inattendu ?)

> Comprendre la portée (scope) d'une template reference.

## Files concerned

- `src/app/features/hero/hero.html` — ajout input + référence DOM
- `src/app/shared/components/stat-bar/stat-bar.ts` — ajout méthode publique `flash()`
- `src/app/features/hero/hero.html` — référence sur `<app-stat-bar>`

## Validation attendue

- Étape 1 : clic sur le bouton → valeur de l'input logguée sans `ngModel`
- Étape 2 : clic sur le bouton → `flash()` de `StatBar` appelée directement depuis le template
- Étape 3 : comportement de portée compris et noté dans `LEARNINGS.md`
- Aucune nouvelle feature ajoutée au projet — c'est un exercice de compréhension
