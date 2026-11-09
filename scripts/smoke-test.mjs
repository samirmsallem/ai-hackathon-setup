// Pre-hackathon smoke test. Facilitators run:  npm run smoke   (add --full for build/lint/test)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { conformance, loadScenarios, nodeVersionOk, p, readJson } from './lib.mjs';

const full = process.argv.includes('--full');
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` - ${detail}` : ''}`);
  if (!ok) failures++;
};
const run = (args) => spawnSync('npm', args, { cwd: p('.'), encoding: 'utf8', shell: process.platform === 'win32' });

check('Node >= 22.18', nodeVersionOk(), process.versions.node);
const required = ['README.md', 'HACKATHON.md', 'AGENTS.md', 'CLAUDE.md', '.claude/commands/hackathon.md', '.github/prompts/hackathon.prompt.md',
  '.github/copilot-instructions.md', 'frameworks/catalog.yaml', 'challenge/requirements.md', 'reference/expected-results.json',
  'templates/specification.md', 'evaluation/scorecard.md', 'scripts/initialize-hackathon.mjs'];
for (const f of required) check(`file ${f}`, fs.existsSync(p(f)));
const roles = ['architect', 'developer', 'tester', 'reviewer'];
const cmds = ['hackathon', 'validate', 'finish', 'status'];
check('Claude agents + commands complete', roles.every((r) => fs.existsSync(p(`.claude/agents/${r}.md`))) && cmds.every((c) => fs.existsSync(p(`.claude/commands/${c}.md`))));
check('Copilot agents + prompts complete', roles.every((r) => fs.existsSync(p(`.github/agents/${r}.agent.md`))) && cmds.every((c) => fs.existsSync(p(`.github/prompts/${c}.prompt.md`))));
check('six skills present', ['plan-feature', 'implement-feature', 'generate-tests', 'review-code', 'validate-acceptance', 'prepare-demo'].every((s) => fs.existsSync(p(`skills/${s}/SKILL.md`))));
const cat = fs.readFileSync(p('frameworks/catalog.yaml'), 'utf8');
check('framework catalog lists 8 entries', (cat.match(/^\s*-\s*id:/gm) ?? []).length >= 8);
let scen = [];
try { scen = loadScenarios(); check('12+ scenario files parse', scen.length >= 12, `${scen.length}`); } catch (e) { check('scenario files parse', false, e.message); }
const expected = readJson('reference', 'expected-results.json').scenarios;
check('every scenario has an expected result', scen.every((s) => expected[s.id]));

const ref = p('maintainers/reference-solution/src/core/evaluate.ts');
if (fs.existsSync(ref)) {
  const rows = await conformance(ref);
  check('maintainer reference solution passes all scenarios', rows.every((r) => r.ok), `${rows.filter((r) => r.ok).length}/${rows.length}`);
} else console.log('SKIP  maintainer reference solution not present (event package)');

const starter = await conformance();
const starterPassing = starter.filter((r) => r.ok).length;
console.log(`INFO  starter implementation passes ${starterPassing}/${starter.length} scenarios (0 expected before the hackathon)`);

if (full) {
  check('node_modules installed', fs.existsSync(p('node_modules')));
  for (const [label, args] of [['npm run build', ['run', 'build']], ['npm run lint', ['run', 'lint']], ['npm run test:harness', ['run', 'test:harness']]]) {
    const r = run(args);
    check(label, r.status === 0, r.status === 0 ? '' : (r.stdout + r.stderr).split('\n').slice(-6).join(' | '));
  }
}
console.log(failures === 0 ? '\nSmoke test PASSED' : `\nSmoke test FAILED (${failures})`);
process.exit(failures === 0 ? 0 : 1);
