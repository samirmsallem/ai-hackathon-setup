# Test-driven

**Idea:** Red, green, refactor. Acceptance tests exist already; add focused unit tests before each unit.

## Workflow
1. Run `npm run test:acceptance`; confirm red.
2. Pick the smallest failing scenario; ask the agent for a failing unit test, then the minimal code.
3. Repeat across scenarios, refactor when green.
4. Add UI and API with their own tests.

## Suggested agents / skills
Agents: tester, developer. Skills: `generate-tests`.

## Checkpoints (for Supervised autonomy)
After each scenario group is green.

## Watch out for
Never weaken `tests/acceptance`. The reviewer must check for test tampering.

## Document in METHOD_LOG
What you changed from this recipe and why.
