# 🔀 Git Workflow — Angular Hero

A minimal and practical Git guide for this project.

---

## 🎯 Core Philosophy

- 1 mission = 1 clean commit (on main)
- Work in branches, merge cleanly
- main = clean history only

---

## 🌿 Create a mission branch

```bash
git checkout -b mission/<id>-<name>
```

Example:

```bash
git checkout -b mission/001-init-project
```

---

## 💾 Work in progress (WIP commits allowed)

```bash
git commit -m "wip: start setup"
git commit -m "fix: routing issue"
git commit -m "fix: jest config"
```

✔ No pressure → commit freely

---

## 🔍 Before merging (IMPORTANT)

👉 Clean history using squash

---

## 🔥 Merge with squash (RECOMMENDED)

```bash
git checkout main
git merge --squash mission/001-init-project
git commit -m "chore(init): project setup with angular, jest and json-server"
```

---

## 🏷️ Tag a phase

```bash
git tag phase-1-foundations
```

Optional push:

```bash
git push origin phase-1-foundations
```

---

## 📜 View history

```bash
git log --oneline
```

---

## 🔄 Switch branch

```bash
git checkout main
git checkout mission/001-init-project
```

---

## 🧹 Delete branch after merge

```bash
git branch -d mission/001-init-project
```

---

## 🚨 Fix last commit message

```bash
git commit --amend
```

---

## 🔙 Undo last commit (keep changes)

```bash
git reset --soft HEAD~1
```

---

## ❌ Discard changes

```bash
git restore .
```

---

## 🧠 Good commit examples

```bash
feat(hero): create hero component
feat(inventory): add item list
chore(init): project setup
```

---

## 🚫 Bad commit examples

```bash
fix stuff
update
test
```

---

## ⚠️ Rules to remember

- Never pollute main with WIP commits
- Always squash before merge
- Use clear commit messages
- Keep commits small and meaningful

---

## 🧠 Mental Model

- branch = playground
- main = official history
- commit = mission

---

## 🏆 Goal

A clean, readable, and professional Git history.
