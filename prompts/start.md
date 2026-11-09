# Shared /start protocol

Used by both `.claude/commands/start.md` (Claude Code) and `.github/prompts/start.prompt.md` (GitHub
Copilot). `/start` is the natural follow-up to `/hackathon`: once a session is configured (and any
framework installed), it reports what's now available and proposes one concrete first move. It asks
nothing - no new configuration questions.

## Fixed brief

This hackathon's task is set: build a **demonstrable prototype in the SDV (Software-Defined Vehicle)
Accelerator context**, ready to show by the deadline in `.hackathon/session.json`. Treat this as the
task - don't ask the team what they're building before proposing a next step.

## Step 1 - Load the session

Read `.hackathon/session.json`. If it's missing, say so and suggest running `/hackathon` first, then
stop.

Show method, autonomy, validation, framework and deadline in one line each.

## Step 2 - Discover what's available

Name what's actually usable right now, not the catalog's generic description of it:

- Claude Code: scan `.claude/commands/`, `.claude/skills/`, `.claude/agents/` for anything beyond
  `hackathon`, `reset` and `start` themselves.
- Copilot: scan `.github/prompts/` for anything beyond `hackathon.prompt.md` and `start.prompt.md`.
- Cross-check against the session's `framework` field and its entry in `frameworks/catalog.yaml` so each
  new item can be attributed (e.g. "Superpowers added skills: brainstorming, writing-plans, ...").

If nothing beyond the native tool is installed (framework **a**), say so plainly.

## Step 3 - Propose one concrete next move

Pick exactly one recommendation toward the fixed brief above, based on the session's method and
framework - don't offer a menu:

- A brainstorming/planning skill or command is available -> offer to run it now, naming it, on the SDV
  Accelerator prototype.
- A spec/plan-writing command is available (OpenSpec, Spec Kit, GSD) -> offer to start the spec there.
- Multi-agent method -> offer to start with the planner role: define scope, boundaries and file
  ownership before any implementer agent starts.
- Framework **a** or nothing else fits -> offer to start planning directly with the tool's native
  capabilities, following the chosen method from `HACKATHON.md`.

## Step 4 - Confirm and proceed

Ask the team to confirm the proposed move (or redirect you) before taking any action. From here on,
follow the session's autonomy level for everything that follows.
