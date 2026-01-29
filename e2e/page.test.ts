import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toBe('Fuse and Fuzzy');
});

test('fields page has expected h1', async ({ page }) => {
  await page.goto('/fuzzy');
  expect(await page.textContent('h1')).toBe('Fuzzy Component');
});

test('keys page has expected h1', async ({ page }) => {
  await page.goto('/fuse');
  expect(await page.textContent('h1')).toBe('Fuse Component');
});
