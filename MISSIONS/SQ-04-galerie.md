# Side Quest SQ-04 — La Galerie des Légendes

## Type

Side Quest — moins guidée, implémentation libre.

## Règle absolue

Les légendes sont des données **statiques indépendantes**. Aucun lien avec `HeroService`, `InventoryService`, ou tout autre service existant.

## Brief client

> "Le jeu a besoin d'un hall of fame pour motiver les joueurs. Je veux une galerie accessible depuis le menu où s'affichent les grands héros de légende — chacun avec sa classe, son niveau légendaire et son histoire. Quand on clique sur une carte, un panneau de détail s'ouvre avec ses stats complètes et une citation. Ce panneau doit être suffisamment générique pour qu'on puisse le réutiliser ailleurs dans le jeu plus tard."

## Ce que le client ne dit pas (à toi de déduire)

- "Suffisamment générique" signifie que le **contenu du panneau ne doit pas être codé en dur dedans** — c'est au parent de décider ce qu'il affiche
- "Stats complètes" implique que la carte liste affiche moins d'infos que le panneau de détail
- Les données des légendes peuvent vivre dans un fichier statique — pas besoin de json-server
- "Accessible depuis le menu" implique une route dédiée et un lien dans la navbar

## Contraintes techniques non négociables

- Le composant panneau/modal de détail **doit utiliser `ng-content`** pour son contenu
- **`ViewChild` doit intervenir quelque part** dans la logique (ouverture du panneau, focus, etc.)
- Aucun lien avec `HeroService`
- Les données des légendes sont **typées strictement** — pas d'`any`
- Réutiliser `Panel` et/ou `Modal` si pertinent, sans les modifier

## Indices (pas des étapes)

- Un modèle `LegendModel` avec : `id`, `name`, `class`, `level`, `story`, `quote`, et des stats (force, défense, magie ou autre)
- Les données statiques peuvent vivre dans un fichier `legends.data.ts` — où le placer dans l'architecture ?
- Pour ouvrir le panneau de détail depuis la liste : qui appelle `open()` ? Depuis le template ou depuis le TypeScript ?
- `@ViewChild(Modal)` ou `@ViewChild('ref')` — lequel utiliser ici et pourquoi ?
- La galerie peut être un smart component qui passe la légende sélectionnée à un dumb component de détail

## Concepts à revisiter

`ng-content`, `ViewChild`, template references (`#ref`), `signals`, `computed` (filtre optionnel), `@for` avec `track`, `@if`, `input.required()`, `output()`, smart/dumb components, services (optionnel), pipes (optionnel)

## Validation attendue

- Une route `/galerie` accessible depuis le menu
- Liste des légendes affichée (au moins 5 légendes)
- Chaque carte affiche : nom, classe, niveau
- Clic sur une carte → panneau/modal de détail s'ouvre avec stats complètes + citation
- Le composant de détail utilise `ng-content` pour son contenu
- `ViewChild` intervient quelque part dans la logique
- Aucun lien avec `HeroService`
- Données typées `LegendModel`
- Route dans la navbar
