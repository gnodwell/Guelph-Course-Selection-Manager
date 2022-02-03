const { initBrowser, writeFile, getLinks } = require("../scraper");

/**
 * scraper that gets the names of all the majors and the links to their pages and writes to a file
 */
const getMajorPages = async () => {
    //open browser
    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/degree-programs/');

    console.log('Getting page information for majors...');
    
    //get links from main page
    const degreeLinks = await getLinks(page, '.sitemap > ul > li > a');
    
    let majors = []

    //check each link and see if it contains a list to other majors
    for (link of degreeLinks) {
        await page.goto(link.url);
        
        //check to see if there are more links
        let moreLinks = await getLinks(page, '.sitemap > ul > li > a');
        
        if (moreLinks.length > 0) { //if there are more links, then add them to the list
            majors = majors.concat(moreLinks);
        } else { //otherwise, the original link was the major. Add it to the list
            majors.push(link);
        }
    }
    
    //writes the file
    writeFile('majorPages.json', JSON.stringify(majors));
    //close browser
    await browser.close();
}

getMajorPages();