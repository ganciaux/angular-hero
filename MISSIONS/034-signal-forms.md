# Mission 034 — Signal Forms

## Objectif

Créer un formulaire de paramètres héros avec les **Signal Forms** d'Angular (expérimental), et comprendre les différences avec les Reactive Forms de la mission 033.

## Contexte

Signal Forms est une API expérimentale introduite dans Angular 21 et disponible via `@angular/forms/signals`. Elle remplace `FormGroup/FormControl` par des **signaux ordinaires**, alignant les formulaires avec la direction reactive d'Angular moderne.

> ⚠️ L'API est expérimentale et peut changer. Si l'import `@angular/forms/signals` échoue, il faut mettre Angular à jour : `ng update @angular/core @angular/cli`.

---

## Nouveau concept — Signal Forms

### Philosophie

Avec les Reactive Forms, la structure du formulaire **est** le modèle de données (`FormGroup`).  
Avec les Signal Forms, la donnée est un **signal ordinaire**, et le formulaire est une vue réactive dessus.

```
Reactive Forms : FormGroup → valeurs → soumission
Signal Forms   : signal<T> → form(signal) → soumission via signal
```

---

## Les briques de base

### 1. Le modèle — signal ordinaire

On définit d'abord **la donnée** comme un `signal<T>` standard :

```typescript
interface HeroFormData {
  name: string;
  heroClass: HeroClass;
  level: number;
}

heroModel = signal<HeroFormData>({
  name: 'Arthur',
  heroClass: 'warrior',
  level: 1,
});
```

### 2. form() — le form tree

`form()` prend le signal et génère un **arbre de champs** qui reflète la structure du modèle :

```typescript
import { form, required, minLength, min, max } from '@angular/forms/signals';

heroForm = form(this.heroModel, (path) => {
  required(path.name, { message: 'Le nom est requis' });
  minLength(path.name, 2, { message: 'Minimum 2 caractères' });
  required(path.heroClass, { message: 'La classe est requise' });
  min(path.level, 1, { message: 'Level minimum est 1' });
  max(path.level, 5, { message: 'Level maximum est 5' });
});
```

Tous les validateurs (`required`, `minLength`, `maxLength`, `min`, `max`, `pattern`, `email`) s'importent depuis `@angular/forms/signals`.

### 3. FormField — directive de binding

Remplace `formControlName`. S'utilise directement sur l'élément HTML :

```html
<input [formField]="heroForm.name" />
<input type="number" [formField]="heroForm.level" />
<select [formField]="heroForm.heroClass">...</select>
```

---

## État des champs

Un champ se **lit comme un signal** (appel de fonction) pour accéder à son état :

```typescript
heroForm.name()           // FieldState
heroForm.name().value()   // valeur actuelle (signal)
heroForm.name().touched() // boolean — l'utilisateur a quitté le champ
heroForm.name().invalid() // boolean — au moins une erreur
heroForm.name().errors()  // ValidationError[] — tableau d'objets { message }
```

### État du formulaire entier

Le formulaire est lui-même appelable :

```typescript
heroForm().valid()    // true si tous les champs sont valides
heroForm().invalid()  // true si au moins un champ est invalide
heroForm().touched()  // true si au moins un champ a été touché
```

---

## Afficher les erreurs

Plus besoin des `errors?.['required']` — chaque erreur est un objet avec `.message` :

```html
@if (heroForm.name().touched() && heroForm.name().invalid()) {
  @for (error of heroForm.name().errors(); track error) {
    <p>{{ error.message }}</p>
  }
}
```

---

## Soumettre le formulaire

Les données vivent dans le **signal modèle**, pas dans le form tree :

```typescript
onSubmit() {
  if (this.heroForm().valid()) {
    const { name, heroClass, level } = this.heroModel();
    this.heroService.configure(name, heroClass, level);
    this.router.navigate(['/hero']);
  }
}
```

### Réinitialiser

Pas de `form.reset()` — on met à jour le signal modèle directement :

```typescript
onReset() {
  this.heroModel.set({
    name: this.heroService.hero().name,
    heroClass: this.heroService.hero().heroClass,
    level: this.heroService.hero().level,
  });
}
```

---

## Exercice

### 1. Créer le composant HeroSettings

Crée `src/app/features/hero/hero-settings/hero-settings.ts` avec :
- Une interface `HeroFormData` (name, heroClass, level)
- Un signal modèle initialisé depuis `heroService.hero()`
- Un `form()` avec les validateurs : `name` (required, minLength 2), `heroClass` (required), `level` (min 1, max 5)
- `onSubmit()` — appelle `heroService.configure()` si `heroForm().valid()`
- `onReset()` — remet le signal modèle aux valeurs actuelles du héros

### 2. Template

Même structure que `hero-create.html` mais avec l'API Signal Forms :
- `[formField]` sur chaque champ à la place de `formControlName`
- Supprime `[formGroup]` et `(ngSubmit)` — utilise `(submit)` directement sur `<form>`
- Erreurs via `heroForm.field().errors()` avec `@for`
- `[disabled]="heroForm().invalid()"` sur le bouton submit

### 3. Route

Ajoute `/hero-settings` dans `app.routes.ts`.

---

## Comparaison directe Reactive vs Signal

| | Reactive Forms (033) | Signal Forms (034) |
|---|---|---|
| Déclaration | `fb.nonNullable.group({...})` | `signal<T>({...})` + `form(model, schema)` |
| Validation | `[Validators.required, Validators.minLength(2)]` | `required(path.name)` + `minLength(path.name, 2)` |
| Binding | `formControlName="name"` | `[formField]="heroForm.name"` |
| Lire les erreurs | `controls.name.errors?.['required']` | `heroForm.name().errors()` → `{ message }` |
| Validité globale | `form.invalid` (propriété) | `heroForm().invalid()` (signal) |
| Lire les données | `form.getRawValue()` | `heroModel()` |
| Réinitialiser | `form.reset()` | `heroModel.set({...})` |
| Typage | `fb.nonNullable` + `getRawValue()` | Inféré automatiquement depuis le signal |

---

## Validation attendue

- [ ] Composant `HeroSettings` créé avec Signal Forms
- [ ] Interface `HeroFormData` définie
- [ ] Signal modèle initialisé depuis le héros courant
- [ ] Validateurs appliqués via la fonction schéma de `form()`
- [ ] Erreurs affichées après `touched()`, avec le `.message` de chaque erreur
- [ ] Bouton désactivé si `heroForm().invalid()`
- [ ] Soumission valide → `heroService.configure()` → navigation `/hero`
- [ ] Route `/hero-settings` accessible depuis la navigation
