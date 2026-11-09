// Clears the hackathon session (.hackathon/*). Use --yes to skip the prompt. Never touches src/, tests/ or data/.
import fs from 'node:fs';
import readline from 'node:readline/promises';
import { p } from './lib.mjs';

const dir = p('.hackathon');
const entries = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f !== '.gitkeep') : [];
if (entries.length === 0) { console.log('Nothing to reset.'); process.exit(0); }
if (!process.argv.includes('--yes')) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const a = await rl.question(`Delete ${entries.join(', ')} from .hackathon/? (y/N) `);
  rl.close();
  if (a.trim().toLowerCase() !== 'y') { console.log('Aborted.'); process.exit(0); }
}
for (const f of entries) fs.rmSync(p('.hackathon', f), { recursive: true, force: true });
console.log('Session cleared. To reset code to the starter state use: git restore src tests && git clean -fd src tests');
