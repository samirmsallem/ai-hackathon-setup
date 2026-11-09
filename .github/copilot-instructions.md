# Copilot instructions

Follow `AGENTS.md` (repository rules) and `HACKATHON.md` (workflow) in full.

- `/hackathon` (`.github/prompts/hackathon.prompt.md`) is the only workflow prompt; `/reset`
  (`.github/prompts/reset.prompt.md`) clears the session or restores the starter skeleton. Both wrap the
  shared protocols in `prompts/`, so instructions aren't duplicated between tools.
- Use **agent mode**. Custom agents are in `.github/agents/` (architect, developer, tester, reviewer); skills in `skills/` (mirrored to `.github/skills/` by the init script).
- Do not start coding before `.hackathon/session.json` exists.
- Humans do not hand-write code. Do not edit `challenge/`, `data/`, `reference/`, `tests/acceptance/`, `tests/harness/`.
- Run `npm run validate -- --quick` after each change and report real output.
