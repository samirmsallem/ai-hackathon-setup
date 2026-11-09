# Hackathon entry point

A minimal, reusable `/hackathon` command for running an AI-agent-driven, time-boxed hackathon with
**Claude Code** or **GitHub Copilot**. It ships no product, no agents, no skills and no tests - teams
bring their own task. All it does: explain the two commands, ask four configuration questions, write
`.hackathon/session.json`, and install the chosen optional framework.

## Start

| Tool | Command |
| --- | --- |
| Claude Code | `/hackathon` (run `claude` in the repo root) |
| GitHub Copilot | `/hackathon` in Copilot Chat, agent mode. If it is not offered: *Chat: Run Prompt...* from the command palette, or attach `.github/prompts/hackathon.prompt.md` and say "Follow this prompt." |

`/hackathon` is the only workflow command: it asks the four questions below, writes the session file and
installs the chosen framework. `/reset` is a one-step utility that clears `.hackathon/` so `/hackathon`
can start over. Both are thin wrappers around the shared protocols in `prompts/`.

## Your role

**Prompt -> Review -> Decide -> Redirect.** Whatever the team builds after this setup, the agent writes
the code, tests, configuration and docs; the humans prompt, review, decide and redirect.

## Q1 Method

| # | Method | Workflow | Main risk |
| --- | --- | --- | --- |
| 1 | **Minimalist** | One strong brief, then iterate. No extra artifacts. | Drift, weak validation |
| 2 | **Skills-based** | A reusable skill (your own, or from framework **b**) drives each phase. | Skill overhead |
| 3 | **Multi-agent (most agentic)** | Separate agents own separate roles with no shared context: a planner agent defines boundaries and file ownership, implementer agents build, a reviewer agent checks independently - they hand off explicitly instead of one agent doing everything. | Coordination cost |
| 4 | **Spec-driven** | Write a spec and task list first, then implement task by task against it. | Over-specifying |
| 5 | **Hybrid** | A deliberate mix, named up front (e.g. spec for the core, minimalist for the UI). | Unattributable results |
| 6 | **Custom** | The team's own method, written down in five lines before the first line of code. | Vague process |

Test-driven work is Q3 option 2. Context engineering is framework **f** (GSD).

## Q2 Autonomy

- **A Guided:** propose every major step (a task, a file group, a state-changing command) and wait for "go".
- **B Supervised autonomous (recommended):** proceed inside the approved plan. Stop at the method's
  checkpoints, when validation fails twice in a row, or when an unplanned decision is needed, and before
  installing anything.
- **C Maximum (full automation):** plan, build, test and review alone, with no step-by-step approval -
  the closest thing here to a fully autonomous agent. Stop only for blockers, destructive actions, scope
  conflicts with the team's own brief, or critical decisions. Post a status line every ~10 minutes.

Never, in any mode: ask the human to write code, or skip validation reporting.

## Q3 Validation

1. **Tests after implementation** - build first, then cover with tests.
2. **Test-driven development** - failing test first, every time.
3. **Continuous review and validation** - validate after each change, review each slice.
4. **Independent reviewer agent** - a separate reviewer agent checks the work against the team's own
   acceptance criteria.

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

If an install fails for more than 10 minutes, fall back to **a** and say so.

## Orchestrator protocol

`/hackathon` follows these steps and never invents a bundled task.

1. **Read** this file, `AGENTS.md` and `frameworks/catalog.yaml`.
2. **Check state:** `git status`, branch, `node -v` (>= 22.18), whether `.hackathon/session.json` already
   exists. If a session exists, show its configuration and ask whether to resume or reconfigure - never
   overwrite without a yes.
3. **Ask Q1-Q4** in one go (see each tool's wrapper for the exact mechanism). Accept a combined answer, a
   partial answer (fill the rest with the defaults above and say so), or `recommend` (propose one
   combination with a one-line reason and ask only for confirmation).
4. **Show the resulting setup** - method, autonomy, validation, framework, and a one-line note on what
   each implies - and ask for one confirmation.
5. **Create the session:** `node scripts/initialize-hackathon.mjs --tool ... --method ... --autonomy ...
   --validation ... --framework ...`. Offer to create branch `team/<name>` if on the default branch, after
   asking.
6. **Install the framework** if it is not **a**: show the command from the catalog, ask approval, run it,
   verify its first command works.
7. **Hand off:** state the deadline from `.hackathon/session.json`, remind the team which method/autonomy/
   validation now governs the work, and that the task itself is theirs to bring - this repository stops
   here.

## Done

Report honestly on what was configured and installed. There is no bundled definition of done - that
belongs to whatever task the team brought.
