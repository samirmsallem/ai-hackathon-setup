---
name: generate-tests
description: Create focused unit, API and e2e tests from acceptance criteria without weakening tests/acceptance. Use for TDD or test gaps.
---

# generate-tests

1. Read `challenge/acceptance-criteria.md` and `reference/expected-results.json`.
2. Put new tests in `tests/unit/`, `tests/api/` or `tests/e2e/`; never edit `tests/acceptance` or `tests/harness`.
3. Cover boundaries (SoC 20/8, temp 55/70, speed 0/260), garbage input, each rule in isolation, and configurability.
4. Confirm a new test fails for the right reason before the implementation exists (when TDD).
5. Report coverage of the 12 scenarios.
