// @ts-check
// test for scraper.js
const { test, expect } = require('@playwright/test');

test.use({
  viewport: {
    width: 800,
    height: 600
  },
  colorScheme: 'dark'
});

//tests opening the guelph course descriptions page
test('main page', async ({ page }) => {
  //open page
  await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/');
  //await page.locator('text=Get started').click();
  await expect(page).toHaveTitle("XII. Course Descriptions < University of Guelph");
});

//tests opening a major within the guelph course descriptions page
test('course page', async ({ page }) => {

  await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/acct/');
  //await page.locator('text=Get started').click();
  await expect(page).toHaveTitle("Accounting (ACCT) < University of Guelph");
});

test('initBrowser', async ({ page }) => {
  //open page
  await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/');
  await expect(page).toHaveTitle("XII. Course Descriptions < University of Guelph");
});

// test('test', async ({ page }) => {
//   // Go to https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/
//   await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/');
//   // Click [aria-label="Primary"] >> text=Accounting (ACCT)
//   await page.click('[aria-label="Primary"] >> text=Accounting (ACCT)');
//   await expect(page).toHaveURL('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/acct/');
//   // Click [aria-label="Primary"] >> text=Agriculture (AGR)
//   await page.click('[aria-label="Primary"] >> text=Agriculture (AGR)');
//   await expect(page).toHaveURL('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/agr/');
//   // Click [aria-label="Primary"] >> text=Animal Science (ANSC)
//   await page.click('[aria-label="Primary"] >> text=Animal Science (ANSC)');
//   await expect(page).toHaveURL('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/ansc/');
//   // Click [aria-label="Primary"] >> text=Zoology (ZOO)
//   await page.click('[aria-label="Primary"] >> text=Zoology (ZOO)');
//   await expect(page).toHaveURL('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/zoo/');
// });

