const fs = require('fs');
const { initBrowser, writeFile } = require("../scraper");

const getRequirements = async(page) => {
    tableData = await page.$$eval('//*[@id="requirementstextcontainer"]/table/tbody/tr/td[1]/a', rows => {
        const courses = []
        rows.forEach(course => {
            console.log(course.innerText)
            courses.push(course.innerText)
        });

        return courses;
    });

    return tableData;
}

const csMain = async() => {
    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/computer-science-cs/#requirementstext');
    console.log('Loading requirements of CS major');
    reqs = await getRequirements(page);
    console.log(reqs)

    console.log('Done! Closing browser.');
    await browser.close();
}

csMain();