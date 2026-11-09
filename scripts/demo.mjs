// Prints all scenario results in the terminal, then serves the built app.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { loadScenarios, p, readJson } from './lib.mjs';

try {
  const { evaluateTelemetry } = await import('../src/core/evaluate.ts');
  const rules = readJson('reference', 'validation-rules.json');
  const catalog = readJson('reference', 'diagnostic-codes.json');
  console.log('SCENARIO'.padEnd(24) + 'STATUS'.padEnd(10) + 'FINDINGS');
  for (const s of loadScenarios()) {
    const r = evaluateTelemetry(s.telemetry, rules, catalog, s.evaluationTime);
    console.log(s.id.padEnd(24) + r.status.padEnd(10) + r.findings.map((f) => f.code).join(', '));
  }
} catch (e) {
  console.log(`Core not implemented yet (${String(e.message).split('\n')[0]}). Starting the app anyway.`);
}
if (!fs.existsSync(p('dist/index.html'))) {
  console.log('\nBuilding frontend ...');
  const b = spawnSync('npm', ['run', 'build'], { cwd: p('.'), stdio: 'inherit', shell: process.platform === 'win32' });
  if (b.status !== 0) process.exit(b.status ?? 1);
}
const port = process.env.PORT ?? '3001';
console.log(`\nDemo running at http://localhost:${port}  (Ctrl+C to stop)`);
spawn('node', ['src/server/index.ts'], { cwd: p('.'), stdio: 'inherit', env: { ...process.env, PORT: port } });
