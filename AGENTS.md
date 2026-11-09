# AGENTS.md - rules for every AI agent in this repository

You are helping a 2-3 person team in the **SDV Agentic Engineering Hackathon** (120 minutes). Read `HACKATHON.md` for the workflow and `challenge/` for the task.

## Product
SDV Vehicle Diagnostics Assistant: deterministic telemetry evaluation (`src/core`), HTTP API (`src/server`), React UI (`src/web`). Requirements and contracts: `challenge/requirements.md`.

## Commands
`npm install` | `npm run dev` | `npm run build` | `npm run test` | `npm run lint` | `npm run format` | `npm run validate` (`-- --quick` for scenario conformance only) | `npm run demo` | `npm run test:e2e` | `npm run smoke`

## Hard rules
1. **Humans do not hand-write code, tests, config or docs.** You do the implementation. Never answer with "paste this into file X".
2. **Immutable files:** `challenge/`, `data/`, `reference/`, `tests/acceptance/`, `tests/harness/`, `scripts/lib.mjs`. Never edit, never weaken, never skip. If a test seems wrong, say so and let the human decide.
3. **Do not read or use `maintainers/`** if it exists.
4. **Rules are configuration:** thresholds only from `reference/validation-rules.json`; DTCs only from `reference/diagnostic-codes.json`. No magic numbers in code.
5. **Determinism:** `src/core` is pure: no `Date.now()`, randomness, network or file access. Time is the `evaluationTime` parameter.
6. **No live LLM calls** in the product's default path. An optional AI explanation module must have a deterministic fallback and must not be needed by any test.
7. **Stack:** TypeScript (erasable syntax only - no enums, namespaces or parameter properties; use `import type`; import local files with `.ts` extensions), Node >= 22.18, React + Vite, Vitest, ESLint, Prettier. Ask before adding a dependency and log the decision.
8. **Stay in scope:** no auth, databases, cloud, Docker requirement.
9. **Validate often:** `npm run validate -- --quick` after each change; full `npm run validate` before claiming done. Report real results, never claim a pass you did not observe.
10. **Respect session settings** in `.hackathon/session.json` (autonomy, validation, tracking).
11. **Log interventions:** when the human gives a significant instruction, decision, rejection or correction, propose/append an entry in `.hackathon/INTERVENTION_LOG.md` according to the tracking mode.
12. Keep answers short; surface blockers early; prefer small commits on the team branch.

## Layout
`src/core` evaluation engine and types | `src/server` API | `src/web` UI | `tests/unit|api|e2e` team tests | `tests/acceptance` fixed acceptance tests | `.hackathon/` session artifacts (git-ignored).
