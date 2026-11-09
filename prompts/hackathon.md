# Shared /hackathon protocol

Used by both `.claude/commands/hackathon.md` (Claude Code) and `.github/prompts/hackathon.prompt.md`
(GitHub Copilot) so the two tools don't duplicate the same instructions. The wrapper that sent you here
already told you: your tool id, the catalog's install key for your tool, how to ask the configuration
question, and the extra argument/input the team passed (if any). Use those wherever this file says "your
tool" or "your install key".

This repository ships no product. `/hackathon` only sets up the engineering workflow; the team brings its
own task.

## Step 1 - Read

`HACKATHON.md`, `AGENTS.md`, `frameworks/catalog.yaml`, plus anything your wrapper named.

## Step 2 - Check the repository

Run `git status`, `node -v` (needs >= 22.18) and check whether `.hackathon/session.json` already exists.
If a session exists, show its configuration and ask whether to resume or reconfigure; never overwrite
without a yes.

## Step 3 - Ask for the configuration

Ask exactly four questions - method (Q1), autonomy (Q2), validation (Q3), framework (Q4) - using the
tables in `HACKATHON.md`, in the way your wrapper specifies (a single structured question tool, or one
plain-text block). Whichever mechanism:

- Accept a combined answer, a partial answer (fill the rest with the defaults from `HACKATHON.md` and say
  so), or `recommend` (propose one combination with a one-line reason and ask only for confirmation).
- Once the method is known, mark the framework that fits it (`fit` in `frameworks/catalog.yaml`) as
  recommended, and warn explicitly about **g (BMAD, high risk)** - it only works with the reduced path
  from the catalog's `warning` field. Mention that `status: verify` entries were not install-verified and
  fall back to **a** if they fail.
- Budget 5 minutes for this step.

## Step 4 - Confirm once

Show the resulting setup in at most 8 lines: method, autonomy, validation, framework, and a one-line note
on what each implies. Ask for **one** confirmation before changing anything.

## Step 5 - Create the session

```
node scripts/initialize-hackathon.mjs --tool <your tool id> \
  --method <minimalist|skills-based|multi-agent|spec-driven|hybrid|custom> \
  --autonomy <guided|supervised|maximum> --validation <after-implementation|tdd|continuous|reviewer> \
  --framework <id from the catalog>
```

This writes `.hackathon/session.json`. If the repository is on its default branch, offer to create
`team/<name>` first (ask for the name).

## Step 6 - Install the framework

Only if the choice is not **a**: show the command at your install key in `frameworks/catalog.yaml`, ask
for approval, run it, then verify its first command works. After 10 minutes of failure, fall back to **a**
and say so.

If it installed anything, mention that your tool may need a **restart or reload** (new terminal/session
in Claude Code, reload window in VS Code/Copilot) before new slash commands, skills or agents show up -
say so plainly rather than assuming they're live immediately.

## Step 7 - Hand off

State the deadline from `.hackathon/session.json` and summarize the chosen method/autonomy/validation in
one line each. There is no bundled task to start building beyond this hackathon's own brief - a
demonstrable prototype in the SDV Accelerator context - so point the team to `/start`: it reports what's
now installed and proposes one concrete first move toward that prototype, without asking anything new.
Offer to run `/start` yourself now, or tell the team to run it after a restart/reload if one is pending.
