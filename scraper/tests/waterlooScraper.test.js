const { test } = require('@playwright/test');
const assert = require('assert');
const { getCoursesData } = require('../uWaterloo/waterlooScraper')
const fs = require('fs');

test.use({
    viewport: {
        width: 800,
        height: 600
    },
    colorScheme: 'dark'
});
let f = fs.readFileSync('./testData.json');
const json = JSON.parse(f)
const expected = json['getCoursesTestData'];

let res = {}
test('waterlooScraper.js -> getCoursesData', async ({ page }) => {
    await page.goto('https://ucalendar.uwaterloo.ca/2223/COURSE/course-AFM.html');
    res = await getCoursesData(page);
    assert.equal(JSON.stringify(res), JSON.stringify(expected), JSON.stringify(res));
});
