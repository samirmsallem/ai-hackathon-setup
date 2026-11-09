# Copilot instructions

Follow `AGENTS.md` (repository rules) and `HACKATHON.md` (workflow) in full.

- Start with the `/hackathon` prompt (`.github/prompts/hackathon.prompt.md`). Companion prompts: `/status`, `/validate`, `/finish`.
- Use **agent mode**. Custom agents are in `.github/agents/` (architect, developer, tester, reviewer); skills in `skills/` (mirrored to `.github/skills/` by the init script).
- Do not start coding before `.hackathon/session.json` exists.
- Humans do not hand-write code. Do not edit `challenge/`, `data/`, `reference/`, `tests/acceptance/`, `tests/harness/`.
- Run `npm run validate -- --quick` after each change and report real output.
