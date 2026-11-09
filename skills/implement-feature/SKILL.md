---
name: implement-feature
description: Implement one planned task with minimal, tested, rule-driven code. Use after a plan exists.
---

# implement-feature

1. Take the next open task from `.hackathon/plan.md`.
2. Read only the files needed. Do not edit immutable files (see `challenge/constraints.md`).
3. Implement; thresholds come from `reference/validation-rules.json` only.
4. Run `npm run validate -- --quick` (and unit tests if present). Fix until green or report the blocker.
5. Mark the task done; summarize in two sentences; propose intervention-log entries if the human redirected you.
