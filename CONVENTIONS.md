# 📐 Conventions

## 🌍 Language

- Code: English
- Comments: English
- Commits: English

## 🧱 Angular

- Standalone components only
- Signals preferred for local state
- RxJS for async and complex flows
- Use readonly for exposed signals

## 📁 File Naming

Angular standard suffixes (Angular CLI convention):

```
hero/
  hero.component.ts
  hero.component.html
  hero.component.css
  hero.service.ts
  hero.model.ts
  hero.routes.ts
```

## 🧠 Code Rules

- No `any`
- Strict TypeScript
- Prefer interfaces
- Small, focused components

## 🎯 Architecture

- Components = UI only
- Services = business logic
- Core = singleton services
- Shared = reusable UI

## 📂 Folder Structure

```
src/
  app/
    core/               → singleton services, guards, interceptors
      guards/
      interceptors/
      services/
    shared/             → reusable UI across features
      components/
      directives/
      models/           → interfaces shared across multiple features
      pipes/
    features/           → one folder per feature
      hero/
        hero.component.ts
        hero.component.html
        hero.component.scss
        hero.service.ts
        hero.model.ts   → feature-specific model
        hero.routes.ts
    layout/             → layout components (navbar, sidebar, etc.)
    app.component.ts
    app.component.html
    app.config.ts
    app.routes.ts
  assets/
  environments/
```

## Mock backend

- json-server used for API mocking
- all mock data stored in /server/db.json
- no backend logic inside /src

## 🔀 Git

See GIT_WORKFLOW.md for all git rules, commit conventions and step-by-step workflow.
