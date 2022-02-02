const { initBrowser, writeFile } = require("../scraper");

const getRequirements = async(page) => {
    
    const data = await page.$$eval('//*[@id="requirementstextcontainer"]/table/tbody/tr/td[1]/a', rows => {
        const courses = []
        let credits = 0.0

        rows.forEach(course => {
            text = course.innerText;

            if (text.match('^[0-9]*\.[0-9]+') != null) {
                console.log('not null');
                credits += parseFloat(text.match('[0-9]*\.[0-9]+')[0]);
            } else if (text.includes('or')) {
                courses[courses.length - 1] += ' ' + text;
            } else if (!text.includes('Semester')) {
                courses.push(text)
            }

            console.log(text)
        });

        return {
            courses: courses,
            credits: credits
        };
    });

    return data;
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

if (require.main === module) {
    csMain();
} else {
    module.exports = {
        getRequirements
    }
}