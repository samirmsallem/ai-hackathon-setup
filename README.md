# SDV Agentic Engineering Hackathon

Two hours, 3-4 teams, one challenge: build the **SDV Vehicle Diagnostics Assistant** with AI agents
(Claude Code or GitHub Copilot) using an engineering method *you* choose, and learn which approach works
best. One command drives the whole thing.

## Quick start

```bash
git clone <repo> && cd sdv-hackathon
git checkout -b team/<name>
npm run setup          # checks Node >= 22.18, runs npm install
```

Then open the repo in **Claude Code** (`claude`) or **VS Code with GitHub Copilot Chat (agent mode)** and run:

```
/hackathon
```

In Copilot, if `/hackathon` is not offered: *Chat: Run Prompt...* from the command palette, or attach
`.github/prompts/hackathon.prompt.md` and say "Follow this prompt."

`/hackathon` explains the task and the rules, asks for method, autonomy level, validation strategy and
framework in **one** answer, installs what you picked, and starts building. Your job from there:
**Prompt -> Review -> Decide -> Redirect**. You never hand-write code, tests, config or docs.

## What is in the repository

| Path | Purpose |
| --- | --- |
| `HACKATHON.md` | Workflow, methods, autonomy levels, validation strategies, orchestrator protocol |
| `AGENTS.md` | Hard rules for every agent |
| `challenge/` | Mission, requirements, acceptance criteria, constraints, domain, definition of done |
| `frameworks/catalog.yaml` | The seven optional frameworks and their install commands |
| `skills/` | Six reusable skills (plan, generate tests, implement, review, validate, demo) |
| `prompts/` | Shared `/hackathon` and `/reset` protocols, used by both tools |
| `.claude/`, `.github/` | Thin `/hackathon` and `/reset` wrappers, plus four agents per tool |
| `data/`, `reference/` | 12 telemetry scenarios, rules, DTC catalog, expected results (immutable) |
| `src/`, `tests/` | Starter skeleton (stub core, stub API, placeholder UI), fixed acceptance tests |
| `.hackathon/` | Your session file (git-ignored) |

## Starting state (intentional)

The repo ships a **buildable skeleton**: `npm run build` and `npm run lint` pass and
`npm run test:harness` is green, but `npm run test:acceptance` and `npm run validate` are **red**.
Turning them green with a validated, extendable prototype is the task.

## Commands

`npm run setup | dev | build | test | lint | format | validate | demo`, plus `test:harness`,
`test:acceptance`, `test:e2e`, `hackathon:init`.

`npm run dev` serves the API on :3001 and Vite on :5173. `npm run validate -- --quick` checks all 12
scenarios in about a second. `npm run demo` prints scenario results and serves the built app. Reference
rules live in `reference/validation-rules.json`, scenario expectations in `reference/expected-results.json`.

## Facilitator guide

1. **One week before:** run `npm install` on a networked machine, commit the generated
   `package-lock.json`, then `npm run validate`. Install Playwright browsers once
   (`npx playwright install chromium`) if you want e2e. Verify each framework in
   `frameworks/catalog.yaml` with both tools and set `status: confirmed`.
2. **Reference solution:** `maintainers/reference-solution/` passes all 12 scenarios (core + API, no UI).
   To prove the acceptance suite is satisfiable, temporarily copy it over `src/core/evaluate.ts` and
   `src/server/index.ts`, run `npm run validate`, then revert.
3. **Event branch:** delete `maintainers/` (`git rm -r maintainers`) so agents cannot find it, and hand
   teams the resulting branch.
4. **Pre-event day:** on each laptop confirm Node >= 22.18, that `/hackathon` appears in both tools (Copilot
   needs `chat.promptFiles` enabled), and that framework installs have network access or are pre-installed.
5. **During:** keep time against the timeline in `HACKATHON.md`; collect each team's
   `.hackathon/session.json` and final branch.

## Reset

Run `/reset` in Claude Code or Copilot: it clears `.hackathon/` safely, and - only after an explicit
confirmation - can also discard `src/`/`tests/` changes and restore the starter skeleton. The same two
steps by hand: `rm -rf .hackathon/* && touch .hackathon/.gitkeep`, then
`git restore src tests && git clean -fd src tests`.

## Known limitations

- `package-lock.json` is not committed: generate it with the first `npm install` and commit it.
- Framework install commands marked `status: verify` in `frameworks/catalog.yaml` need a pre-event check;
  the fallback is always native tools only.
- Slash-command details change between Claude Code and Copilot releases; fallbacks are in `HACKATHON.md`.
