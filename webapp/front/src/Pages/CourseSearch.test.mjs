
import { test, expect } from '@playwright/test';
import { firefox } from 'playwright'


test('basic test', async () => {
  const browser = await firefox.launch({
          // headless: false
  });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();
  

  await page.goto("https://131.104.49.104/CourseSearch");
  await expect(page).toHaveURL('https://131.104.49.104/CourseSearch');

//   const locator = page.locator('MuiTypography');
//     await expect(locator).toHaveClass(/selected/);

  
})
