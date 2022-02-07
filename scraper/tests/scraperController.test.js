const { test } = require('@playwright/test');
const assert = require('assert');
const { parseElements } = require('../majorPages/scraperController')

test.use({
    viewport: {
        width: 800,
        height: 600
    },
    colorScheme: 'dark'
});

const expectedReqsCS = [{"title":"Major (Honours Program)","desc":["Since many courses are offered in only one semester and course pre-requisites place an ordering on courses, the following program of studies is designed so that students can schedule their courses over 8 semesters of study. Students deviating from this schedule must consult with their academic advisor."],"table":[{"courses":["CIS*1300","CIS*1910","MATH*1200","CIS*2500","CIS*2910","MATH*1160","CIS*2030","CIS*2430","CIS*2520","CIS*2750","CIS*3110","CIS*3490","CIS*3150","CIS*3750","STAT*2040","CIS*3760","CIS*4650"],"credits":10.75}],"lists":[],"footnotes":[]}]

let reqs = {}
test('parse CS', async ({ page }) => {
    await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/computer-science-cs/#requirementstext');
    reqs = await parseElements(page, '//*[@id="requirementstextcontainer"]')
    assert.equal(JSON.stringify(reqs), JSON.stringify(expectedReqsCS), 'reqs are not as expected.')
    // await expect(page.$('h1')).toHaveText('Computer Science (CS)')
});
