import { expect, test } from '@playwright/test';

test('user can select a scenario and see status, findings and actions', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('scenario-select').selectOption('critical-combined');
  await expect(page.getByTestId('status-badge')).toContainText('CRITICAL');
  await expect(page.getByTestId('telemetry-table')).toBeVisible();
  expect(await page.getByTestId('finding-item').count()).toBeGreaterThanOrEqual(4);
  await expect(page.getByTestId('diagnostic-item').first()).toBeVisible();
  await expect(page.getByTestId('action-item').first()).toBeVisible();
  await page.getByTestId('scenario-select').selectOption('normal-vehicle');
  await expect(page.getByTestId('status-badge')).toContainText('HEALTHY');
});
