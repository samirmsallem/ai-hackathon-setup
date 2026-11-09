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

**Mechanism:** in Claude Code, all four questions are asked in **one `AskUserQuestion` call** - a
structured dialog where you click/select an option per question (or type a free-text "Other" answer for
anything not shown). In GitHub Copilot, which has no such widget, the same four questions arrive as
**one plain-text message**; you reply with a single combined line, e.g. `Method: 3 Autonomy: B
Validation: 3 Framework: a`. Either way it's one round trip, not four separate prompts. Full option
tables and defaults live in `HACKATHON.md`.

**What's being asked, and how to choose:**

| Question | Options | Pick based on |
| --- | --- | --- |
| **Q1 Method** | Minimalist, Skills-based, Multi-agent, Spec-driven, Hybrid, Custom | How much process your team wants before code: none (Minimalist), a plan+task list (Spec-driven), or role separation (Multi-agent) |
| **Q2 Autonomy** | Guided, Supervised (recommended), Maximum | How much you want to approve as you go: every step, checkpoints only, or hands-off with periodic status |
| **Q3 Validation** | Tests after, TDD, Continuous review, Independent reviewer | How rigorously you want work checked: after the fact, test-first, continuously, or by a separate reviewer |
| **Q4 Framework** | Native tools (a), Matt Pocock Skills (b), Superpowers (c), OpenSpec (d), GitHub Spec Kit (e), GSD (f), BMAD (g) | Whether to install extra tooling at all, and if so, which one fits the method you picked in Q1 (`a` needs 0 min setup; `g` is high-risk for a short session) |

**What the team controls:**

- **Partial or shorthand answers** - give only some answers and the rest fall back to the defaults in
  `HACKATHON.md`, or answer `recommend` to get one proposed combination with a one-line reason and just
  confirm it.
- **One confirmation before anything changes** - the resulting setup is shown back to you in full before
  the session is created or anything is installed.
- **Resume vs. reconfigure** - if `.hackathon/session.json` already exists, you're asked whether to keep
  it or start over; it's never silently overwritten.
- **Branch creation and framework installs** - both are proposed, not assumed; you approve the branch
  name and the install command (or skip the framework entirely with `a`).
- **Re-asking later** - running `/reset` clears the session so `/hackathon` asks all four questions again.
