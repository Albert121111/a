import { test, expect } from '@playwright/test';

test('home and schedule render', async ({ page }) => {
  await page.goto('/ru');
  await expect(page.getByText('Популярные тренировки')).toBeVisible();
  await page.goto('/ru/schedule');
  await expect(page.getByText('Расписание')).toBeVisible();
});
