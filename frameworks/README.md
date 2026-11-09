# Frameworks

A framework is optional. The comparison is about *method*, so `native-tools-only` is a fully valid choice.

Files: `catalog.yaml` (source of truth, read by `/hackathon`), `compatibility.md`, `selection-guide.md`, one page per framework.

## Rules for installing a framework
1. The agent checks `compatibility.md` and the catalog entry for the selected tool.
2. The agent shows the exact install command and **asks the team before running it** (it changes the repository or user config).
3. Setup counts against the 120 minutes. If installation is not working after **10 minutes**, stop and fall back to `native-tools-only`; log it as a method change.
4. Frameworks must not delete or rewrite `challenge/`, `data/`, `reference/`, `tests/acceptance/`.

## Facilitator pre-event check (do this one week before)
For every framework you want to offer: install it in a scratch clone with both tools, run its first command, and set `status: confirmed` plus a date in `catalog.yaml`. Entries marked `verify` were not checked against upstream when this repository was authored (no network access at authoring time).
Consider pre-installing frameworks on the event laptops; the workshop network may block `npx`/`uvx` downloads.
