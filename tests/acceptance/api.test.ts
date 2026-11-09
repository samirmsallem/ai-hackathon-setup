import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { startServer } from '../../src/server/index.ts';

let base = '';
let close: () => Promise<void>;
beforeAll(async () => {
  const s = await startServer(0);
  base = `http://localhost:${s.port}`;
  close = s.close;
});
afterAll(async () => close?.());

describe('HTTP API contract', () => {
  it('GET /api/health', async () => expect(await (await fetch(`${base}/api/health`)).json()).toEqual({ status: 'ok' }));
  it('GET /api/scenarios lists 12+ scenarios', async () => {
    const list = await (await fetch(`${base}/api/scenarios`)).json();
    expect(list.length).toBeGreaterThanOrEqual(12);
    expect(list[0]).toHaveProperty('id');
    expect(list[0]).toHaveProperty('name');
  });
  it('GET /api/scenarios/:id returns telemetry and result', async () => {
    const s = await (await fetch(`${base}/api/scenarios/critical-combined`)).json();
    expect(s.telemetry.vehicleId).toBeDefined();
    expect(s.result.status).toBe('CRITICAL');
  });
  it('unknown scenario gives 404', async () => expect((await fetch(`${base}/api/scenarios/nope`)).status).toBe(404));
  it('POST /api/evaluate evaluates custom telemetry', async () => {
    const s = await (await fetch(`${base}/api/scenarios/low-battery`)).json();
    const r = await fetch(`${base}/api/evaluate`, { method: 'POST', body: JSON.stringify({ telemetry: s.telemetry, evaluationTime: s.evaluationTime }) });
    expect((await r.json()).status).toBe('WARNING');
  });
  it('POST /api/evaluate with invalid JSON gives 400', async () =>
    expect((await fetch(`${base}/api/evaluate`, { method: 'POST', body: '{nope' })).status).toBe(400));
  it('GET /api/rules exposes the configured rules', async () =>
    expect((await (await fetch(`${base}/api/rules`)).json()).speedKph.max).toBe(260));
});
