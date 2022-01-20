// @ts-check
// test for scraper.js
const { test, expect } = require('@playwright/test');

test('main page', async ({ page }) => {
  //open page
  await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/');
  //await page.locator('text=Get started').click();
  await expect(page).toHaveTitle("XII. Course Descriptions < University of Guelph");
});

test('course page', async ({ page }) => {

  await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/acct/');
  //await page.locator('text=Get started').click();
  await expect(page).toHaveTitle("Accounting (ACCT) < University of Guelph");
});