# Acceptance criteria

| ID | Criterion | Verified by |
| --- | --- | --- |
| AC-1 | All 12 scenarios produce the status, dataQuality and finding codes in `reference/expected-results.json` | `tests/acceptance/core.test.ts`, `npm run validate` |
| AC-2 | Rules are read from `reference/validation-rules.json`; changing a threshold changes behaviour | acceptance test "rules are configurable" |
| AC-3 | Garbage input never throws; missing fields are reported | acceptance tests |
| AC-4 | Every finding has message, explanation and recommended action | acceptance tests |
| AC-5 | DTCs are interpreted (description, system, severity, action); unknown DTCs flagged | acceptance tests, manual |
| AC-6 | API contract in `requirements.md` is satisfied | `tests/acceptance/api.test.ts` |
| AC-7 | Browser UI shows status, telemetry, findings, DTCs, actions; scenario switching works | `npm run test:e2e`, manual demo |
| AC-8 | Custom JSON can be evaluated in the UI | manual / e2e |
| AC-9 | `npm run lint`, `build`, `test`, `validate`, `demo` succeed | scripts |
| AC-10 | README documents setup, usage, architecture, extension | reviewer |
| AC-11 | Tests were not weakened (`tests/acceptance`, `reference/`, `data/` unchanged) | `git diff --stat main -- tests/acceptance reference data` must be empty |
| AC-12 | Method log and intervention log are complete | `.hackathon/*.md` |
