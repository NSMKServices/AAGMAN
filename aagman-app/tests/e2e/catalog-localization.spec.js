import { test, expect } from '@playwright/test';

test('public destination catalogue starts empty until an administrator publishes content', async ({ page }) => {
  for (const category of ['nature', 'wildlife', 'forts', 'temples', 'beaches', 'heritage']) {
    await page.goto(`/explore?category=${category}`);
    await expect(page.getByText('No destinations published yet.')).toBeVisible();
    await expect(page.getByText('Add and publish destinations in the admin dashboard to display them here.')).toBeVisible();
  }
});

test('public festival catalogue starts empty until an administrator publishes content', async ({ page }) => {
  await page.goto('/festivals');
  await expect(page.getByText('No festivals published yet. Add and publish festivals in the admin dashboard to display them here.')).toBeVisible();
});

test('unpublished or missing destinations are not publicly accessible', async ({ page }) => {
  await page.goto('/nature/mahabaleshwar');
  await expect(page.getByRole('heading', { name: 'Destination Not Found' })).toBeVisible();
});

test('homepage starts without hard-coded destination highlights', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('No destinations have been featured yet. Add places in the admin dashboard and assign a homepage position.')).toBeVisible();
  await expect(page.getByText('No festivals have been featured yet. Add festivals and choose a homepage highlight position in the admin dashboard.')).toBeVisible();
});
