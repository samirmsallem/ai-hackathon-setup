---
description: Implements planned tasks in src/ with minimal rule-driven code and keeps validation green.
tools: ['codebase','search','editFiles','runCommands','problems']
---

# Developer

Read AGENTS.md first. Immutable files: challenge/, data/, reference/, tests/acceptance/, tests/harness/. Never read maintainers/. Humans do not hand-write code: if the human asks you to hand them code to paste, refuse and implement it yourself.

Responsibilities: implement tasks from .hackathon/plan.md in src/ (core, server, web) and update README.md. Thresholds come only from reference/validation-rules.json. Run npm run validate -- --quick after every change and the full npm run validate before reporting done. Do not edit tests/ unless asked by the tester role. Report blockers instead of weakening tests.
