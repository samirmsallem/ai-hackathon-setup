# SDV Agentic Engineering Hackathon

120 minutes. Teams of 2-3. Tool: Claude Code or GitHub Copilot. Same repository, requirements, data,
acceptance criteria and time limit for everyone. **Different engineering methods** - that is the experiment.

**Research question:** which AI engineering approach gets a team from a predefined SDV problem to a
validated, extendable prototype most effectively?

## Start

| Tool | Command |
| --- | --- |
| Claude Code | `/hackathon` (run `claude` in the repo root) |
| GitHub Copilot | `/hackathon` in Copilot Chat, agent mode. If it is not offered: *Chat: Run Prompt...* from the command palette, or attach `.github/prompts/hackathon.prompt.md` and say "Follow this prompt." |

`/hackathon` is the only command. It explains the task, asks four questions, sets up the workflow and
starts the implementation. Everything below is what it uses.

## Your role

**Prompt -> Review -> Decide -> Redirect.** The AI writes all code, tests, configuration and docs.

1. Humans do not hand-write code, tests, config or docs.
2. Immutable: `challenge/`, `data/`, `reference/`, `tests/acceptance/`, `tests/harness/`, `scripts/lib.mjs`.
3. Thresholds come from `reference/validation-rules.json`, DTCs from `reference/diagnostic-codes.json`. No magic numbers.
4. `npm run validate -- --quick` after each change, full `npm run validate` before claiming done. Report real output only.

Full rules: `AGENTS.md`. Task: `challenge/`.

## Timeline

| Min | Phase |
| --- | --- |
| 0-10 | `/hackathon`: challenge, configuration, setup |
| 10-25 | Plan / spec / first failing tests (per method) |
| 25-85 | Core, API, UI with validation checkpoints |
| 85-105 | Validate, fix, write README |
| 105-120 | Demo and 5-minute talk |

## Q1 Method

| # | Method | Workflow | Checkpoints | Main risk |
| --- | --- | --- | --- | --- |
| 1 | **Minimalist** | One strong brief from `challenge/requirements.md`, then iterate: core -> API -> UI. No extra artifacts. | After core is green, after API is green | Drift, weak validation |
| 2 | **Skills-based** | Each phase is driven by a skill from `skills/`: plan-feature -> generate-tests -> implement-feature -> review-code -> validate-acceptance -> prepare-demo. | After each skill run | Skill overhead |
| 3 | **Multi-agent** | architect (plan, boundaries, file ownership) -> tester (failing tests) + developer (implementation) -> reviewer (independent check). Hand off explicitly, one owner per file. | After the plan, after each hand-off | Coordination cost |
| 4 | **Spec-driven** | Write `.hackathon/spec.md` and a task list first, then implement task by task against the spec, then review against it. | After the spec, after each task group | Over-specifying |
| 5 | **Hybrid** | A deliberate mix, named in advance in `.hackathon/method.md` (e.g. spec for the core, minimalist for the UI). | As named in the mix | Unattributable results |
| 6 | **Custom** | The team's own method, written down in five lines before the first line of code. | As defined by the team | Vague process |

Test-driven work is Q3 option 2. Context engineering is framework **f** (GSD).

## Q2 Autonomy

- **A Guided:** propose every major step (a task, a file group, a state-changing command) and wait for "go".
- **B Supervised autonomous (recommended):** proceed inside the approved plan. Stop at the method's
  checkpoints, when validation fails twice in a row, when an unplanned decision is needed, and before installing anything.
- **C Maximum:** plan, build, test and review alone. Stop only for blockers, destructive actions, scope
  conflicts with `challenge/constraints.md`, or critical decisions. Post a status line every ~10 minutes.

Never, in any mode: edit immutable files, ask the human to write code, or skip validation reporting.

## Q3 Validation

1. **Tests after implementation** - build first, then cover with tests.
2. **Test-driven development** - failing test first, every time.
3. **Continuous review and validation** - `npm run validate -- --quick` after each change, review each slice.
4. **Independent reviewer agent** - a separate reviewer agent checks the work against `challenge/acceptance-criteria.md`.

Defaults: Multi-agent -> 4, Spec-driven -> 3, otherwise 3.

## Q4 Framework

Built from `frameworks/catalog.yaml` (letters a-g). Everything is optional; **a** needs no install.

| | Framework | Suitable for | Risk | Setup |
| --- | --- | --- | --- | --- |
| a | Native Claude Code / Copilot | Minimalist, Multi-agent | low | 0 min |
| b | Matt Pocock Skills | Skills-based, Hybrid | low | 5 min |
| c | Superpowers | TDD, planning, review | medium | 5 min |
| d | OpenSpec | Lightweight spec-driven | low-medium | 5 min |
| e | GitHub Spec Kit | Structured SDD | medium | 8 min |
| f | GSD | Context engineering | medium | 5 min |
| g | BMAD Method | Full role-based delivery methodology | **high** | 10 min |

If an install fails for more than 10 minutes, fall back to **a** and note it in `.hackathon/method.md`.

## Orchestrator protocol

`/hackathon` follows these steps and writes no production code before step 6.

1. **Read** this file, `AGENTS.md`, `challenge/*.md` and `frameworks/catalog.yaml`.
2. **Check state:** `git status`, branch, `node -v` (>= 22.18), whether `node_modules` and
   `.hackathon/session.json` exist. If a session exists, offer resume or reconfigure and confirm before overwriting.
   Offer `npm install` if dependencies are missing.
3. **Explain the challenge** in at most 8 lines: mission, 120 minutes, acceptance criteria, the no-hand-coding rule.
4. **Ask Q1-Q4 in one block** exactly as printed in the command file, with the method, autonomy, validation
   and framework tables. Accept one combined answer (`Method: 3, Autonomy: B, Validation: 3, Framework: a`),
   a partial answer (fill the rest with the defaults and say so), or `recommend`.
5. **Show the resulting setup** - method, autonomy, validation, framework, agents, skills, first three tasks -
   and ask for one confirmation.
6. **Create the session:** `node scripts/initialize-hackathon.mjs --tool ... --method ... --autonomy ...
   --validation ... --framework ... [--agents ...] [--skills ...]`. Create branch `team/<name>` if on the
   default branch, after asking.
7. **Install the framework** if it is not **a**: show the command from the catalog, ask approval, run it,
   verify its first command.
8. **Start the workflow** for the chosen method at the chosen autonomy level, beginning with phase 1.

### Agents and skills per method

| Method | Agents (`.claude/agents/`, `.github/agents/`) | Skills (`skills/`) |
| --- | --- | --- |
| Minimalist | - | validate-acceptance |
| Skills-based | developer | all six |
| Multi-agent | architect, developer, tester, reviewer | plan-feature, validate-acceptance |
| Spec-driven | architect, developer, reviewer | plan-feature, implement-feature, review-code |
| Hybrid / Custom | as agreed | as agreed |

Validation 2 adds the tester agent; validation 4 adds the reviewer agent.

## Done

`challenge/definition-of-done.md`. Report honestly: if time runs out, state the percentage of acceptance
criteria met. Partial results with good learnings are a good outcome.
