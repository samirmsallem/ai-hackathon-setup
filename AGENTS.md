# AGENTS.md - rules for every AI agent in this repository

This repository is a minimal entry point for running an AI-agent-driven, time-boxed hackathon with
**Claude Code** or **GitHub Copilot**. It ships no product, no agents, no skills and no tests. `/hackathon`
asks the team to choose an engineering method, autonomy level, validation strategy and optional
framework, writes `.hackathon/session.json`, and installs the chosen framework. `/reset` clears that
session. See `HACKATHON.md` for the full protocol.

## Commands

`node scripts/initialize-hackathon.mjs` (invoked by `/hackathon`, not normally run directly).

## Hard rules

1. `/hackathon` and `/reset` are the only workflow entry points. Don't add new commands, agents, skills
   or a bundled task unless explicitly asked.
2. `prompts/hackathon.md` and `prompts/reset.md` are the single source of truth; `.claude/` and `.github/`
   stay thin wrappers. Edit the shared prompt, not the wrapper, for any behaviour change.
3. `frameworks/catalog.yaml` is the only place framework install commands live.
4. Ask before installing anything (framework installs, packages, a team branch).
5. Keep answers short; surface blockers early.

## Layout

`prompts/` shared command protocols | `frameworks/catalog.yaml` the seven optional frameworks |
`scripts/initialize-hackathon.mjs` writes the session | `.claude/`, `.github/` thin command wrappers |
`.hackathon/` session artifact (git-ignored).
