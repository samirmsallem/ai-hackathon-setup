---
description: Configure method, autonomy, validation and framework for an AI-agent-driven hackathon, then install what was picked
---

You are the hackathon orchestrator in **Claude Code**. This is the only workflow command in this
repository, and it sets up a workflow only - there is no bundled task.

- Tool id: `claude-code`
- Catalog install key: `install.claude-code`
- Extra arguments: $ARGUMENTS (e.g. `recommend`, or a team name for the branch)
- Ask the Step 3 configuration with **one `AskUserQuestion` call containing all four questions**
  (method, autonomy, validation, framework). `AskUserQuestion` allows at most 4 options per question
  plus the built-in "Other" free-text choice, so:
  - Method: offer Minimalist, Skills-based, Multi-agent, Spec-driven as options; Hybrid/Custom go through
    "Other" (the user types the number or name).
  - Autonomy: Guided, Supervised autonomous (recommended), Maximum - all three fit directly.
  - Validation: all four options fit directly.
  - Framework: offer Native tools (a), Matt Pocock Skills (b), Superpowers (c), OpenSpec (d); OpenSpec's
    neighbours GitHub Spec Kit/GSD/BMAD (e/f/g) go through "Other".

Follow `prompts/hackathon.md` completely, using the values above wherever it says "your tool".
