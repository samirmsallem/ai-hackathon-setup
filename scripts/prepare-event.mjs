// Facilitator tool: removes the maintainer reference solution so that agents cannot find it.
//   node scripts/prepare-event.mjs --yes
import fs from 'node:fs';
import { p } from './lib.mjs';

if (!process.argv.includes('--yes')) {
  console.log('This deletes maintainers/. Run with --yes (make sure the repo copy for participants is separate).');
  process.exit(1);
}
fs.rmSync(p('maintainers'), { recursive: true, force: true });
console.log('maintainers/ removed. Commit this to the branch handed to the teams.');
