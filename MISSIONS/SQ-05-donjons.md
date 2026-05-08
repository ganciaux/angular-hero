# Side Quest 05 — Les Donjons Oubliés

## Brief client

> "Le jeu manque d'aventures ! Je veux une section 'Donjons' avec une liste de donjons disponibles, chacun avec son nom, sa difficulté et son niveau minimum requis. Si le héros n'a pas le niveau suffisant, l'accès au détail est refusé avec un message clair et un lien de retour. Si le héros a le niveau, la page de détail s'affiche avec la description complète du donjon, ses récompenses et ses dangers. Les données des donjons viennent du backend (json-server, endpoint dédié)."

**Règle absolue** : le guard peut consulter le niveau du héros, il ne le modifie jamais.

---

## Ce que le client ne dit pas

- "Niveau minimum requis" implique une vérification avant d'accéder à la route de détail
- Le guard doit connaître le `minLevel` du donjon — cette info vient du serveur, pas du state local
- Les données de détail ne doivent pas être re-fetchées si elles sont déjà disponibles (pense resolver)
- La liste et le détail sont deux vues distinctes

---

## Contraintes techniques

- Lazy loading obligatoire sur la feature donjons
- Le guard lit `HeroService` en lecture seule uniquement
- Les donjons ont leur propre endpoint `/donjons` dans `db.json`
- Child routes pour liste / détail

---

## Données — db.json

Ajoute un endpoint `donjons` dans `server/db.json` :

```json
"donjons": [
  {
    "id": "1",
    "name": "Grotte des Ombres",
    "difficulty": "easy",
    "minLevel": 1,
    "description": "Une grotte humide où rôdent des gobelins affamés. Idéale pour un héros débutant.",
    "rewards": "50 XP, 20 Gold, chance d'obtenir une dague rouillée",
    "dangers": "Gobelins (niveau 1), sol glissant, obscurité totale"
  },
  {
    "id": "2",
    "name": "Tour du Mage Fou",
    "difficulty": "medium",
    "minLevel": 3,
    "description": "La tour d'un mage devenu fou après des expériences interdites. Des pièges magiques parsèment chaque étage.",
    "rewards": "150 XP, 60 Gold, parchemin de sorts",
    "dangers": "Golems (niveau 3), pièges magiques, illusions"
  },
  {
    "id": "3",
    "name": "Sanctuaire des Dragons",
    "difficulty": "hard",
    "minLevel": 5,
    "description": "Un ancien temple abandonné, devenu le repaire d'un jeune dragon. Seuls les héros aguerris osent y pénétrer.",
    "rewards": "400 XP, 150 Gold, écaille de dragon",
    "dangers": "Dragon (niveau 5), cultistes fanatiques, flammes éternelles"
  }
]
```

---

## Nouveau concept — guard asynchrone

Un guard peut retourner `boolean`, `UrlTree`, mais aussi une **`Promise`** ou un **`Observable`**.

Quand la vérification dépend de données asynchrones (ici : le `minLevel` vient du serveur), le guard doit retourner un `Observable<boolean | UrlTree>`. Angular s'abonne, attend la valeur, puis décide de laisser passer ou rediriger.

L'opérateur RxJS `map()` permet de transformer la valeur émise par l'Observable en `boolean | UrlTree`.

---

## Validation attendue

- [ ] `/donjons` affiche la liste avec nom, difficulté et niveau minimum
- [ ] Cliquer sur un donjon accessible (niveau héros >= minLevel) affiche le détail
- [ ] Cliquer sur un donjon inaccessible redirige vers `/donjons`
- [ ] La page de détail affiche description, récompenses et dangers
- [ ] Lazy loading visible dans les DevTools Network (chunk séparé)
- [ ] Le guard ne modifie pas le héros

---

## Concepts à revisiter

lazy loading, guards fonctionnels, resolvers, child routes, HttpClient, signals (lecture seule), `map()` (RxJS), `@for`, `@if`, smart/dumb, pipes
