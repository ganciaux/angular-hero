# 🗺️ Roadmap — Angular Hero

A structured learning path to master Angular by building a RPG.

---

## 📖 Légende

- **Missions principales** — guidées, step by step, progressives
- **⚔️ Side Quests** — optionnelles, moins guidées, intégrables au projet
  - Se débloquent à la fin d'une phase
  - Rédigées comme un cahier des charges client — pas de "crée le signal X"
  - Peuvent lire des données du projet principal, mais **ne le modifient jamais**
  - L'objectif est fonctionnel, l'implémentation est ta responsabilité
  - Les concepts à revisiter sont listés comme indices, pas comme étapes

---

## 🧰 Phase 0 — Setup & Tooling

### Concepts

- Angular CLI
- Project configuration
- TypeScript strict mode
- ESLint / Prettier
- Jest setup
- json-server setup
- Git workflow

### Missions

- Initialize Angular project
- Setup project architecture
- Configure linting & formatting
- Configure Jest
- Setup mock backend (json-server)

### Goal

Have a clean, professional, and ready-to-code project setup.

---

## 🟢 Phase 1 — Foundations

### Concepts

- Standalone components
- Application bootstrap
- Routing (basic)
- Layout architecture

### Missions

- Create layout component
- Setup router with main routes
- Implement navigation (navbar)
- Display routed content

### Goal

Understand how an Angular application is structured and navigated.

---

## 🟡 Phase 2 — Hero System

### Concepts

- Components
- Signals (`signal`, `computed`)
- Template syntax (`@if`)
- Event binding
- @Input / @Output
- Component communication

### Missions

- Create Hero component
- Display hero stats
- Add interactions (XP / HP)
- Split UI into child components
- Implement parent-child communication

### Goal

Master component basics and data flow between components.

---

## 🟠 Phase 3 — State & Services

### Concepts

- Dependency Injection
- Services
- Signal-based state management
- Separation of concerns

### Missions

- Create HeroService
- Move state from component to service
- Connect components to service
- Centralize business logic

### Goal

Understand how to structure and share state in Angular.

---

### ⚔️ Side Quest débloquée — SQ-01 : "Le Journal du Héros"

> **Règle absolue** : cette page est en lecture seule sur le reste du projet. Elle n'écrit rien dans HeroService.

**Brief client :**
> "Je veux pouvoir consulter ce que mon héros a accompli depuis le début de sa session. Chaque fois qu'il gagne de l'XP, perd des HP ou passe un niveau, je veux que ça soit noté quelque part et que je puisse consulter cet historique via le menu. Rien de compliqué — un journal lisible, trié du plus récent au plus ancien, avec l'heure de chaque événement. Et si je recharge la page, c'est normal que ça repart à zéro."

**Ce que le client ne dit pas (mais que tu dois déduire) :**
- Quelque chose doit "écouter" les actions du héros et les enregistrer
- Ce quelque chose doit être accessible depuis les composants qui déclenchent les actions
- La page de consultation doit être proprement intégrée à la navigation existante

**Contraintes techniques non négociables :**
- Aucun fichier existant ne doit être modifié pour stocker les données du journal
- Le journal ne doit pas influencer les stats du héros

**Concepts à revisiter :** signals, computed, services, inject(), asReadonly(), @for, @if, input.required(), routing, décomposition en composants, séparation smart/dumb

---

## 🔵 Phase 4 — Inventory System

### Concepts

- List rendering (`@for`)
- Component composition
- Pipes
- UI state management
- Smart vs Dumb components

### Missions

- Create inventory view
- Display list of items
- Create reusable item component
- Add/remove items
- Implement equip/unequip system
- Add pipes for item formatting

### Goal

Build a dynamic UI with reusable components.

---

### ⚔️ Side Quest débloquée — SQ-02 : "La Taverne du Dragon Bleu"

