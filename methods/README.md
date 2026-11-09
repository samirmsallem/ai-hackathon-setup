# Engineering methods

Pick one base method. You may switch during the experiment; log every switch in `.hackathon/METHOD_LOG.md`.

| # | Method | Core idea | Typical first 15 min | Main risk |
| --- | --- | --- | --- | --- |
| 1 | [Minimalist](minimalist.md) | One strong prompt, iterate on output | Brief the agent, start building | Drift, weak validation |
| 2 | [Skills-based](skills-based.md) | Reusable skills drive each phase | Load skills, run plan skill | Skill overhead |
| 3 | [Multi-agent](multi-agent.md) | Architect, developer, tester, reviewer roles | Define roles and hand-offs | Coordination cost |
| 4 | [Spec-driven](spec-driven.md) | Specification first, code second | Write spec and tasks | Over-specifying |
| 5 | [Test-driven](test-driven.md) | Failing tests first | Run acceptance tests, pick first red | Test churn |
| 6 | [Context-engineered](context-engineered.md) | Curate context, small windows, notes | Write context files, split work | Context bookkeeping |
| 7 | [Hybrid](hybrid.md) | Deliberate mix, named in advance | Write down the mix | Unattributable results |
| 8 | [Custom](custom.md) | Your own method | Describe it in 5 lines | Vague process |

Recommended combinations are in `frameworks/selection-guide.md`.
