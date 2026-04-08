# 📖 Learnings

Personal notes on concepts learned during the project.

---

## 🏗️ Architecture

### core/ is for providers, not data structures

`core/` is meant for singleton services, guards, and interceptors — things Angular instantiates once and injects globally.
Models and interfaces do NOT belong in `core/` because they are data structures, not providers.

### Where to put models

| Model type | Location |
|---|---|
| Specific to one feature | `features/<feature>/<feature>.model.ts` |
| Shared across multiple features | `shared/models/` |

### shared/components/ vs shared/ui/

Avoid splitting `shared/` into `components/` and `ui/`. In `shared/`, everything should be presentational by definition — one folder is enough.
- `shared/components/` → all reusable UI components

---
