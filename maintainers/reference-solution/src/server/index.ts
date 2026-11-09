import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateTelemetry } from '../core/evaluate.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const json = (...p: string[]) => JSON.parse(fs.readFileSync(path.join(ROOT, ...p), 'utf8'));
const MIME: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };

export function startServer(port = Number(process.env.PORT ?? 3001)) {
  const rules = json('reference', 'validation-rules.json');
  const catalog = json('reference', 'diagnostic-codes.json');
  const scenarios = fs.readdirSync(path.join(ROOT, 'data')).filter((f) => f.endsWith('.json')).sort()
    .map((f) => json('data', f));
  const send = (res: import('node:http').ServerResponse, code: number, body: unknown) => {
    res.writeHead(code, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  };
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res, 200, { status: 'ok' });
    if (req.method === 'GET' && url.pathname === '/api/rules') return send(res, 200, rules);
    if (req.method === 'GET' && url.pathname === '/api/scenarios')
      return send(res, 200, scenarios.map(({ id, name, description }) => ({ id, name, description })));
    const m = /^\/api\/scenarios\/([\w-]+)$/.exec(url.pathname);
    if (req.method === 'GET' && m) {
      const s = scenarios.find((x) => x.id === m[1]);
      if (!s) return send(res, 404, { error: 'Unknown scenario' });
      return send(res, 200, { ...s, result: evaluateTelemetry(s.telemetry, rules, catalog, s.evaluationTime) });
    }
    if (req.method === 'POST' && url.pathname === '/api/evaluate') {
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          const t = parsed.telemetry ?? parsed;
          const at = parsed.evaluationTime ?? new Date().toISOString();
          send(res, 200, evaluateTelemetry(t, rules, catalog, at));
        } catch {
          send(res, 400, { error: 'Invalid JSON body' });
        }
      });
      return;
    }
    const dist = path.join(ROOT, 'dist');
    const file = path.join(dist, url.pathname === '/' ? 'index.html' : url.pathname);
    if (file.startsWith(dist) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
      return fs.createReadStream(file).pipe(res);
    }
    send(res, 404, { error: 'Not found' });
  });
  return new Promise<{ port: number; close: () => Promise<void> }>((resolve) => {
    server.listen(port, () => {
      const a = server.address();
      resolve({ port: typeof a === 'object' && a ? a.port : port, close: () => new Promise<void>((r) => server.close(() => r())) });
    });
  });
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const { port } = await startServer();
  console.log(`SDV Diagnostics API listening on http://localhost:${port}`);
}
