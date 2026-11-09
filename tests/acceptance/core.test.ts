// Acceptance tests: RED at the start of the hackathon, GREEN when the challenge is solved.
// Teams (via their AI tools) may ADD tests in other files, but must not weaken this file.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { evaluateTelemetry } from '../../src/core/evaluate.ts';
import type { DiagnosticCodeCatalog, Rules } from '../../src/core/types.ts';

const root = path.resolve(__dirname, '../..');
const read = (...p: string[]) => JSON.parse(fs.readFileSync(path.join(root, ...p), 'utf8'));
const rules: Rules = read('reference', 'validation-rules.json');
const catalog: DiagnosticCodeCatalog = read('reference', 'diagnostic-codes.json');
const expected = read('reference', 'expected-results.json').scenarios;
const scenarios = fs.readdirSync(path.join(root, 'data')).filter((f) => f.endsWith('.json')).sort().map((f) => read('data', f));

describe('all predefined scenarios', () => {
  it.each(scenarios.map((s) => [s.id, s]))('%s', (_id, s) => {
    const r = evaluateTelemetry(s.telemetry, rules, catalog, s.evaluationTime);
    const e = expected[s.id];
    expect(r.status).toBe(e.status);
    expect(r.dataQuality).toBe(e.dataQuality);
    expect(r.findings.map((f) => f.code).sort()).toEqual(e.findingCodes);
    for (const f of r.findings) {
      expect(f.message.length).toBeGreaterThan(0);
      expect(f.explanation.length).toBeGreaterThan(0);
      expect(f.recommendedAction.length).toBeGreaterThan(0);
    }
    expect(r.summary.length).toBeGreaterThan(0);
  });
});

describe('rules are configurable and robust', () => {
  const healthy = scenarios.find((s) => s.id === 'normal-vehicle');
  it('changing a threshold in the rules changes the outcome', () => {
    const strict: Rules = { ...rules, batteryStateOfCharge: { ...rules.batteryStateOfCharge, warningBelow: 90 } };
    const r = evaluateTelemetry(healthy.telemetry, strict, catalog, healthy.evaluationTime);
    expect(r.status).toBe('WARNING');
  });
  it('is deterministic', () => {
    const a = evaluateTelemetry(healthy.telemetry, rules, catalog, healthy.evaluationTime);
    const b = evaluateTelemetry(healthy.telemetry, rules, catalog, healthy.evaluationTime);
    expect(a).toEqual(b);
  });
  it('does not throw on garbage input and reports missing fields', () => {
    for (const bad of [null, undefined, 42, 'x', [], {}]) {
      const r = evaluateTelemetry(bad, rules, catalog, healthy.evaluationTime);
      expect(r.dataQuality).toBe('REJECTED');
      expect(r.findings.length).toBeGreaterThan(0);
    }
  });
  it('treats boundary values as valid (SoC 20 is not low, SoC 8 is not critical)', () => {
    const at = (soc: number) => evaluateTelemetry({ ...healthy.telemetry, batteryStateOfCharge: soc }, rules, catalog, healthy.evaluationTime);
    expect(at(20).status).toBe('HEALTHY');
    expect(at(8).status).toBe('WARNING');
    expect(at(7.9).status).toBe('CRITICAL');
  });
  it('rejects out-of-range SoC and non-numeric speed', () => {
    const r = evaluateTelemetry({ ...healthy.telemetry, batteryStateOfCharge: 120, speedKph: 'fast' }, rules, catalog, healthy.evaluationTime);
    expect(r.findings.map((f) => f.code)).toEqual(expect.arrayContaining(['SOC_INVALID', 'SPEED_INVALID']));
  });
});
