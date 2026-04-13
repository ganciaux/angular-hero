# Side Quest SQ-02 — La Taverne du Dragon Bleu

## Type

Side Quest — moins guidée, implémentation libre.

## Règle absolue

La taverne est un espace **totalement autonome**. Elle ne partage aucun état avec `InventoryService`, `HeroService` ou tout autre service existant. Aucun fichier existant ne doit être modifié.

## Brief client

> "Les aventuriers ont besoin d'un endroit pour se retrouver ! Je veux une taverne accessible depuis le menu. On y trouve une liste d'aventuriers présents ce soir-là — chacun avec son nom, sa classe et son niveau. Je dois pouvoir filtrer par classe et trier par niveau. Si je clique sur un aventurier, j'ai accès à ses stats détaillées. Les données des aventuriers peuvent être en dur dans le code pour l'instant, on connectera le backend plus tard."

## Ce que le client ne dit pas (à toi de déduire)

- "Filtrer par classe et trier par niveau" sans bouton "Rechercher" — le résultat doit se mettre à jour au fur et à mesure de la saisie/sélection
- "Stats détaillées" implique une vue secondaire — à toi de choisir comment l'afficher (panneau latéral, zone inline, etc.), du moment que c'est propre
- Les aventuriers ont un format de données cohérent et typé — c'est à toi de le définir
- "En dur dans le code" ne veut pas dire dans le composant — réfléchis à où les données statiques ont leur place

## Contraintes techniques non négociables

- Réutiliser les composants existants si pertinent, **sans les modifier**
- Aucun lien avec `HeroService` ou `InventoryService`
- Le filtre et le tri sont **réactifs** — pas de bouton submit
- Les données sont typées strictement — pas d'`any`

## Indices (pas des étapes)

- Un signal qui contient une valeur de filtre + un `computed()` qui filtre la liste... ça ressemble à quoi ?
- Pour le champ de filtre texte, tu as déjà utilisé un mécanisme de binding deux sens dans ce projet
- "Données statiques typées" — où est-ce qu'on range les modèles dans l'architecture du projet ?
- La liste filtrée et triée peut être un seul `computed()` ou deux — à toi de juger ce qui est plus lisible

## Concepts à revisiter

`signals`, `computed`, `@for` avec `track`, `@if`, `@empty`, `input.required()`, `output()`, smart/dumb components, services, `inject()`, pipes (formatage du niveau ou de la classe), template-driven forms (`ngModel`), TypeScript strict (interfaces, types)

## Validation attendue

- Une route `/taverne` accessible depuis le menu
- Liste des aventuriers affichée avec nom, classe et niveau
- Filtre par classe fonctionnel et réactif (select ou input)
- Tri par niveau fonctionnel et réactif (ascendant / descendant)
- Clic sur un aventurier affiche ses stats détaillées
- Message explicite si aucun aventurier ne correspond au filtre (`@empty` ou `@if`)
- Aucun fichier existant modifié
- Données typées, aucun `any`
