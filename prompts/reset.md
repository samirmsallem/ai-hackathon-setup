# Shared /reset protocol

Used by both `.claude/commands/reset.md` (Claude Code) and `.github/prompts/reset.prompt.md` (GitHub
Copilot). A small utility, separate from the `/hackathon` workflow - use it to clear a stuck session or
to start the implementation over.

## Step 1 - Ask what to reset

Two independent things can be reset; ask which one (default: session only), unless the extra
argument/input your wrapper passed already says `session` or `code`:

1. **Session only** - clears `.hackathon/` (git-ignored: method, autonomy, deadline, reports). No work is
   lost.
2. **Starter code too** - additionally discards all uncommitted changes in `src/` and `tests/` and
   restores the original skeleton. **Destructive and irreversible for anything not committed.**

## Step 2 - Session reset

Always safe to run once asked:

```
rm -rf .hackathon/* && touch .hackathon/.gitkeep
```

Report that the session is cleared and that `/hackathon` will start fresh next time.

## Step 3 - Starter code reset (only with explicit confirmation)

Only if the team chose option 2:

1. Run `git status --short -- src tests` and show exactly what would be discarded.
2. If anything uncommitted looks worth keeping, stop and suggest committing it first.
3. Ask for one explicit yes that names the consequence, e.g. "this deletes uncommitted work in `src/`
   and `tests/` - proceed?". Do not run the next command without that yes.

Only after the yes:

```
git restore src tests && git clean -fd src tests
```

Confirm the skeleton is back (`npm run build` should still pass) and report what was removed.
