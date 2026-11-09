import { createServer } from 'node:http';

/**
 * STARTER SERVER - implement the API contract from challenge/requirements.md:
 *   GET /api/health, GET /api/scenarios, GET /api/scenarios/:id, POST /api/evaluate, GET /api/rules
 * It must also serve the built frontend from ./dist when present.
 * Export startServer(port) returning a Promise<{ port: number; close(): Promise<void> }> so tests can use port 0.
 */
export function startServer(port = Number(process.env.PORT ?? 3001)) {
  const server = createServer((req, res) => {
    if (req.url === '/api/health') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }
    res.writeHead(501, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'NOT_IMPLEMENTED' }));
  });
  return new Promise<{ port: number; close: () => Promise<void> }>((resolve) => {
    server.listen(port, () => {
      const address = server.address();
      const actual = typeof address === 'object' && address ? address.port : port;
      resolve({
        port: actual,
        close: () => new Promise<void>((r) => server.close(() => r())),
      });
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { port } = await startServer();
  console.log(`SDV Diagnostics API listening on http://localhost:${port}`);
}
