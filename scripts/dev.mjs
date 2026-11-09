// Starts API (3001) and Vite (5173) together; Ctrl+C stops both.
import { spawn } from 'node:child_process';
import { p } from './lib.mjs';

const sh = process.platform === 'win32';
const procs = [
  spawn('node', ['--watch', 'src/server/index.ts'], { stdio: 'inherit', cwd: p('.') }),
  spawn('npx', ['vite'], { stdio: 'inherit', cwd: p('.'), shell: sh }),
];
const stop = () => procs.forEach((c) => c.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
procs.forEach((c) => c.on('exit', (code) => { stop(); process.exit(code ?? 0); }));
