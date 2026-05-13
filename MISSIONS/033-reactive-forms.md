# Mission 033 — Reactive Forms

## Objectif

Créer un formulaire de configuration du héros avec validation, en utilisant les Reactive Forms Angular.

## Contexte

Actuellement le héros est défini en dur dans `HeroService`. On va ajouter un formulaire pour configurer son nom, sa classe et son niveau de départ. À la soumission, le héros est mis à jour dans le service.

---

## Nouveau concept — Reactive Forms

Angular propose deux approches pour les formulaires :

| | Template-driven | Reactive Forms |
|---|---|---|
| Déclaration | Dans le template (`ngModel`) | Dans le TypeScript |
| Validation | Attributs HTML | `Validators` |
| Testabilité | Difficile | Facile |
| Complexité | Simple | Intermédiaire |
| Usage | Formulaires simples | Formulaires complexes, validations cross-champs |

Les Reactive Forms sont **déclarés en TypeScript** — la structure du formulaire est explicite et testable.

---

## Les briques de base

### FormControl

Un champ unique avec sa valeur et ses validateurs :

```typescript
const name = new FormControl('', [Validators.required, Validators.minLength(2)]);
```

### FormGroup

Un groupe de `FormControl` qui forment un formulaire :

```typescript
const form = new FormGroup({
  name: new FormControl('', [Validators.required]),
  level: new FormControl(1, [Validators.min(1), Validators.max(5)]),
});
```

### FormBuilder

Raccourci pour créer `FormGroup` + `FormControl` sans `new` :

```typescript
private fb = inject(FormBuilder);

form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  level: [1, [Validators.min(1), Validators.max(5)]],
});
```

`FormBuilder` est l'approche recommandée — moins verbeux, même résultat.

---

## Binding dans le template

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="name" />
  <button type="submit" [disabled]="form.invalid">Confirmer</button>
</form>
```

- `[formGroup]="form"` — lie le template au FormGroup TypeScript
- `formControlName="name"` — lie l'input au FormControl correspondant
- `(ngSubmit)` — déclenché à la soumission (évite le rechargement de page)
- `[disabled]="form.invalid"` — désactive le bouton si le formulaire est invalide

---

## Afficher les erreurs

```html
@if (form.controls.name.invalid && form.controls.name.touched) {
  @if (form.controls.name.errors?.['required']) {
    <p>Le nom est requis</p>
  }
  @if (form.controls.name.errors?.['minlength']) {
    <p>Minimum 2 caractères</p>
  }
}
```

- `touched` — l'utilisateur a quitté le champ au moins une fois (évite d'afficher les erreurs dès l'ouverture)
- `errors?.['required']` — accès sécurisé à l'objet d'erreurs

---

## Exercice

### 1. Préparer le modèle

Ajoute un champ `heroClass: 'warrior' | 'magician' | 'elf'` dans `HeroModel`.
Mets à jour la valeur initiale dans `HeroService`.

### 2. Ajouter une méthode dans HeroService

```typescript
configure(name: string, heroClass: 'warrior' | 'magician' | 'elf', level: number): void
```

Cette méthode reset le héros avec les nouvelles valeurs. Les stats (hp, attack, defense) varient selon la classe :

| Classe | HP | Attack | Defense |
|---|---|---|---|
| warrior | 120 | 15 | 10 |
| magician | 70 | 20 | 5 |
| elf | 90 | 12 | 8 |

### 3. Créer le composant HeroCreate

Crée `src/app/features/hero/hero-create/hero-create.ts` avec :
- Un `FormGroup` via `FormBuilder` : `name`, `heroClass`, `level`
- Validation sur chaque champ :
  - `name` : requis, 2 à 20 caractères
  - `heroClass` : requis
  - `level` : requis, entre 1 et 5
- Méthode `onSubmit()` qui appelle `heroService.configure()` si le formulaire est valide, puis navigue vers `/hero`

### 4. Template

- `<form [formGroup]>` avec `(ngSubmit)`
- `<input>` pour le nom
- `<select>` pour la classe avec les 3 options
- `<input type="number">` pour le niveau
- Affichage des erreurs par champ (seulement si `touched`)
- Bouton submit désactivé si `form.invalid`

### 5. Route

Ajoute la route `/hero-create` dans `app.routes.ts` (route plate, pas de child).

---

## Validation attendue

- [ ] `HeroModel` contient `heroClass`
- [ ] `HeroService.configure()` met à jour le héros selon la classe
- [ ] Formulaire avec les 3 champs et leurs validateurs
- [ ] Erreurs affichées champ par champ après `touched`
- [ ] Bouton désactivé si formulaire invalide
- [ ] Soumission valide → héros mis à jour → navigation vers `/hero`
- [ ] Route `/hero-create` accessible depuis la navigation
