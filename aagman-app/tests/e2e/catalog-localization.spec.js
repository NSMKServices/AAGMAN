import { test, expect } from '@playwright/test';

test('nature and wildlife filters display the complete destination groups', async ({ page }) => {
  await page.goto('/explore?category=nature');
  await expect(page.getByRole('heading', { name: 'Hill Stations & Natural Wonders' })).toBeVisible();
  for (const name of [
    'Mahabaleshwar', 'Matheran', 'Lonar Crater Lake', 'Kaas Plateau'
  ]) {
    await expect(page.getByText(name, { exact: true })).toBeVisible();
  }

  await page.goto('/explore?category=wildlife');
  await expect(page.getByRole('heading', { name: 'Wildlife Sanctuaries & Parks' })).toBeVisible();
  for (const name of [
    'Tadoba-Andhari Tiger Reserve',
    'Sanjay Gandhi National Park',
    'Radhanagari Wildlife Sanctuary',
    'Nagzira Wildlife Sanctuary'
  ]) {
    await expect(page.getByText(name, { exact: true })).toBeVisible();
  }
});

test('destination names and summaries render in Marathi and Hindi', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('aagman_language', 'mr');
    localStorage.setItem('aagman_lang', 'mr');
  });
  await page.goto('/explore?category=nature');
  await expect(page.getByText('महाबळेश्वर', { exact: true })).toBeVisible();
  await expect(page.getByText(/स्ट्रॉबेरी शेतीसाठी प्रसिद्ध गिरिस्थान/)).toBeVisible();

  await page.addInitScript(() => {
    localStorage.setItem('aagman_language', 'hi');
    localStorage.setItem('aagman_lang', 'hi');
  });
  await page.goto('/explore?category=nature');
  await expect(page.getByText('महाबलेश्वर', { exact: true })).toBeVisible();
  await expect(page.getByText(/प्रसिद्ध पर्वतीय स्थल/).first()).toBeVisible();
});

test('festival cards render translated names and descriptions', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('aagman_language', 'mr');
    localStorage.setItem('aagman_lang', 'mr');
  });
  await page.goto('/festivals');
  await expect(page.getByText('दहीहंडी', { exact: true })).toBeVisible();
  await expect(page.getByText(/गोविंदा पथके/)).toBeVisible();

  await page.addInitScript(() => {
    localStorage.setItem('aagman_language', 'hi');
    localStorage.setItem('aagman_lang', 'hi');
  });
  await page.goto('/festivals');
  await expect(page.getByText('दही हांडी', { exact: true })).toBeVisible();
  await expect(page.getByText(/गोविंदा दल मानव पिरामिड/)).toBeVisible();
});


test('destination detail travel directions follow the selected language', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('aagman_language', 'mr');
    localStorage.setItem('aagman_lang', 'mr');
  });
  await page.goto('/nature/mahabaleshwar');
  await expect(page.getByText('पुणे विमानतळ; पुढे रस्त्याने.', { exact: true })).toBeVisible();

  await page.addInitScript(() => {
    localStorage.setItem('aagman_language', 'hi');
    localStorage.setItem('aagman_lang', 'hi');
  });
  await page.goto('/nature/mahabaleshwar');
  await expect(page.getByText('पुणे हवाई अड्डा; आगे सड़क मार्ग.', { exact: true })).toBeVisible();
});


test('admin portal remains in the footer and is not added to public navigation', async ({ page }) => {
  await page.goto('/');
  const footerAdminLink = page.locator('footer').getByRole('link', { name: 'Admin Portal' });
  await expect(footerAdminLink).toBeVisible();
  await expect(footerAdminLink).toHaveAttribute('href', '/admin/login');
  await expect(page.locator('header').getByRole('link', { name: 'Admin Portal' })).toHaveCount(0);
});
