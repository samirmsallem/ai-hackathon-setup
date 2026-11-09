# Shared /hackathon protocol

Used by both `.claude/commands/hackathon.md` (Claude Code) and `.github/prompts/hackathon.prompt.md`
(GitHub Copilot) so the two tools don't duplicate the same instructions. The wrapper that sent you here
already told you: your tool id, your agents directory, your skills mirror directory, the catalog's
install key for your tool, and the extra argument/input the team passed (if any). Use those wherever this
file says "your tool", "your agents directory", "your skills mirror" or "your install key".

## Step 1 - Read

`HACKATHON.md`, `AGENTS.md`, `challenge/mission.md`, `challenge/requirements.md`,
`challenge/acceptance-criteria.md`, `challenge/constraints.md`, `challenge/definition-of-done.md`,
`frameworks/catalog.yaml`, plus anything your wrapper named. Then follow the **Orchestrator protocol** in
`HACKATHON.md`.

## Step 2 - Check the repository

Run `git status`, `node -v` (needs >= 22.18) and check whether `node_modules/` and
`.hackathon/session.json` exist. If a session already exists, show its configuration and ask whether to
resume or reconfigure; never overwrite without a yes. If dependencies are missing, offer `npm install`
and wait for approval.

## Step 3 - Explain the challenge

Maximum 8 lines, in the team's language: the mission from `challenge/mission.md`, the 120 minutes, the 12
telemetry scenarios that must evaluate correctly, core + API + UI, that `npm run validate` is currently red
and turning it green is the job, that thresholds come only from `reference/validation-rules.json`, that
`challenge/`, `data/`, `reference/`, `tests/acceptance/` and `tests/harness/` are immutable, and that the
humans prompt, review, decide and redirect but never hand-write code.

## Step 4 - Ask for the configuration

Print this block as plain text, **as one message**, and then wait for a single reply, exactly as your
wrapper told you to ask it (no multi-step question UI here - the point is one combined answer).

```
Welcome to the SDV Agentic Engineering Hackathon.

You have 120 minutes to build an SDV Vehicle Diagnostics Assistant.

Choose your engineering method:

1. Minimalist          - one strong brief, then iterate
2. Skills-based        - a skill from skills/ drives each phase
3. Multi-agent         - architect, developer, tester, reviewer
4. Spec-driven         - specification and task list first
5. Hybrid              - a named mix, decided up front
6. Custom              - your own method, written down in five lines

Choose your desired autonomy level:

A. Guided                - I propose every major step and wait for "go"
B. Supervised autonomous - I work inside the approved plan and stop at checkpoints  (recommended)
C. Maximum autonomy      - I plan, build, test and review alone; status line every ~10 min

Choose your validation strategy:

1. Tests after implementation
2. Test-driven development
3. Continuous review and validation
4. Independent reviewer agent

Choose your framework (all optional, "a" needs no installation):

    Framework                      Suitable for                      Risk    Setup
a   Native Claude Code / Copilot   Minimalist, Multi-agent           low     0 min
b   Matt Pocock Skills             Skills-based, Hybrid              low     5 min
c   Superpowers                    TDD, planning, review             medium  5 min
d   OpenSpec                       Lightweight spec-driven           low-med 5 min
e   GitHub Spec Kit                Structured SDD                    medium  8 min
f   GSD                            Context engineering               medium  5 min
g   BMAD Method                    Full role-based delivery          HIGH    10 min

Please reply with your configuration, for example:

Method: 3
Autonomy: B
Validation: 3
Framework: a
```

Rules for this step:

- Mark the framework that fits the chosen method (`fit` in `frameworks/catalog.yaml`) as recommended once
  the method is known, and warn explicitly about **g (BMAD, high risk)** - it only works with the reduced
  path from the catalog's `warning` field. Mention that `status: verify` entries were not install-verified
  and fall back to **a**.
- Accept short answers (`3 B 3 a`), partial answers (fill the gaps with the defaults from `HACKATHON.md`
  and say which ones you filled), and `recommend` (propose one combination with a one-line reason and ask
  only for confirmation).
- Budget for configuration: 5 minutes. Do not ask for a team name, members or intervention tracking.

## Step 5 - Confirm once

Show the resulting setup in at most 12 lines: method, autonomy, validation, framework, the agents and
skills from the table in `HACKATHON.md`, the first three tasks and the rough time allocation. Ask for
**one** confirmation. Do not write production code before you have it.

## Step 6 - Create the session

```
node scripts/initialize-hackathon.mjs --tool <your tool id> --method <minimalist|skills-based|multi-agent|spec-driven|hybrid|custom> \
  --autonomy <guided|supervised|maximum> --validation <after-implementation|tdd|continuous|reviewer> \
  --framework <id from the catalog> [--agents a,b] [--skills a,b]
```

This writes `.hackathon/session.json` and mirrors `skills/` into your skills mirror directory. If the
repository is on the default branch, offer to create `team/<name>` first.

## Step 7 - Install the framework

Only if the choice is not **a**: show the command at your install key in the catalog, ask for approval,
run it, then verify its first command works. After 10 minutes of failure, fall back to **a** and note the
change in `.hackathon/method.md`.

## Step 8 - Start building

Run the workflow for the chosen method from the Q1 table in `HACKATHON.md` at the chosen autonomy level,
starting with phase 1. State the deadline from `session.json` once, then begin. Use your agents directory
as subagents when the method includes them, with one file owner each. Run `npm run validate -- --quick`
at every checkpoint and report the real output.
