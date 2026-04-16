# Mission 018 — Composant Modal réutilisable

## Concept Angular

Combiner `ng-content`, `ViewChild` et template references pour construire un composant modal
générique — ouvert/fermé depuis le parent via une référence directe.

## Objective

Créer un composant `Modal` réutilisable que le parent peut ouvrir et fermer via `ViewChild`
ou une template reference, avec un contenu entièrement défini par projection.

## Contexte

On a vu `ng-content` pour projeter du contenu, et `ViewChild` / `#ref` pour accéder à un composant
enfant depuis le parent. Une modal combine les deux :
- Le contenu est projeté (`ng-content`)
- L'ouverture/fermeture est contrôlée par le parent via une méthode publique (`open()` / `close()`)

## Mission

### Étape 1 — Composant Modal

Crée un composant `Modal` dans `shared/components/modal/` :

- Il possède un signal privé `isOpen = signal(false)`
- Il expose deux méthodes publiques : `open()` et `close()`
- Son template affiche son contenu uniquement quand `isOpen()` est `true`
- Le contenu est projeté via `ng-content` avec deux zones nommées : `[modal-header]` et `[modal-body]`
- Un bouton "Fermer" dans le template de la modal appelle `close()`

```html
<!-- modal.html -->
@if (isOpen()) {
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <ng-content select="[modal-header]"></ng-content>
        <button (click)="close()">✕</button>
      </div>
      <div class="modal-body">
        <ng-content select="[modal-body]"></ng-content>
      </div>
    </div>
  </div>
}
```

### Étape 2 — Ouvrir via template reference

Dans `Hero` :

- Ajoute `<app-modal #heroModal>` avec un contenu projeté (ce que tu veux)
- Ajoute un bouton qui appelle `heroModal.open()` directement depuis le template
- Vérifie que la modal s'ouvre et se ferme

```html
<button (click)="heroModal.open()">Ouvrir Modal</button>
<app-modal #heroModal>
  <h2 modal-header>Détails du Héros</h2>
  <p modal-body>Contenu de la modal.</p>
</app-modal>
```

### Étape 3 — Ouvrir via ViewChild

Dans `Inventory` :

- Ajoute `<app-modal>` avec un contenu projeté
- Déclare un `@ViewChild` sur la modal dans le TypeScript
- Ouvre la modal depuis une méthode du composant (pas directement depuis le template)

```typescript
@ViewChild(Modal) modal!: Modal;

openModal() {
  this.modal.open();
}
```

> Observe : template reference = ouverture depuis le template, ViewChild = ouverture depuis le TypeScript.
> Les deux sont valides — le choix dépend du contexte.

## Files concerned

- `src/app/shared/components/modal/modal.ts` — à créer
- `src/app/shared/components/modal/modal.html` — à créer
- `src/app/features/hero/hero.html` — utilisation via template reference
- `src/app/features/inventory/inventory.ts` — utilisation via ViewChild
- `src/app/features/inventory/inventory.html` — utilisation de la modal

## Validation attendue

- La modal s'ouvre et se ferme correctement dans Hero (via `#ref`)
- La modal s'ouvre et se ferme correctement dans Inventory (via `ViewChild`)
- Le contenu est différent dans chaque contexte
- Aucune régression sur les fonctionnalités existantes
