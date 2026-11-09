// Team validation: acceptance conformance + lint + unit/acceptance tests + build.
// Writes .hackathon/validation-report.json.
//   npm run validate            -> everything
//   npm run validate -- --quick -> only scenario conformance (no npm needed, ~1s)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { conformance, p } from './lib.mjs';

const quick = process.argv.includes('--quick');
const report = { generatedAt: new Date().toISOString(), conformance: [], steps: [], passed: false };

const rows = await conformance().catch((e) => [{ id: 'load', ok: false, detail: String(e.message) }]);
report.conformance = rows;
console.log('Scenario conformance');
for (const r of rows) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.id}${r.detail ? `  (${r.detail})` : ''}`);

if (!quick) {
  for (const [name, args] of [['lint', ['run', 'lint']], ['test', ['run', 'test']], ['build', ['run', 'build']]]) {
    console.log(`\n> npm ${args.join(' ')}`);
    const r = spawnSync('npm', args, { cwd: p('.'), stdio: 'inherit', shell: process.platform === 'win32' });
    report.steps.push({ name, ok: r.status === 0 });
  }
}
report.passed = rows.every((r) => r.ok) && report.steps.every((s) => s.ok);
fs.mkdirSync(p('.hackathon'), { recursive: true });
fs.writeFileSync(p('.hackathon/validation-report.json'), JSON.stringify(report, null, 2));
console.log(`\nScenarios: ${rows.filter((r) => r.ok).length}/${rows.length}  ` +
  report.steps.map((s) => `${s.name}:${s.ok ? 'ok' : 'FAIL'}`).join('  '));
console.log(report.passed ? 'VALIDATION PASSED' : 'VALIDATION NOT PASSED');
process.exit(report.passed ? 0 : 1);
