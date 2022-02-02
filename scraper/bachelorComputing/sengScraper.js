const { initBrowser, writeFile } = require("../scraper");
const { getRequirements } = require("./csScraper")

const sengMain = async () => {
    let reqs = {}

    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/software-engineering-seng/#requirementstext');
    console.log('Loading requirements of SENG major');
    reqs = await getRequirements(page);

    writeFile('seng.json', JSON.stringify(reqs));

    await page.waitForTimeout(1000);
    console.log('Done! Closing browser.');
    await browser.close();
}

sengMain();