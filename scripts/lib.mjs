import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const p = (...parts) => path.join(ROOT, ...parts);
export const readJson = (...parts) => JSON.parse(fs.readFileSync(p(...parts), 'utf8'));

export function loadScenarios() {
  return fs
    .readdirSync(p('data'))
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => readJson('data', f));
}

export function nodeVersionOk(min = [22, 18]) {
  const [maj, min2] = process.versions.node.split('.').map(Number);
  return maj > min[0] || (maj === min[0] && min2 >= min[1]);
}

/** Runs every scenario through an implementation and compares with reference/expected-results.json. */
export async function conformance(implPath = 'src/core/evaluate.ts') {
  const mod = await import(pathToFileURL(path.isAbsolute(implPath) ? implPath : p(implPath)).href);
  const rules = readJson('reference', 'validation-rules.json');
  const catalog = readJson('reference', 'diagnostic-codes.json');
  const expected = readJson('reference', 'expected-results.json').scenarios;
  const rows = [];
  for (const s of loadScenarios()) {
    const exp = expected[s.id];
    const row = { id: s.id, ok: false, detail: '' };
    try {
      const r = mod.evaluateTelemetry(s.telemetry, rules, catalog, s.evaluationTime);
      const codes = r.findings.map((f) => f.code).sort();
      const problems = [];
      if (r.status !== exp.status) problems.push(`status ${r.status} != ${exp.status}`);
      if (r.dataQuality !== exp.dataQuality) problems.push(`dataQuality ${r.dataQuality} != ${exp.dataQuality}`);
      if (JSON.stringify(codes) !== JSON.stringify(exp.findingCodes))
        problems.push(`findings [${codes}] != [${exp.findingCodes}]`);
      row.ok = problems.length === 0;
      row.detail = problems.join('; ');
    } catch (e) {
      row.detail = String(e.message ?? e).split('\n')[0];
    }
    rows.push(row);
  }
  return rows;
}
