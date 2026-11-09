# Compatibility matrix

| Framework | Claude Code | GitHub Copilot (VS Code) | Prerequisites | Setup |
| --- | --- | --- | --- | --- |
| Native only | yes | yes | none | 0 min |
| Matt Pocock Skills | yes (plugin or `npx skills`) | yes (plugin from source) | Node | ~5 min |
| Superpowers | yes (plugin marketplace) | verify upstream | git | ~5 min |
| BMAD Method | yes | yes (installer option) | Node | ~10 min |
| GitHub Spec Kit | yes | yes | uv + Python | ~8 min |
| OpenSpec | yes | yes | Node | ~5 min |
| GSD | yes | verify upstream | Node | ~5 min |
| Custom | team checks | team checks | - | ~10 min |

## Compatibility check procedure (agent)
1. Does the framework list the selected tool in `catalog.yaml`? If not, say so and propose `native-tools-only` or another framework.
2. Are the prerequisites present (`node -v`, `git --version`, `uv --version`, `python3 --version`)?
3. Is network access available? (Installers download packages.)
4. Does it write into directories that the repo reserves? (`challenge/`, `data/`, `reference/`, `tests/acceptance/`, `.hackathon/`) If so, refuse or relocate.
5. Show the command, wait for approval, run it, then verify the framework's own first command works.

## Method fit
A framework is *recommended* for a method if the method id appears in its `fit` list. Others are allowed but flagged "unusual combination".
