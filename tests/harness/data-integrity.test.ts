// Harness tests: must be GREEN from the start. They protect the shared challenge data. Do not weaken them.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '../..');
const read = (...p: string[]) => JSON.parse(fs.readFileSync(path.join(root, ...p), 'utf8'));
const files = fs.readdirSync(path.join(root, 'data')).filter((f) => f.endsWith('.json'));
const expected = read('reference', 'expected-results.json').scenarios;
const FIELDS = ['vehicleId', 'speedKph', 'batteryStateOfCharge', 'batteryTemperatureC', 'vehicleMode', 'softwareVersion', 'diagnosticCodes', 'connectivityStatus', 'timestamp'];

describe('challenge data', () => {
  it('provides at least 12 scenarios', () => expect(files.length).toBeGreaterThanOrEqual(12));
  it.each(files)('%s has all required telemetry fields and an expected result', (f) => {
    const s = read('data', f);
    expect(s.id).toBe(f.replace('.json', ''));
    for (const field of FIELDS) expect(s.telemetry).toHaveProperty(field);
    expect(expected[s.id]).toBeDefined();
  });
  it('rules file contains all thresholds', () => {
    const r = read('reference', 'validation-rules.json');
    expect(r.speedKph.max).toBe(260);
    expect(r.batteryStateOfCharge.criticalBelow).toBe(8);
    expect(r.batteryTemperatureC.criticalAbove).toBe(70);
  });
});
