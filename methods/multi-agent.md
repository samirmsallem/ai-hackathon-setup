# Multi-agent

**Idea:** Separate roles with separate contexts: architect, developer, tester, reviewer.

## Workflow
1. Architect writes `.hackathon/architecture.md` and task list.
2. Tester writes/extends tests from acceptance criteria.
3. Developer implements until tests pass.
4. Reviewer reviews and files findings.
5. Developer fixes; loop.

## Suggested agents / skills
Agents: architect, developer, tester, reviewer (`.claude/agents`, `.github/agents`). In Copilot, switch agent in the chat picker; in Claude Code, delegate to subagents.

## Checkpoints (for Supervised autonomy)
After architecture; after tests; after review.

## Watch out for
Agents overwriting each other's files. Assign file ownership: tester owns `tests/`, developer owns `src/`.

## Document in METHOD_LOG
What you changed from this recipe and why.
