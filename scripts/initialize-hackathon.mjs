// Creates .hackathon session files. Called by /hackathon after the team has chosen its configuration.
//   node scripts/initialize-hackathon.mjs --team "Team A" --tool claude-code --method spec-driven \
//     --framework openspec --autonomy supervised --validation continuous-reviewer --tracking suggested \
//     [--members "A,B,C"] [--agents architect,developer,tester,reviewer] [--skills plan-feature,generate-tests]
// Without flags in a terminal it asks interactively.
import fs from 'node:fs';
import readline from 'node:readline/promises';
import { p } from './lib.mjs';

const OPTIONS = {
  tool: ['claude-code', 'github-copilot'],
  method: ['minimalist', 'skills-based', 'multi-agent', 'spec-driven', 'test-driven', 'context-engineered', 'hybrid', 'custom'],
  autonomy: ['guided', 'supervised', 'maximum'],
  validation: ['after-implementation', 'tdd', 'continuous', 'reviewer', 'continuous-reviewer'],
  tracking: ['suggested', 'auto', 'manual'],
};
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith('--') ? [...acc, [a.slice(2), arr[i + 1]]] : acc), []),
);
const catalogIds = [...fs.readFileSync(p('frameworks/catalog.yaml'), 'utf8').matchAll(/^\s*-\s*id:\s*(\S+)/gm)].map((m) => m[1]);

if (!args.method && process.stdin.isTTY) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  args.team = await rl.question('Team name: ');
  for (const k of ['tool', 'method']) args[k] = await rl.question(`${k} (${OPTIONS[k].join('/')}): `);
  args.framework = await rl.question(`framework (${catalogIds.join('/')}): `);
  for (const k of ['autonomy', 'validation', 'tracking']) args[k] = (await rl.question(`${k} (${OPTIONS[k].join('/')}): `)) || undefined;
  rl.close();
}
const errors = [];
for (const [k, vals] of Object.entries(OPTIONS)) if (!vals.includes(args[k] ?? '')) errors.push(`--${k} must be one of: ${vals.join(', ')}`);
args.framework ??= 'native-tools-only';
if (!catalogIds.includes(args.framework)) errors.push(`--framework must be one of: ${catalogIds.join(', ')}`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

const now = new Date();
const session = {
  team: args.team ?? 'Unnamed team',
  members: (args.members ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  tool: args.tool, method: args.method, framework: args.framework, autonomy: args.autonomy,
  validation: args.validation, tracking: args.tracking,
  agents: (args.agents ?? '').split(',').filter(Boolean),
  skills: (args.skills ?? '').split(',').filter(Boolean),
  startedAt: now.toISOString(),
  deadline: new Date(now.getTime() + 120 * 60_000).toISOString(),
  methodChanges: [],
};
fs.mkdirSync(p('.hackathon'), { recursive: true });
fs.writeFileSync(p('.hackathon/session.json'), JSON.stringify(session, null, 2) + '\n');
const fill = (tpl) => fs.readFileSync(p('evaluation', tpl), 'utf8')
  .replaceAll('{{team}}', session.team).replaceAll('{{tool}}', session.tool).replaceAll('{{method}}', session.method)
  .replaceAll('{{framework}}', session.framework).replaceAll('{{autonomy}}', session.autonomy)
  .replaceAll('{{validation}}', session.validation).replaceAll('{{tracking}}', session.tracking).replaceAll('{{startedAt}}', session.startedAt);
for (const [tpl, out] of [['METHOD_LOG.template.md', 'METHOD_LOG.md'], ['INTERVENTION_LOG.template.md', 'INTERVENTION_LOG.md']])
  if (!fs.existsSync(p('.hackathon', out))) fs.writeFileSync(p('.hackathon', out), fill(tpl));
// Mirror repository skills where each tool discovers them (these copies are git-ignored).
for (const dest of ['.claude/skills', '.github/skills']) fs.cpSync(p('skills'), p(dest), { recursive: true });
console.log(`Session created for ${session.team}.\nDeadline: ${session.deadline}\nFiles: .hackathon/session.json, METHOD_LOG.md, INTERVENTION_LOG.md`);
