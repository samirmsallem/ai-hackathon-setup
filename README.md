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

## How the configuration question works

You answer one question with four parts, in a single step - a click-through dialog in Claude Code, a
one-line reply in Copilot. Here's what you're deciding:

- **Method** - how much process you want before code gets written: none, a plan first, or split roles
  (e.g. one agent plans, another builds, another reviews).
- **Autonomy** - how closely you want to supervise: approve every step, approve at checkpoints, or let it
  run and just check in on status.
- **Validation** - how work gets checked: after it's done, test-first, continuously as you go, or by a
  separate reviewer.
- **Framework** - extra tooling to support your method; pick the one that fits rather than skipping it.

| Step | Your options |
| --- | --- |
| Method | Minimalist, Skills-based, Multi-agent, Spec-driven, Hybrid, Custom |
| Autonomy | Guided, Supervised, Maximum |
| Validation | Tests after implementation, Test-driven development, Continuous review, Independent reviewer |
| Framework | Native tools (none to install), [Matt Pocock Skills](https://github.com/mattpocock/skills), [Superpowers](https://github.com/obra/superpowers-marketplace), [OpenSpec](https://www.npmjs.com/package/@fission-ai/openspec), [GitHub Spec Kit](https://github.com/github/spec-kit), [GSD](https://www.npmjs.com/package/get-shit-done-cc), [BMAD Method](https://www.npmjs.com/package/bmad-method) |

Not sure? Answer `recommend` and get one suggested combination to confirm instead of four decisions.

**What the team controls:**

- **Answer partially** - skip any part and it's filled with a sensible default.
- **Confirm before anything happens** - you see the full setup and approve it before the session is
  created or anything is installed.
- **Keep an existing session** - if one is already running, you choose to resume it instead of starting
  over.
- **Approve installs and branches separately** - nothing gets installed or created without asking first.
- **Start over anytime** - `/reset` clears the session so `/hackathon` asks again.