> **Règle absolue** : la taverne est un espace autonome. Elle ne partage aucun état avec l'inventaire ou le héros principal.

**Brief client :**
> "Les aventuriers ont besoin d'un endroit pour se retrouver ! Je veux une taverne accessible depuis le menu. On y trouve une liste d'aventuriers présents ce soir-là — chacun avec son nom, sa classe et son niveau. Je dois pouvoir filtrer par classe et trier par niveau. Si je clique sur un aventurier, j'ai accès à ses stats détaillées. Les données des aventuriers peuvent être en dur dans le code pour l'instant, on connectera le backend plus tard."

**Ce que le client ne dit pas :**
- Le filtre et le tri doivent être réactifs — pas de bouton "Rechercher"
- La fiche de détail peut s'afficher comme tu veux (panneau, inline, etc.) du moment que c'est propre
- Les aventuriers ont forcément un format de données cohérent

**Contraintes techniques non négociables :**
- Réutiliser les composants existants si pertinent, sans les modifier
- Aucun lien avec HeroService ou InventoryService

**Concepts à revisiter :** @for avec track, signals, computed (filtres/tri), smart/dumb, input.required(), output(), services, @if, pipes, template-driven forms (pour le champ filtre)

---

### ⚔️ Side Quest débloquée — SQ-03 : "Le Coffre du Dragon"

> **Règle absolue** : les items du coffre n'intègrent jamais l'inventaire principal.

**Brief client :**
> "Je veux une zone secrète accessible via une route dédiée. À chaque visite, un coffre mystérieux s'ouvre et révèle 3 objets générés aléatoirement parmi un pool prédéfini. Le joueur peut examiner chaque objet — voir son nom, son type et sa description. Un bouton 'Ouvrir un nouveau coffre' permet de relancer la génération. C'est purement de l'exploration, aucun item ne rejoint l'inventaire."

**Ce que le client ne dit pas :**
- Le pool d'items possibles doit être structuré et typé
- "Généré aléatoirement" implique qu'il ne faut pas toujours les mêmes 3 items
- L'affichage de chaque item doit être cohérent avec ce qui existe déjà dans le projet

**Contraintes techniques non négociables :**
- Réutiliser ItemCardComponent sans le modifier
- Aucune connexion à InventoryService

**Concepts à revisiter :** @for avec track, crypto.randomUUID(), smart/dumb, input.required(), output(), services, signals, @if, pipes, TypeScript (types stricts, template literal types)

---

## 🟣 Phase 5 — Advanced Component Patterns

### Concepts

