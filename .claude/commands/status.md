---
description: Show hackathon status: time left, configuration, validation state, interventions
---

Read `.hackathon/session.json` (if missing: tell the team to run /hackathon). Compute minutes elapsed and remaining from `startedAt` (limit 120, use the real current time from `date -u`). Run `npm run validate -- --quick` and show scenarios passing /12. Count rows in `.hackathon/INTERVENTION_LOG.md`. Show: tool, method, framework, autonomy, current phase per `methods/<method>.md`, next recommended action, and a warning when under 30 minutes remain and the UI is not working. Keep it under 15 lines. Do not change any files.
