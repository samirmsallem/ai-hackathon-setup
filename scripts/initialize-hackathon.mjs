// Creates .hackathon/session.json. Called by /hackathon after the team has chosen its configuration.
//   node scripts/initialize-hackathon.mjs --tool claude-code --method spec-driven \
//     --autonomy supervised --validation continuous --framework openspec
// Without flags in a terminal it asks interactively.
import fs from 'node:fs';
import readline from 'node:readline/promises';
import { p } from './lib.mjs';

const OPTIONS = {
  tool: ['claude-code', 'github-copilot'],
  method: ['minimalist', 'skills-based', 'multi-agent', 'spec-driven', 'hybrid', 'custom'],
  autonomy: ['guided', 'supervised', 'maximum'],
  validation: ['after-implementation', 'tdd', 'continuous', 'reviewer'],
};
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith('--') ? [...acc, [a.slice(2), arr[i + 1]]] : acc), []),
);
const catalogIds = [...fs.readFileSync(p('frameworks/catalog.yaml'), 'utf8').matchAll(/^\s*-\s*id:\s*(\S+)/gm)].map((m) => m[1]);

if (!args.method && process.stdin.isTTY) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  for (const k of Object.keys(OPTIONS)) args[k] = await rl.question(`${k} (${OPTIONS[k].join('/')}): `);
  args.framework = await rl.question(`framework (${catalogIds.join('/')}): `);
  rl.close();
}
const errors = [];
for (const [k, vals] of Object.entries(OPTIONS)) if (!vals.includes(args[k] ?? '')) errors.push(`--${k} must be one of: ${vals.join(', ')}`);
args.framework ||= 'native-tools-only';
if (!catalogIds.includes(args.framework)) errors.push(`--framework must be one of: ${catalogIds.join(', ')}`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

const now = new Date();
const session = {
  tool: args.tool, method: args.method, framework: args.framework,
  autonomy: args.autonomy, validation: args.validation,
  startedAt: now.toISOString(),
  deadline: new Date(now.getTime() + 120 * 60_000).toISOString(),
};
fs.mkdirSync(p('.hackathon'), { recursive: true });
fs.writeFileSync(p('.hackathon/session.json'), JSON.stringify(session, null, 2) + '\n');
console.log(
  `Session created: ${session.method} / ${session.autonomy} / ${session.validation} / ${session.framework}\n` +
    `Deadline: ${session.deadline}\nFile: .hackathon/session.json`,
);
