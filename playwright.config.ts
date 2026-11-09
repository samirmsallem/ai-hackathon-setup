import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: 'http://localhost:3001' },
  webServer: {
    command: 'npm run build && node src/server/index.ts',
    url: 'http://localhost:3001/api/health',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
