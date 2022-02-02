const { initBrowser, writeFile } = require("../scraper");
const { getRequirementsAndFootnotes } = require('./ahnScraper');

const cstuMain = async () => {
    let reqs = {}

    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/family-studies-human-development-fshd/#requirementstext');
    console.log('Loading requirements of CSTU major');
    reqs = await getRequirementsAndFootnotes(page);

    writeFile('cstu.json', JSON.stringify(reqs));

    await page.waitForTimeout(1000);
    console.log('Done! Closing browser.');
    await browser.close();
}

cstuMain();