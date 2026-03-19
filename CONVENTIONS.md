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

hero/

- hero.ts
- hero.html
- hero.css

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

## Mock backend

- json-server used for API mocking
- all mock data stored in /server/db.json
- no backend logic inside /src

## 🔀 Git

Format:
type(scope): message

Examples:
feat(hero): create hero component
feat(combat): add attack system

Types:

- feat
- fix
- chore
- refactor
- test

## 🔀 Git Workflow

### Mission workflow

- Work on a temporary branch: `mission/<id>-<name>`
- Commit freely during development (WIP, fixes allowed)
- Before merging:
  - Clean history (rebase -i or squash)
  - Keep **1 clean commit per mission**

### Main branch

- Only clean commits
- 1 commit = 1 mission

### Tags

- Use tags to mark phases:

Example:
git checkout -b mission/001-init-project

git commit -m "wip: start setup"
git commit -m "fix: routing issue"
git commit -m "fix: jest config"

# review

git checkout main
git merge --squash mission/001-init-project
git commit -m "chore(init): project setup with angular, jest and json-server"

git tag phase-1-foundations
