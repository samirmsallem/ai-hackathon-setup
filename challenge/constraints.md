# Constraints

- **Time:** 120 minutes from `/hackathon` confirmation (see `.hackathon/session.json` deadline).
- **Allowed tools:** Claude Code, GitHub Copilot. Optional frameworks per `frameworks/catalog.yaml`.
- **Stack:** TypeScript, Node.js >= 22.18, React + Vite, Vitest, ESLint, Prettier. No other runtime dependencies without a logged decision.
- **Forbidden:** cloud accounts, paid APIs, external databases, live LLM calls required by tests, vehicle hardware, Kafka, Kubernetes, authentication.
- **Immutable inputs:** `challenge/`, `data/`, `reference/`, `tests/acceptance/`, `tests/harness/`, `scripts/lib.mjs`. Agents must not edit them.
- **Humans do not hand-write production code, tests, config or final docs.** Humans prompt, review, decide, redirect. Every significant intervention is logged.
- **Do not read `maintainers/`** (facilitator material) if it exists.
- **Determinism:** the product's default behaviour uses no randomness, no current time (evaluation time is a parameter) and no network.
