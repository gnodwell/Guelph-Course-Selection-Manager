const { initBrowser, writeFile } = require("../scraper");
const { getRequirementsAndFootnotes } = require('./ahnScraper');

const getRestrictedElectives = async(page) => {
    const restricted = {}

    const numRestricted = await page.$$('//*[@id="requirementstextcontainer"]/h4');
    for (let i = 1; i < numRestricted.length+1; i++) {
        const title = await page.innerText('//*[@id="requirementstextcontainer"]/h4['+i+']');
        
        const data = await page.$$eval('//*[@id="requirementstextcontainer"]/table['+i+']/tbody/tr/td[1]', rows => {
            const courses = []

            rows.forEach(course => {
                text = course.innerText;

                if (text.includes('or')) {
                    courses[courses.length - 1] += ' ' + text;
                } else if (!text.includes('Semester')) {
                    courses.push(text)
                }

                console.log(text)
            });

            return courses;
        });

        restricted[title] = data;
    }

    restricted['desc'] = await page.innerText('//*[@id="requirementstextcontainer"]/p[2]');
    return restricted;    
}

const fshdMain = async () => {
    let reqs = {}

    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/family-studies-human-development-fshd/#requirementstext');
    console.log('Loading requirements of FSHD major');
    reqs = await getRequirementsAndFootnotes(page);
    reqs['RE'] = await getRestrictedElectives(page);

    writeFile('fshd.json', JSON.stringify(reqs));

    await page.waitForTimeout(1000);
    console.log('Done! Closing browser.');
    await browser.close();
}

if (require.main === module) {
    fshdMain();
} else {
    module.exports = {
        getRestrictedElectives
    }
}