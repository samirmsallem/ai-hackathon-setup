# HACKATHON - SDV Agentic Engineering Hackathon

120 minutes. 3-4 teams of 2-3 people. Tools: Claude Code or GitHub Copilot. Same repository, requirements, data, acceptance criteria and time limit. Different methods.

**Research question:** Which AI engineering approach gets a team from a predefined SDV problem to a validated and extendable prototype most effectively?

## Your role
You prompt, review, decide and redirect (**Prompt -> Review -> Decide -> Redirect**). The AI writes code, tests, configuration and documentation. Log every significant intervention.

## Starting
| Tool | Start with | Notes |
| --- | --- | --- |
| Claude Code | `/hackathon` | Command from `.claude/commands/hackathon.md`. Run `claude` in the repo root. |
| GitHub Copilot (VS Code) | `/hackathon` in Copilot Chat (agent mode) | Prompt file `.github/prompts/hackathon.prompt.md`. If `/hackathon` is not listed: type `/` and choose "hackathon", or use *Chat: Run Prompt...* (command palette) and select it. Prompt files must be enabled (`chat.promptFiles`) in your VS Code build. |
| Other IDE with Copilot | Open the Copilot chat, attach `.github/prompts/hackathon.prompt.md` as context and write: "Follow this prompt." | Fallback with identical behaviour. |

Companion commands: `/status` (time left, state), `/validate` (run validation and report), `/finish` (wrap-up and presentation).

## Timeline (recommended)
| Min | Phase |
| --- | --- |
| 0-10 | Read challenge, `/hackathon` configuration and setup |
| 10-25 | Plan / spec / first failing tests (per method) |
| 25-85 | Build core, API, UI with validation checkpoints |
| 85-100 | Validate, fix, docs |
| 100-115 | `/finish`: results, presentation |
| 115-120 | Buffer |

## Orchestrator protocol (followed by /hackathon in both tools)
The agent MUST follow these steps in order and MUST NOT write production code before step 11.

1. **Read** this file, `AGENTS.md`, `challenge/*.md`, `methods/README.md`, `frameworks/catalog.yaml`, `frameworks/compatibility.md`.
2. **Detect the tool.** Claude Code if the slash command ran from `.claude/commands` or you are Claude Code; GitHub Copilot if you are Copilot Chat/agent. If unsure, ask the team.
3. **Check repository state:** `git status`, branch, whether `.hackathon/session.json` exists (if it does, offer: resume with `/status`, or reconfigure - confirm before overwriting), whether `node_modules` exists, `node -v` (>= 22.18). If dependencies are missing, offer to run `npm run setup` and wait for approval.
4. **Explain the challenge** in at most 8 lines: mission, 120 minutes, same acceptance criteria, how success is judged (`evaluation/scorecard.md`), the rule that humans do not hand-write code.
5. **Ask for team name and members** (one question).
6. **Q1 Method.** Present the 8 methods from `methods/README.md` (one line each).
7. **Q2 Framework.** Build options dynamically from `frameworks/catalog.yaml`, filtering to the detected tool; always include native-only, Matt Pocock Skills, Superpowers, BMAD, GitHub Spec Kit, OpenSpec, GSD, Custom. Mark entries as *recommended* if the chosen method is in `fit`; mark `status: verify` entries "install not verified - fallback available"; show `suitableFor`, `risk` and `timeCost` for each option as a table; give an explicit warning for `risk: high` (BMAD) and suggest its reduced path from `frameworks/bmad-method.md`.
8. **Q3 Autonomy.** A Guided / B Supervised autonomous (**recommended**) / C Maximum autonomy.
9. **Q4 Validation.** 1 Tests after implementation / 2 TDD / 3 Continuous validation / 4 Independent reviewer agent / 5 Continuous validation plus independent reviewer. Suggest a default consistent with the method (e.g. Test-driven -> 2, Multi-agent -> 5).
10. **Q5 Intervention tracking.** 1 Automatically suggested and confirmed (**recommended**: the agent cannot know every human decision without confirmation) / 2 Automatically logged by the agent / 3 Manually entered by the team.
    *Ask questions with the tool's structured question UI if available (Claude Code: AskUserQuestion; Copilot: question/confirmation UI), otherwise as numbered lists. Ask one question at a time, show the recommended option, accept a short answer ("3", "B", "default"). Total configuration time budget: 5 minutes. If the team says "recommend", propose a combination with a one-line reason and ask only for confirmation.*
11. **Derive agents and skills** from the method (see table below) and show a **summary**: tool, method, framework, agents, skills, autonomy, validation, tracking, expected artifacts, estimated time allocation.
12. **Ask for ONE final confirmation.** Only then continue.
13. **Create session files:** `node scripts/initialize-hackathon.mjs --team ... --tool claude-code|github-copilot --method ... --framework ... --autonomy guided|supervised|maximum --validation after-implementation|tdd|continuous|reviewer|continuous-reviewer --tracking suggested|auto|manual --agents ... --skills ...` (creates `.hackathon/session.json`, `METHOD_LOG.md`, `INTERVENTION_LOG.md`, mirrors skills). Create a git branch `team/<name>` if on the default branch (ask first).
14. **Install the framework** if selected: show the command from the catalog for this tool, ask approval, run, verify its first command; after 10 minutes of failure, offer fallback to native-only and log a METHOD_CHANGE.
15. **Start the workflow** per `methods/<method>.md`, with the autonomy rules below. First action is always: confirm the clock (`/status`) and start phase 1 of the method.

### Method defaults
| Method | Agents | Skills |
| --- | --- | --- |
| Minimalist | - | validate-acceptance |
| Skills-based | developer | all six |
| Multi-agent | architect, developer, tester, reviewer | plan-feature, validate-acceptance |
| Spec-driven | architect, developer, reviewer | plan-feature, implement-feature, review-code |
| Test-driven | tester, developer | generate-tests, implement-feature, validate-acceptance |
| Context-engineered | developer | plan-feature, implement-feature |
| Hybrid / Custom | as agreed | as agreed |
Validation 4 or 5 adds the reviewer agent; validation 2 adds the tester.

### Autonomy rules
- **Guided:** propose each major step (a task, a file group, a command that changes state) and wait for "go".
- **Supervised autonomous:** proceed within the approved plan; stop at checkpoints defined in `methods/<method>.md`, when validation fails twice in a row, when a decision is needed that is not in the plan, and before installing anything.
- **Maximum:** plan, implement, test, review alone; stop only for blockers, destructive actions, scope conflicts with `challenge/constraints.md`, or critical decisions. Post a status line every ~10 minutes.
In all modes: never edit immutable files, never ask the human to write code, never skip validation reporting.

### Intervention tracking rules
- Mode **suggested** (default): after a human instruction that changes direction, scope, or accepts/rejects work, say "Log this? `<TYPE>: <description>`" and append to `.hackathon/INTERVENTION_LOG.md` on yes or edit.
- Mode **auto**: append immediately and show a one-line notice; the team may correct later.
- Mode **manual**: remind at checkpoints; do not write entries.
- Method changes always go to both logs and `session.json.methodChanges`.

## Rules recap
1. Same requirements, data, acceptance criteria for everyone.
2. Humans: prompt, review, decide, redirect. No hand-written code, tests, config or docs.
3. Immutable: `challenge/`, `data/`, `reference/`, `tests/acceptance/`, `tests/harness/`.
4. Log interventions and method changes.
5. Finish with `/finish`.

## Facilitator checklist
See `README.md` section "Facilitator guide" and run `npm run smoke -- --full` a day before. Remove `maintainers/` with `npm run event:prepare -- --yes` on the participant branch.
