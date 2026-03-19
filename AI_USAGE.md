# 🤖 AI Usage Guide

This document explains how to effectively use an AI assistant with this project.

---

## 🎯 Goal

Ensure consistent, high-quality, and contextual AI assistance across sessions.

---

## 🧠 Core Principle

AI has no memory.

You must provide context every time to get relevant answers.

---

## ⚡ Quick Template (Recommended)

Use this template when asking questions:

```
Here is the project context:

TL;DR:
Use AI_CONTEXT to keep consistency across sessions.

[paste AI_CONTEXT.md]

---

Current state:
[paste PROGRESS.md]

---

Current mission:
[paste mission file]

---

My question:
...
```

---

## 🧩 Example

```
Here is the project context:

[paste AI_CONTEXT.md]

---

Current state:
Level: 2
XP: 20

---

Current mission:
Mission 003 — Hero component

---

My question:
I am trying to update a signal but it does not trigger the UI update.
Can you guide me with hints only?
```

---

## 🚀 Fast Mode (When in a hurry)

```
Follow the rules defined in my AI_CONTEXT.md

Current problem:
...
```

⚠️ Less reliable — use only for simple questions.

---

## 🧠 Best Practices

- Always include the current mission
- Always include relevant code
- Ask for **hints first**, not full solutions
- Be specific (avoid generic questions)

---

## 🚫 Bad Example

```
How do Angular signals work?
```

❌ Too generic → low-value answer

---

## ✅ Good Example

```
In my project (see AI_CONTEXT), I use signals for hero state.

I struggle to update a nested property.

Here is my code:
...

Can you guide me with hints only?
```

✔ Contextual
✔ Precise
✔ Actionable

---

## 📌 Reminder

AI_CONTEXT.md = rules
AI_USAGE.md = how to use the rules

Both are required for optimal results.
