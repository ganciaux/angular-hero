# Mission 017 — Content Projection avec ng-content

## Concept Angular

`ng-content` — permettre à un composant parent d'injecter du contenu dans un composant enfant.
Le composant enfant définit un emplacement, le parent décide ce qui s'y affiche.

## Objective

Créer un composant `Panel` réutilisable dont le contenu est entièrement défini par le parent,
en utilisant `ng-content`.

## Contexte

Jusqu'ici, un composant savait exactement ce qu'il affichait — soit en dur dans son template,
soit via des `input()`. Avec `ng-content`, le composant est une coquille : il définit la structure
(bordure, titre, mise en page), mais délègue le contenu au parent.

C'est ce qui permet de construire des composants vraiment génériques : modal, carte, panneau, accordéon...

## Mission

### Étape 1 — Composant Panel simple

Crée un composant `Panel` dans `shared/components/panel/` :

- Son template contient une `<div class="panel">` avec un `<ng-content>`
- Pas d'`input()`, pas de logique — juste la coquille
- Utilise ce composant dans `Hero` avec du contenu varié à l'intérieur

```html
<!-- hero.html -->
<app-panel>
  <p>Ce contenu est défini par le parent.</p>
</app-panel>
```

> Observe : le composant Panel ne sait pas ce qu'il affiche. C'est le parent qui décide.

### Étape 2 — Projection nommée (select)

Un seul `ng-content` ne suffit pas quand on veut plusieurs zones distinctes (titre + corps).
Utilise `select` pour cibler des éléments spécifiques :

- Ajoute un `<ng-content select="[panel-title]">` pour le titre
- Ajoute un `<ng-content select="[panel-body]">` pour le corps
- Dans le parent, utilise les attributs `panel-title` et `panel-body` pour cibler chaque zone

```html
<!-- panel.html -->
<div class="panel">
  <div class="panel-header">
    <ng-content select="[panel-title]"></ng-content>
  </div>
  <div class="panel-body">
    <ng-content select="[panel-body]"></ng-content>
  </div>
</div>

<!-- hero.html -->
<app-panel>
  <h3 panel-title>Mon Héros</h3>
  <p panel-body>Contenu du panneau.</p>
</app-panel>
```

> Observe : le parent contrôle ce qui va dans chaque zone.

### Étape 3 — Réutilisation dans deux contextes

Utilise `Panel` dans deux endroits différents avec un contenu différent :
- Dans `Hero` — affiche les stats du héros
- Dans `Inventory` — affiche un résumé de l'inventaire

> Observe : le même composant, deux contenus complètement différents. C'est ça la puissance de ng-content.

## Files concerned

- `src/app/shared/components/panel/panel.ts` — à créer
- `src/app/shared/components/panel/panel.html` — à créer
- `src/app/features/hero/hero.html` — utilisation du Panel
- `src/app/features/inventory/inventory.html` — utilisation du Panel

## Validation attendue

- Étape 1 : `<app-panel>` affiche le contenu injecté par le parent
- Étape 2 : titre et corps projetés dans les bonnes zones via `select`
- Étape 3 : Panel utilisé dans Hero et Inventory avec deux contenus différents, aucune modification du composant Panel
- Aucune régression sur les fonctionnalités existantes
