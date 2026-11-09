---
name: review-code
description: Independent review of changes against requirements, rules, tests and maintainability. Read-only; produces findings.
---

# review-code

1. Check `git status`/`git diff`; confirm immutable files untouched (AC-11).
2. Verify no hard-coded thresholds, no `Date.now()` in core, no network in core.
3. Verify error handling for garbage input, accessibility basics in the UI (labels, keyboard, not colour only).
4. Look for test weakening (skipped/loosened assertions).
5. Output a table: severity (BLOCKER/MAJOR/MINOR), file:line, finding, suggested fix. Do not change code.
