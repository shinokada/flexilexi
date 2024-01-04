import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Japanese dictionary');
});

test('feilds page has expected h1', async ({ page }) => {
	await page.goto('/feilds');
	expect(await page.textContent('h1')).toBe('Feilds props example');
});

test('keys page has expected h1', async ({ page }) => {
	await page.goto('/keys');
	expect(await page.textContent('h1')).toBe('Keys props example');
});

test('threshold page has expected h1', async ({ page }) => {
	await page.goto('/threshold');
	expect(await page.textContent('h1')).toBe('Threshold example');
});