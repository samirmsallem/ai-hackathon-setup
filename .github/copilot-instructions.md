# Copilot instructions

Follow `AGENTS.md` (repository rules) and `HACKATHON.md` (workflow) in full.

- `/hackathon` (`.github/prompts/hackathon.prompt.md`) is the only workflow prompt; `/reset`
  (`.github/prompts/reset.prompt.md`) clears the session. Both wrap the shared protocols in `prompts/`, so
  instructions aren't duplicated between tools.
- Use **agent mode**. No custom agents or skills ship by default - this repository sets up a workflow
  only, the team brings its own task.
- Ask the four configuration questions (method, autonomy, validation, framework) as one plain-text
  message, per `prompts/hackathon.md`.
