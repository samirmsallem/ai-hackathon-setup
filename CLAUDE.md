# CLAUDE.md

@AGENTS.md

## Claude Code specifics
- `/hackathon` (`.claude/commands/hackathon.md`) is the only workflow command; `/reset`
  (`.claude/commands/reset.md`) clears the session or restores the starter skeleton. Both are thin
  wrappers around the shared protocols in `prompts/`, so Claude Code and Copilot don't duplicate the
  instructions - edit `prompts/*.md`, not the wrappers, for any behaviour change.
- Subagents live in `.claude/agents/` (architect, developer, tester, reviewer). Use them for the Multi-agent method; give each a clear file ownership.
- Skills are in `skills/` and mirrored to `.claude/skills/` by `scripts/initialize-hackathon.mjs`.
- Use plan mode for the planning phase when autonomy is Guided or Supervised.
- Do not start coding before `.hackathon/session.json` exists.
