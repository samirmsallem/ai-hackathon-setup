// Builds .hackathon/RESULTS.md from session, validation report and intervention log.
import fs from 'node:fs';
import { p } from './lib.mjs';

const read = (f) => (fs.existsSync(p('.hackathon', f)) ? fs.readFileSync(p('.hackathon', f), 'utf8') : null);
const session = JSON.parse(read('session.json') ?? 'null');
if (!session) { console.error('No session. Run /hackathon first.'); process.exit(1); }
const report = JSON.parse(read('validation-report.json') ?? 'null');
const log = read('INTERVENTION_LOG.md') ?? '';
// Intervention table rows: | # | time | type | description | reason | outcome |
const rows = log.split('\n').filter((l) => /^\|\s*\d+\s*\|/.test(l)).map((l) => l.split('|').map((c) => c.trim()));
const byType = {};
for (const r of rows) byType[r[3]] = (byType[r[3]] ?? 0) + 1;
const elapsed = Math.round((Date.now() - Date.parse(session.startedAt)) / 60000);
const conf = report?.conformance ?? [];
const md = `# Results - ${session.team}

| Item | Value |
| --- | --- |
| Tool | ${session.tool} |
| Method | ${session.method} |
| Framework | ${session.framework} |
| Autonomy | ${session.autonomy} |
| Validation strategy | ${session.validation} |
| Elapsed since start | ${elapsed} min (limit 120) |
| Method changes | ${session.methodChanges.length} |

## Validation
${report ? `Generated ${report.generatedAt}
- Scenarios passing: ${conf.filter((c) => c.ok).length}/${conf.length}
- Steps: ${report.steps.map((s) => `${s.name}=${s.ok ? 'ok' : 'FAIL'}`).join(', ') || 'quick mode (not run)'}
- Overall: ${report.passed ? 'PASSED' : 'NOT PASSED'}` : 'No validation report yet. Run npm run validate.'}

## Human interventions
Total: ${rows.length}
${Object.entries(byType).map(([k, v]) => `- ${k}: ${v}`).join('\n') || '- none logged'}

## Reflection (fill in with the agent's help)
- What worked well:
- What did not work:
- Would we choose this method again, and why:
`;
fs.writeFileSync(p('.hackathon/RESULTS.md'), md);
console.log('Wrote .hackathon/RESULTS.md');
