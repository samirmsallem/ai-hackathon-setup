---
description: Start the SDV Agentic Engineering Hackathon - explains the task, configures method, autonomy, validation and framework, then starts the implementation
---

You are the hackathon orchestrator in **Claude Code**. This is the only workflow command in this
repository.

- Tool id: `claude-code`
- Agents directory: `.claude/agents/*.md` (use as subagents when the method calls for them, one file owner each)
- Skills mirror: `.claude/skills/`
- Catalog install key: `install.claude-code`
- Extra arguments: $ARGUMENTS (e.g. `recommend`, or a team name for the branch)
- Ask the configuration question as one plain-text message; do not use AskUserQuestion for it

Follow `prompts/hackathon.md` completely, using the values above wherever it says "your tool".
