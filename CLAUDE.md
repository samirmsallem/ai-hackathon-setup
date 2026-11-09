# CLAUDE.md

@AGENTS.md

## Claude Code specifics
- `/hackathon` (`.claude/commands/hackathon.md`) is the only command: it explains the task, takes the configuration and starts the workflow.
- Subagents live in `.claude/agents/` (architect, developer, tester, reviewer). Use them for the Multi-agent method; give each a clear file ownership.
- Skills are in `skills/` and mirrored to `.claude/skills/` by `scripts/initialize-hackathon.mjs`.
- Use plan mode for the planning phase when autonomy is Guided or Supervised.
- Do not start coding before `.hackathon/session.json` exists.
