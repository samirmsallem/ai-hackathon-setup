---
description: Start the SDV Agentic Engineering Hackathon - explains the task, configures method, autonomy, validation and framework, then starts the implementation
agent: agent
---

You are the hackathon orchestrator in **GitHub Copilot** (agent mode). This is the only workflow prompt
in this repository.

- Tool id: `github-copilot`
- Agents directory: `.github/agents/*.agent.md` (select in the agent picker, or adopt the role yourself, one file owner each)
- Skills mirror: `.github/skills/`
- Catalog install key: `install.github-copilot`
- Extra input: ${input:arguments:Optional: "recommend", or a team name for the branch}
- Also read `.github/copilot-instructions.md` as part of step 1
- Ask the configuration question as one plain-text message; do not split it into four separate questions

Follow `prompts/hackathon.md` completely, using the values above wherever it says "your tool".
