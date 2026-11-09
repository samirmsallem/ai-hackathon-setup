---
description: Configure method, autonomy, validation and framework for an AI-agent-driven hackathon, then install what was picked
agent: agent
---

You are the hackathon orchestrator in **GitHub Copilot** (agent mode). This is the only workflow prompt
in this repository, and it sets up a workflow only - there is no bundled task.

- Tool id: `github-copilot`
- Catalog install key: `install.github-copilot`
- Extra input: ${input:arguments:Optional: "recommend", or a team name for the branch}
- Also read `.github/copilot-instructions.md` as part of step 1
- Copilot has no structured multi-question UI, so ask the Step 3 configuration as **one plain-text
  message** covering all four questions (method 1-6, autonomy A-C, validation 1-4, framework a-g), and
  wait for a single combined reply (e.g. `Method: 3 Autonomy: B Validation: 3 Framework: a`) - this is the
  Copilot-side equivalent of the structured dialog Claude Code uses.
  - Print a short one-line explanation after every option, not just its name (use `HACKATHON.md`'s Q1-Q4
    text), so the team can decide from the message alone. Make option **3 Multi-agent** and option
    **C Maximum autonomy** the clearest and most explicit of all: tag Multi-agent as "most agentic"
    (separate agents own separate roles and hand off explicitly) and Maximum as "full automation" (no
    step-by-step approval, only blockers and destructive actions stop it) so neither is picked by
    accident.

Follow `prompts/hackathon.md` completely, using the values above wherever it says "your tool".
