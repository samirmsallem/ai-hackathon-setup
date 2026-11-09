import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { nodeVersionOk, p } from './lib.mjs';

if (!nodeVersionOk()) {
  console.error(`Node >= 22.18 required (found ${process.versions.node}). Use nvm: nvm install 22`);
  process.exit(1);
}
fs.mkdirSync(p('.hackathon'), { recursive: true });
if (!fs.existsSync(p('node_modules'))) {
  console.log('Installing dependencies ...');
  const r = spawnSync('npm', ['install'], { stdio: 'inherit', cwd: p('.'), shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
} else console.log('Dependencies already installed.');
console.log('Setup complete. Next: run /hackathon in Claude Code or GitHub Copilot Chat.');
