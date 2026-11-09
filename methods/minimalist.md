# Minimalist

**Idea:** Give the agent the challenge and a small set of rules, then iterate. Least process, most reliance on the model.

## Workflow
1. Point the agent at `challenge/` and `AGENTS.md`.
2. Ask for a short plan (max 10 lines) and approve it.
3. Ask for core, then API, then UI, running `npm run validate` after each.
4. Redirect on failures; ask for the final docs.

## Suggested agents / skills
Single agent. Optional: `validate-acceptance` skill.

## Checkpoints (for Supervised autonomy)
After plan; after core passes; before docs.

## Watch out for
Skipping validation until the end. Run `npm run validate -- --quick` after every step.

## Document in METHOD_LOG
What you changed from this recipe and why.
