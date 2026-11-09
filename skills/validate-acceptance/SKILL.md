---
name: validate-acceptance
description: Run all validation commands and report the result per acceptance criterion. Use before declaring done.
---

# validate-acceptance

1. Run `npm run validate`, `npm run test:e2e` (if Playwright browsers are installed), and `npm run demo` (check it starts).
2. Run `git diff --stat -- challenge data reference tests/acceptance tests/harness`; must be empty.
3. Write `.hackathon/validation-report.md`: the real output per check, the status of AC-1..AC-12, and known gaps.
4. If anything fails, list the smallest next steps instead of fixing silently.
