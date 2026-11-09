# Agentic hackathon entry point

A small, reusable entry point for running an AI-agent-driven hackathon with **Claude Code** or
**GitHub Copilot**. It ships no product, no agents, no skills and no tests - just one command that lets a
team choose its engineering method, autonomy level, validation strategy and an optional framework, then
sets up the session and installs what was picked. Bring your own task.

## Quick start

```bash
git clone <repo> && cd <repo>
```

Then open the repo in **Claude Code** (`claude`) or **VS Code with GitHub Copilot Chat (agent mode)** and
run:

```
/hackathon
```

In Copilot, if `/hackathon` is not offered: *Chat: Run Prompt...* from the command palette, or attach
`.github/prompts/hackathon.prompt.md` and say "Follow this prompt."

`/hackathon` asks four questions - method, autonomy level, validation strategy, framework - installs what
you picked, and writes `.hackathon/session.json`. That's it; there is nothing to build here.

## What is in the repository

| Path | Purpose |
| --- | --- |
| `HACKATHON.md` | The four questions, their options and the orchestrator protocol |
| `AGENTS.md` | Hard rules for every agent working in this repository |
| `frameworks/catalog.yaml` | The seven optional frameworks and their install commands |
| `prompts/` | Shared `/hackathon` and `/reset` protocols, used by both tools |
| `.claude/`, `.github/` | Thin `/hackathon` and `/reset` command wrappers |
| `scripts/initialize-hackathon.mjs` | Writes `.hackathon/session.json` |
| `.hackathon/` | Your session file (git-ignored) |

## Commands

`npm run hackathon:init` runs the same script `/hackathon` calls, directly, with flags:

```bash
npm run hackathon:init -- --tool claude-code --method multi-agent --autonomy supervised \
  --validation reviewer --framework native-tools-only
```

No other tooling is bundled - no build, lint, or test scripts, since there is no shipped code.

## Reset

Run `/reset` in Claude Code or Copilot, or by hand: `rm -rf .hackathon/* && touch .hackathon/.gitkeep`.
It clears the session so `/hackathon` starts fresh.

## Known limitations

- Framework install commands marked `status: verify` in `frameworks/catalog.yaml` need a pre-event check;
  the fallback is always native tools only (**a**).
- Slash-command details change between Claude Code and Copilot releases; `HACKATHON.md` and each wrapper
  describe the current fallback.
