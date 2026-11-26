import { test, expect } from '@playwright/test';

test.describe('AAGMAN authentication and festival guide regressions', () => {
  test('rejects an invalid traveller login instead of creating a local session', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#aagman-email').fill('invalid-user@example.invalid');
    await page.locator('#aagman-password').fill('not-a-real-password');
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    await expect(page).toHaveURL(/\/login(?:\?.*)?$/);
    await expect(page.getByRole('alert')).toBeVisible();
    const authState = await page.evaluate(() => ({
      legacySession: localStorage.getItem('aagman_is_logged_in'),
      legacyUser: localStorage.getItem('aagman_auth_user')
    }));
    expect(authState.legacySession).not.toBe('true');
    expect(authState.legacyUser).toBeNull();
  });

  test('does not create a traveller account locally when Supabase is unavailable', async ({ page }) => {
    await page.goto('/register');
    await page.locator('#traveler-name').fill('AAGMAN Test User');
    await page.locator('#traveler-email').fill('registration-test@example.invalid');
    await page.locator('#traveler-password').fill('not-a-real-password');
    await page.getByRole('button', { name: 'Create Free Account' }).click();

    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByRole('alert')).toBeVisible();
    const legacySession = await page.evaluate(() => localStorage.getItem('aagman_is_logged_in'));
    expect(legacySession).not.toBe('true');
  });

  test('festival guide opens without throwing when a festival is available', async ({ page }) => {
    const runtimeErrors = [];
    page.on('pageerror', error => runtimeErrors.push(error.message));
    await page.goto('/festivals');

    const guideButton = page.getByRole('button', { name: 'View Celebration Guide' }).first();
    if (await guideButton.count() === 0) {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(runtimeErrors).toEqual([]);
      return;
    }

    await guideButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').locator('h3').first()).toBeVisible();
    expect(runtimeErrors).toEqual([]);
  });
});
