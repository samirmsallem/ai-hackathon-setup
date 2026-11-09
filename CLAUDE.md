# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- `/hackathon` (`.claude/commands/hackathon.md`) asks method/autonomy/validation/framework with a single
  `AskUserQuestion` call (four questions), then creates the session and installs the chosen framework.
  `/reset` (`.claude/commands/reset.md`) clears the session.
- Both are thin wrappers around `prompts/*.md` - edit the shared prompt, not the wrapper, for any
  behaviour change.
- No subagents or skills ship by default. Only add them if the team's chosen method/framework needs them,
  and only after asking.
