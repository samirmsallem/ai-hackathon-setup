# Definition of done

A team is **done** when all of the following are true:

- [ ] `npm run validate` passes (scenario conformance, lint, tests, build).
- [ ] `npm run demo` starts the app; a scenario can be selected in the browser and the CRITICAL scenario shows findings, DTCs and actions.
- [ ] Optional: `npm run test:e2e` passes.
- [ ] `README.md` explains setup, usage, architecture and extension (written by the agent).
- [ ] `tests/acceptance`, `reference/`, `data/` are unmodified.
- [ ] `.hackathon/METHOD_LOG.md` and `INTERVENTION_LOG.md` are complete; `npm run hackathon:results` was run.
- [ ] The presentation outline from `evaluation/presentation-template.md` is filled (agent-assisted).
- [ ] Work is committed on the team branch.

If time runs out, "done" is reported honestly as a percentage of acceptance criteria met. Partial results with good learnings score well.
