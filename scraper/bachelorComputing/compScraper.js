const { initBrowser, writeFile } = require("../scraper");

const getRequirements = async(page) => {
    const tableData = await page.$$eval('//*[@id="requirementstextcontainer"]/table/tbody/tr/td[1]/a', rows => {
        //*[@id="requirementstextcontainer"]/table[1]/tbody/tr[2]/td[1]/a
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
    const reqs = {}

    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/computer-science-cs/#requirementstext');
    console.log('Loading requirements of CS major');
    reqs['CS'] = await getRequirements(page);

    await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/software-engineering-seng/#requirementstext');
    console.log('Loading requirements of SENG major');
    reqs['SENG'] = await getRequirements(page);

    writeFile('comp.json', JSON.stringify(reqs));

    await page.waitForTimeout(1000);
    console.log('Done! Closing browser.');
    await browser.close();
}

csMain();