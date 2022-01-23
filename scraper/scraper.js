const playwright = require('playwright');
const fs = require('fs');

/**
 * writes a file named fileName and contents
 * @param {String} fileName 
 * @param {String} contents 
 */ 
const writeFile = (fileName, contents) => {
    //write file
    fs.writeFile(fileName, contents, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
}

/**
 * get the urls for each major from the front page
 * @param {playwrite browser page} page 
 * @returns list of urls
 */
const getUrls = async (page) => {
    // get the urls for each majors
    const urls = await page.$$eval('//div[contains(@class, "az_sitemap")]/ul/li/a', aElms => {
        const urls = [];

        //get urls from a elements
        aElms.forEach(a => {
            urls.push(a.href);
        });
        
        return urls;
    });
    return urls;
}

/**
 * opens the browser and goes to the first url
 * @returns playwright browser and page
 */
const initBrowser = async () => {
    //open browser
    const browser = await playwright.firefox.launch({
        headless: true
    });

    //open page
    const page = await browser.newPage();
    await page.goto('https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/');
    return [browser, page];
}

/**
 * scrapes the page for all the course data on the page
 * @param {playwright page} page 
 * @returns list of course data formatted into object
 */
const getCoursesDataFromMajor = async (page) => {
    //get courseblock elements
    const majorData = await page.$$eval('//div[contains(@class, "courseblock")]', courseBlocks => {
                
        const getTextFromClassTag = (elm, className, tag) => {
            try {
                const elmWithClass = elm.getElementsByClassName(className)[0];
                const text = elmWithClass.getElementsByTagName(tag)[0].innerText;
                // console.log(text);
                return text;
            } catch (err) {
                // console.log(err);
                return null;
            }
        }

        const getTextFromClass = (elm, className) => {
            try {
                text = elm.getElementsByClassName(className)[0].innerText;
                // console.log(text);
                return text;
            } catch (err) {
                // console.log(err);
                return null;
            }
        }

        const data = [];

        //scrape data from each course
        courseBlocks.forEach(elm => {

            //scraping the data
            const cCode = getTextFromClassTag(elm, 'text detail-code margin--small text--semibold text--big', 'Strong');
            const name = getTextFromClassTag(elm, 'text detail-title margin--small text--semibold text--big', 'Strong');
            const semesters = getTextFromClassTag(elm, 'text detail-typically_offered margin--small text--semibold text--big', 'span');
            const lec = getTextFromClassTag(elm, 'text detail-inst_method margin--small text--semibold text--big', 'span');
            const creditWeight = getTextFromClassTag(elm, 'text detail-hours_html margin--small text--semibold text--big', 'Strong');
            const description = getTextFromClass(elm, 'courseblockextra noindent');
            const offerings = getTextFromClassTag(elm, 'text detail-offering', 'span');
            const restrictions = getTextFromClassTag(elm, 'text detail-restriction_s_', 'span');
            const department = getTextFromClassTag(elm, 'text detail-department_s_', 'span');
            const location = getTextFromClassTag(elm, 'text detail-location_s_', 'span');
            const prereqs = getTextFromClassTag(elm, 'text detail-prerequisite_s_', 'span');
            const equates = getTextFromClassTag(elm, 'text detail-equate_s_', 'span');
            
            //make object
            const course = {
                cCode: cCode,
                name: name,
                description: description,
                semesters: semesters,
                lec: lec,
                restrictions: restrictions, 
                offerings: offerings,
                creditWeight: creditWeight,
                department: department,
                location: location,
                prereqs: prereqs,
                equates: equates
            }
            
            //add to array
            data.push(course);
        });
        return data;
    });
    return majorData;
}

/**
 * scrapes course info from https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/ and stores it in a json file
 */
const main = async () => {
    //init
    const [browser, page] = await initBrowser();

    console.log('loading data from https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/');

    // get the urls for each majors
    const urls = await getUrls(page);

    const allData = [];

    //go to each url
    for (url of urls) {
        try {
            //go to url
            await page.goto(url);
            
            //get major title
            // let title = null;
            // title = await page.$eval('//h1[contains(@class, "page-title")]', elm => elm.innerText);

            //get all the course data for the major
            majorData = await getCoursesDataFromMajor(page);

            //add data from major to total data array
            allData.push({title: majorData});
            
        } catch (err) {
            console.log(err);
        }
    }

    //write file
    writeFile('data.json', JSON.stringify(allData));
    //close browser
    await browser.close();
}

main();

