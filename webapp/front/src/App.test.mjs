// import { render, screen } from '@testing-library/react';
// import App from './App';
// import React from 'react'
// import ReactDOM from 'react-dom'

// it ('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


// const { firefox } = require('playwright');

// (async () => {
//     const browser = await firefox.launch({
//       headless: false
//     });
//     // Create pages, interact with UI elements, assert values
//     const context = await browser.newContext({
//       ignoreHTTPSErrors: true
//     });

//     const page = await context.newPage();
//     await page.goto("https://131.104.49.104");
//     // await browser.close();
// })();

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
  


  await page.goto("https://131.104.49.104");

  // const name = await page.locator('Navigate to pages using the menu bar!');
  // console.log(name)
  // // const name = "University Course Utility - CIS*3760 Team 4"
  // expect(name).toBe("Navigate to pages using the menu bar!")

  await expect(page).toHaveURL('https://131.104.49.104');
})
