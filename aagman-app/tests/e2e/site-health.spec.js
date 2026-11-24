import { test, expect } from '@playwright/test';

const routes = [
  '/', '/explore', '/forts', '/temples', '/beaches', '/heritage',
  '/heritage-culture', '/map', '/festivals', '/planner', '/videos',
  '/about', '/contact', '/faq', '/login', '/register',
  '/dashboard', '/trips', '/wishlist', '/budget', '/settings',
  '/admin/login', '/admin/forgot-password', '/admin/reset-password'
];

test('all configured application routes render without runtime errors', async ({ page }) => {
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status(), `HTTP status for ${route}`).toBeLessThan(400);
    await expect(page.locator('body')).not.toBeEmpty();
    await expect(page.locator('#root')).not.toBeEmpty();
  }

  expect(runtimeErrors).toEqual([]);
});

const responsiveCases = [
  { route: '/', widths: [320, 360, 390, 768, 1024, 1365, 1440] },
  { route: '/contact', widths: [320, 360, 390, 768] },
  { route: '/dashboard', widths: [320, 360, 390, 480, 768, 1024] },
  { route: '/trips', widths: [320, 390] },
  { route: '/wishlist', widths: [320, 390] },
  { route: '/budget', widths: [320, 390] },
  { route: '/admin/login', widths: [320, 390, 768, 1365] }
];

for (const scenario of responsiveCases) {
  for (const width of scenario.widths) {
    test(`no horizontal overflow on ${scenario.route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(scenario.route, { waitUntil: 'domcontentloaded' });
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth
      }));
      expect(
        dimensions.document,
        `${scenario.route} overflows at ${width}px: ${JSON.stringify(dimensions)}`
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    });
  }
}

test('unknown paths show the application 404 page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Page Not Found')).toBeVisible();
});