- Advanced @Input / @Output usage
- ViewChild / ContentChild
- Template references (#ref)
- Content projection (`ng-content`)

### Missions

- Create reusable modal component
- Use content projection for dynamic content
- Access child component via ViewChild
- Build complex component interactions

### Goal

Master advanced Angular component communication patterns.

---

### ⚔️ Side Quest débloquée — SQ-04 : "La Galerie des Légendes"

> **Règle absolue** : les légendes sont des données statiques indépendantes. Aucun lien avec le héros principal.

**Brief client :**
> "Le jeu a besoin d'un hall of fame pour motiver les joueurs. Je veux une galerie accessible depuis le menu où s'affichent les grands héros de légende — chacun avec sa classe, son niveau légendaire et son histoire. Quand on clique sur une carte, un panneau de détail s'ouvre avec ses stats complètes et une citation. Ce panneau doit être suffisamment générique pour qu'on puisse le réutiliser ailleurs dans le jeu plus tard."

**Ce que le client ne dit pas :**
- "Suffisamment générique" signifie que le contenu du panneau ne doit pas être codé en dur dedans
- Les données des légendes peuvent vivre dans un fichier statique
- La galerie doit rester fluide même avec beaucoup de héros

**Contraintes techniques non négociables :**
- Le composant panneau/modal doit utiliser ng-content
- ViewChild doit intervenir quelque part dans la logique
- Aucun lien avec HeroService

**Concepts à revisiter :** ng-content, ViewChild, template references, signals, computed, @for avec track, input.required(), output(), services (optionnel), pipes, smart/dumb, @if

---

## 🟣 Phase 6 — Advanced Routing

### Concepts

- Child routes
- Lazy loading (`loadComponent`)
- Route guards
- Resolvers

### Missions

- Split app into feature routes
- Protect routes with guards
- Preload data with resolvers
- Optimize navigation

### Goal

Build a scalable and maintainable routing system.

---

### ⚔️ Side Quest débloquée — SQ-05 : "Les Donjons Oubliés"

> **Règle absolue** : le guard peut consulter le niveau du héros, il ne le modifie jamais.

**Brief client :**
> "Le jeu manque d'aventures ! Je veux une section 'Donjons' avec une liste de donjons disponibles, chacun avec son nom, sa difficulté et son niveau minimum requis. Si le héros n'a pas le niveau suffisant, l'accès au détail est refusé avec un message clair et un lien de retour. Si le héros a le niveau, la page de détail s'affiche avec la description complète du donjon, ses récompenses et ses dangers. Les données des donjons viennent du backend (json-server, endpoint dédié)."

**Ce que le client ne dit pas :**
- "Niveau minimum requis" implique une vérification quelque part avant d'accéder à la route
- Les données de détail ne doivent pas être re-fetchées si elles sont déjà disponibles
- La liste et le détail sont deux vues distinctes

**Contraintes techniques non négociables :**
- Lazy loading obligatoire sur la feature donjons
- Le guard lit HeroService en lecture seule uniquement
- Les donjons ont leur propre endpoint dans db.json

**Concepts à revisiter :** lazy loading, guards fonctionnels, resolvers, child routes, signals (lecture), @for avec track, @if, smart/dumb, input.required(), pipes (difficulté, niveau), services, HttpClient (premier usage en contexte libre)

---

## 🔴 Phase 7 — HTTP & Backend

### Concepts

- HttpClient
- Observables (RxJS)
- Interceptors
- Error handling

### Missions

- Connect to json-server
- Fetch hero data
- Persist game state
- Add loading and error states

### Goal

Understand how Angular communicates with a backend.

---

### ⚔️ Side Quest débloquée — SQ-06 : "Le Tableau d'Honneur"

> **Règle absolue** : endpoint dédié dans db.json, aucun lien avec les données du héros principal.

**Brief client :**
> "Je veux un classement des meilleurs héros du royaume, accessible depuis le menu. Les données viennent du serveur. L'affichage doit être propre dans tous les cas : quand ça charge, quand ça plante, quand la liste est vide. Le top 3 doit être mis en valeur visuellement. Un bouton 'Actualiser' permet de recharger le classement manuellement."

**Ce que le client ne dit pas :**
- "Propre dans tous les cas" signifie trois états distincts à gérer dans l'UI
- "Actualiser" implique de pouvoir re-déclencher un appel HTTP sans recharger la page
- Le top 3 mis en valeur peut passer par un pipe, une classe CSS conditionnelle, ou autre — c'est ton choix

**Contraintes techniques non négociables :**
- Endpoint `/leaderboard` séparé dans db.json
- Un interceptor doit logger les requêtes sortantes dans la console (utile pour déboguer)
- Gérer explicitement les états : loading / error / empty / data

**Concepts à revisiter :** HttpClient, observables, interceptors, error handling, signals (état local), @for avec track, @if, smart/dumb, input.required(), pipes, services, async pipe ou gestion manuelle

---

## ⚔️ Phase 8 — Combat System

### Concepts

- RxJS (streams, operators)
- State machine
- Async flows

### Missions

- Create enemy model
- Implement turn-based combat system
- Handle actions (attack, defend, use item)
- Manage combat state with RxJS

### Goal

Master asynchronous logic and complex state handling.

---

### ⚔️ Side Quest débloquée — SQ-07 : "L'Arène d'Entraînement"

> **Règle absolue** : combat isolé. Les HP et XP du héros principal ne bougent jamais.

**Brief client :**
> "Je veux un mode entraînement où le joueur peut s'exercer au combat sans risques. Le héros affronte un mannequin d'entraînement. Le combat est au tour par tour, chaque action est loggée en temps réel dans un journal de combat (dernier événement en haut). À la fin, un écran de résumé s'affiche avec les stats du combat : tours joués, dégâts infligés, dégâts reçus. Un bouton 'Recommencer' remet tout à zéro."

**Ce que le client ne dit pas :**
- "En temps réel" implique que le log se met à jour à chaque action, pas à la fin
- Le mannequin a ses propres HP, mais les HP affichés ne sont pas ceux du héros principal
- "Recommencer" doit vraiment tout réinitialiser proprement

**Contraintes techniques non négociables :**
- Service de combat dédié, totalement isolé de HeroService
- L'état du combat modélisé comme une machine à états (idle / fighting / finished)
- Les stats du héros principal sont inchangées après l'entraînement

**Concepts à revisiter :** RxJS (BehaviorSubject, operators), machine à états, services isolés, smart/dumb, signals, @for avec track, @if, pipes, output(), input.required(), computed

---

## 🧾 Phase 9 — Forms & Progression

### Concepts

- Reactive Forms
- Validators
- Form state management

### Missions

- Create hero creation form
- Add validation rules
- Implement leveling system
- Manage quests and rewards

### Goal

Handle user input and progression systems.

---

### ⚔️ Side Quest débloquée — SQ-08 : "La Forge du Destin"

> **Règle absolue** : les items forgés sont stockés dans un service dédié. Ils n'intègrent jamais l'inventaire principal.

**Brief client :**
> "Je veux que le joueur puisse forger son propre item légendaire. Un formulaire complet avec : nom de l'item (unique, entre 3 et 30 caractères), type (arme/armure/accessoire), rareté (commun/rare/épique/légendaire), et stats (attaque, défense, magie). Attention : le total des stats ne peut pas dépasser un plafond qui varie selon la rareté. Le nom doit être vérifié en 'asynchrone' (simule un appel serveur). Une fois forgé, l'item apparaît dans une galerie personnelle de créations. On peut en supprimer."

**Ce que le client ne dit pas :**
- "Unique" implique une validation qui consulte les items déjà forgés
- "Varie selon la rareté" implique une logique de validation dynamique liée à un autre champ
- La galerie de créations doit être réactive — elle se met à jour sans rechargement

**Contraintes techniques non négociables :**
- Formulaire réactif avec FormGroup, FormControl, FormBuilder
- Validators synchrones ET asynchrones
- ForgeService isolé, aucun lien avec InventoryService
- Réutiliser ItemCardComponent sans le modifier pour afficher la galerie

**Concepts à revisiter :** reactive forms, validators sync/async, FormBuilder, services, signals, computed, @for avec track, @if, smart/dumb, input.required(), output(), pipes, TypeScript strict (types, génériques)

---

## ✨ Phase 10 — UX & Performance

### Concepts

- Angular animations
- Change detection (OnPush)
- Performance optimization

### Missions

- Add animations (combat, UI)
- Improve UX feedback
- Optimize rendering performance

### Goal

Deliver a smooth and polished user experience.

---

## 🧪 Phase 11 — Testing

### Concepts

- Jest
- Unit testing
- Component testing

### Missions

- Setup test environment
- Test services
- Test components
- Ensure critical flows are covered

### Goal

Ensure code reliability and maintainability.

---

## 🚀 Phase 12 — Advanced & Scaling

### Concepts

- State management (optional)
- SSR / PWA
- Architecture scaling

### Missions

- Refactor state management if needed
- Add advanced features
- Optimize architecture

### Goal

Transform the project into a production-ready application.
