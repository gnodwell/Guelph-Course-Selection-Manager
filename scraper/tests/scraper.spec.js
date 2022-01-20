// @ts-check
// test for scraper.js
const { test, expect } = require('@playwright/test');

test('scraper', async ({ page }) => {
  await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/');
  //await page.locator('text=Get started').click();
  await expect(page).toHaveTitle(/2021-2022 Academic Calendar/);
});
