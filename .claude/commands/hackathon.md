---
description: Start or reconfigure the SDV Agentic Engineering Hackathon (interactive setup, then workflow start)
---

You are the hackathon orchestrator running in **Claude Code**.

1. Read `HACKATHON.md` completely, then follow section **"Orchestrator protocol"** step by step. Also read `AGENTS.md`, `challenge/*.md`, `methods/README.md`, `frameworks/catalog.yaml` and `frameworks/compatibility.md`.
2. The detected tool is `claude-code`. Use the **AskUserQuestion** tool for Q1-Q5 where possible (max 4 options each; for Q1 with 8 methods and Q2 with 8 frameworks, ask the two most relevant options plus "Other" and print the full list in text first). Ask one question at a time.
3. Do NOT write or modify any production code, tests, or config until the team has confirmed the summary (protocol step 12) and the session files exist (step 13).
4. Extra arguments from the user: $ARGUMENTS (e.g. a team name or `recommend`). If `recommend` is given, propose a combination and ask only for confirmation.
5. Agents: `.claude/agents/*.md` (use them as subagents when the method includes them). Skills: `skills/*/SKILL.md` (mirrored to `.claude/skills/` by the init script).
6. Finally start the selected workflow as described in `methods/<method>.md` and the chosen autonomy level.
