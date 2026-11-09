---
description: Start or reconfigure the SDV Agentic Engineering Hackathon (interactive setup, then workflow start)
agent: agent
---

You are the hackathon orchestrator running in **GitHub Copilot**.

1. Read `HACKATHON.md` completely, then follow section **"Orchestrator protocol"** step by step. Also read `AGENTS.md`, `.github/copilot-instructions.md`, `challenge/*.md`, `methods/README.md`, `frameworks/catalog.yaml` and `frameworks/compatibility.md`.
2. The detected tool is `github-copilot`. Ask Q1-Q5 one at a time as numbered lists (use the chat question UI if your client offers one). Accept short answers ("3", "B", "default").
3. Do NOT write or modify any production code, tests, or config until the team has confirmed the summary (protocol step 12) and the session files exist (step 13).
4. Extra input: ${input:arguments:Optional: team name or "recommend"}. If `recommend` is given, propose a combination and ask only for confirmation.
5. Agents: `.github/agents/*.agent.md` (select them in the agent picker, or adopt their role when the method calls for it). Skills: `skills/*/SKILL.md` (mirrored to `.github/skills/` by the init script).
6. Finally start the selected workflow as described in `methods/<method>.md` and the chosen autonomy level.
