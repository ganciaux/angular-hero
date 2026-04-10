# Side Quest SQ-01 — Le Journal du Héros

## Type

Side Quest — moins guidée, implémentation libre.

## Règle absolue

Cette page est en **lecture seule** sur le reste du projet. Elle n'écrit rien dans `HeroService`.

## Brief client

> "Je veux pouvoir consulter ce que mon héros a accompli depuis le début de sa session. Chaque fois qu'il gagne de l'XP, perd des HP ou passe un niveau, je veux que ça soit noté quelque part et que je puisse consulter cet historique via le menu. Rien de compliqué — un journal lisible, trié du plus récent au plus ancien, avec l'heure de chaque événement. Et si je recharge la page, c'est normal que ça repart à zéro."

## Ce que le client ne dit pas (à toi de déduire)

- Quelque chose doit **écouter** les actions du héros et les enregistrer
- Ce quelque chose doit être accessible depuis les composants qui déclenchent les actions
- La page de consultation doit être proprement intégrée à la navigation existante

## Contraintes techniques non négociables

- **Aucun fichier existant ne doit être modifié pour stocker les données du journal**
- Le journal ne doit pas influencer les stats du héros
- Les entrées sont triées du plus récent au plus ancien
- Chaque entrée affiche l'heure de l'événement

## Indices (pas des étapes)

- Comment faire "écouter" un service sans modifier les fichiers qui déclenchent les actions ?
- Angular a un mécanisme réactif qui s'exécute automatiquement quand un signal change...
- Pour détecter **ce qui a changé**, il faut comparer l'état précédent avec l'état actuel
- `new Date().toLocaleTimeString()` pour l'heure

## Concepts à revisiter

`effect()`, signals, computed, services, inject(), asReadonly(), @for, @if, input.required(), routing, décomposition smart/dumb

## Validation attendue

- Une route `/journal` accessible depuis le menu
- Le journal affiche les événements : gain XP, perte HP, soin, passage de niveau
- Trié du plus récent au plus ancien
- Chaque entrée a une heure
- Page vide si aucune action effectuée (message explicite)
- Aucun fichier existant modifié pour stocker les données
- `JournalService` ne modifie jamais `HeroService`
