# Mission 016 — ViewChild

## Concept Angular

`ViewChild` — accéder à un élément DOM ou à une instance de composant enfant **depuis le TypeScript** (et non depuis le template comme avec `#ref`).

## Objective

Comprendre quand et pourquoi utiliser `ViewChild` plutôt qu'une template reference, et savoir l'utiliser dans le cycle de vie du composant.

## Contexte

La mission 015 t'a montré les `#ref` — elles permettent des interactions directes dans le template. Mais parfois tu as besoin d'accéder à un enfant **depuis le TypeScript** : pour appeler une méthode dans `ngAfterViewInit`, réagir à un événement, ou manipuler un élément après le rendu.

C'est là qu'intervient `ViewChild`.

## Mission

### Étape 1 — ViewChild sur un composant enfant

Dans `Hero` :

- Déclare un `ViewChild` pointant sur `HeroStats`
- Dans `ngAfterViewInit`, appelle `flash()` automatiquement au chargement
- Observe : à quel moment `ViewChild` est-il disponible ? Que se passe-t-il si tu l'utilises dans le constructeur ?

> La différence entre `constructor`, `ngOnInit` et `ngAfterViewInit` est clé ici.

### Étape 2 — ViewChild sur un élément DOM natif

- Ajoute un `<div>` avec une classe CSS dans le template de `Hero`
- Accède à cet élément via `ViewChild` avec `ElementRef`
- Dans `ngAfterViewInit`, modifie son `textContent` depuis le TypeScript

> Observe : `ViewChild` avec un composant retourne l'instance du composant. `ViewChild` avec un élément DOM retourne un `ElementRef`.

### Étape 3 — ViewChild et @if

- Place `<app-hero-stats>` dans un bloc `@if`
- Déclare `ViewChild` avec `{ static: false }` (défaut)
- Observe : que vaut `ViewChild` quand le `@if` est `false` ?
- Essaie `{ static: true }` — que se passe-t-il ?

> Comprendre `static: true` vs `static: false`.

## Files concerned

- `src/app/features/hero/hero.ts` — ajout `ViewChild`, `ngAfterViewInit`
- `src/app/features/hero/hero.html` — ajout `<div>` de test + `@if` conditionnel
- `src/app/shared/components/stat-bar/stat-bar.ts` — `flash()` déjà présente

## Validation attendue

- Étape 1 : `flash()` appelée automatiquement au chargement via `ngAfterViewInit`
- Étape 2 : `textContent` du `<div>` modifié depuis le TypeScript
- Étape 3 : comportement `static: true` vs `static: false` compris et noté dans `LEARNINGS.md`
- Aucune régression sur les fonctionnalités existantes du héros
