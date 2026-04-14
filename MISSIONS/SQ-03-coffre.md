# Side Quest SQ-03 — Le Coffre du Dragon

## Type

Side Quest — moins guidée, implémentation libre.

## Règle absolue

Les items du coffre n'intègrent **jamais** l'inventaire principal. Aucune connexion à `InventoryService`.

## Brief client

> "Je veux une zone secrète accessible via une route dédiée. À chaque visite, un coffre mystérieux s'ouvre et révèle 3 objets générés aléatoirement parmi un pool prédéfini. Le joueur peut examiner chaque objet — voir son nom, son type et sa description. Un bouton 'Ouvrir un nouveau coffre' permet de relancer la génération. C'est purement de l'exploration, aucun item ne rejoint l'inventaire."

## Ce que le client ne dit pas (à toi de déduire)

- Le pool d'items possibles doit être structuré et typé — où range-t-on des données statiques dans l'architecture du projet ?
- "Généré aléatoirement" implique qu'il ne faut pas toujours les mêmes 3 items
- "Examiner chaque objet" implique un affichage cohérent avec ce qui existe déjà
- La réutilisation de `ItemCard` soulève une question : que se passe-t-il si un parent ignore les outputs d'un enfant ?

## Contraintes techniques non négociables

- **Réutiliser `ItemCard` sans le modifier**
- Aucune connexion à `InventoryService`
- Les items du pool sont typés strictement — pas d'`any`
- Le coffre génère exactement 3 items à chaque ouverture
- Les 3 items sont différents à chaque tirage (pas de doublons)

## Indices (pas des étapes)

- Un pool de 10-15 items prédéfinis suffit — où les stocker ?
- Pour tirer 3 items sans doublons parmi N : mélanger le tableau et prendre les 3 premiers
- `ItemCard` attend un `ItemModel` — ton pool doit être compatible avec ce type
- Les outputs non écoutés par le parent ne font rien — Angular ne plante pas

## Concepts à revisiter

`signals`, `@for` avec `track`, `input.required()`, `output()`, smart/dumb components, services, pipes, TypeScript strict, `crypto.randomUUID()`

## Validation attendue

- Une route `/coffre` accessible depuis le menu
- 3 items aléatoires affichés à l'ouverture
- Jamais les mêmes 3 items deux fois de suite (aléatoire réel)
- Pas de doublons dans les 3 items affichés
- Bouton "Ouvrir un nouveau coffre" fonctionnel
- `ItemCard` réutilisé sans modification
- Aucune connexion à `InventoryService`
- Items typés `ItemModel`
