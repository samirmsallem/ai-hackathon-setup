# Shared /reset protocol

Used by both `.claude/commands/reset.md` (Claude Code) and `.github/prompts/reset.prompt.md` (GitHub
Copilot). A one-step utility, separate from the `/hackathon` workflow: it clears a stuck or finished
session so `/hackathon` can start fresh.

## Step 1 - Clear the session

Always safe to run, no confirmation needed - `.hackathon/` is git-ignored and holds nothing but the
current session's configuration:

```
rm -rf .hackathon/* && touch .hackathon/.gitkeep
```

## Step 2 - Report

Confirm the session is cleared and that `/hackathon` will ask its four questions again next time it
runs.
