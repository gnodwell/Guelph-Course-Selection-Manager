const playwright = require('playwright');
const { initBrowser, writeFile, getLinks } = require("../scraper");

/**
 * scrapes the page by looping through courses and collecting its data
 * @param {playwright page} page 
 * @returns list of objects in the form:
 *          {
                cCode: course code,
                creditWeight: credit weight,
                name: name,
                description: description,
                prereqs: prereqs,
                coreqs: coreqs,
                restrictions: antireqs
            }
 */
const getCoursesData = async (page) => {
    const subjectData = await page.$$eval('//center', courseBlocks => {
        const getTextFromClassTag = (elm, className, idx1, tag, idx2) => {
            try {
                const elmWithClass = elm.getElementsByClassName(className)[idx1];
                const text = elmWithClass.getElementsByTagName(tag)[idx2].innerText;
                return text;
            } catch (err) {
                return '';
            }
        }
        
        const getTextFromClass = (elm, className, idx) => {
            try {
                text = elm.getElementsByClassName(className)[idx].innerText;
                return text;
            } catch (err) {
                return '';
            }
        }

        //some courses are missing the course code assosciiated with them, 
        //so add most recent course code to number
        const fillCourseCode = (str) => {
            let arr = str.split(/,| /);
            let recent = ''

            arr.forEach(code => {
                if (code.includes('*')) { //get most recent course code
                    let sym = code.indexOf('*')
                    recent = code.slice(0, sym)
                    console.log(recent)
                } else {
                    let nums = code.match(/\d+/g) //prefix course code to number
                    if (nums) {
                        
                        if ((0 < nums[0] && nums[0] < 10) || //ignore '001' - '009' cases
                            (code.charAt(0) == 'W' || code.charAt(0) == 'S' || code.charAt(0) == 'F')) { //ignore 'term' codes
                            return;
                        }

                        nums = recent + '*' + nums
                        console.log(nums)
                        str = str.replace(code, nums)
                    }
                }
            });

            return str
        }

        const reformatCourseCodes = (str) => {
            if (!str) {
                return str;
            }
        
            //replace all ' ' to '*' to keep course codes uniform with guelph format
            const codes = str.match(/[A-Z]+\s\d{1,3}[A-Z]?|[A-Z]+\s-+/g);
            if (codes) {
                codes.forEach(code => {
                    const newCode = code.replace(' ', '*');
                    str = str.replace(code, newCode);
                });
            }

            //replace '/' with 'or' word in string
            str = str.replace(/\//g, ' or ')
            str = fillCourseCode(str);

            return str;
        }

        const data = [];
        courseBlocks.forEach(elm => {
            
            //get course code and credits from first string
            const cCodeAndCreds = getTextFromClassTag(elm, 'divTableCell', 0, 'strong', 0);

            //parse the course code out of the string - regex matches '<chars> <nums><char>?' or '<chars> <------>'
            let cCode = cCodeAndCreds.match(/^[A-Z]+\s\d{1,3}[A-Z]?\s|^[A-Z]+\s-+/)[0].trim();
            cCode = reformatCourseCodes(cCode);
            //parse the credits out of the string - regex matches '<nums>.<nums>' at the end of the string
            const creditWeight = cCodeAndCreds.match(/\d+\.\d+$/)[0].trim();

            const name = getTextFromClassTag(elm, 'divTableCell colspan-2', 0, 'strong', 0);
            const desc = getTextFromClass(elm, 'divTableCell colspan-2', 1);

            let prereqs = null;
            let coreqs = null;
            let antireqs = null;

            try {
                //get number of divTableCell colspan-2 for looping
                const extrasLength = elm.getElementsByClassName('divTableCell colspan-2').length;

                //loop through all divTableCell colspan-2 elements to check for prereqs, coreqs, and antireqs
                for (let i = 0; i < extrasLength; i++) {

                    //get the text    
                    const text = getTextFromClassTag(elm, 'divTableCell colspan-2', i, 'em', 0);

                    //if text starts with 'Prereqs: '
                    if (text.match(/^Prereq:\s/)) { 
                        //remove 'Prereqs: ' from text and set prereqs
                        prereqs = text.replace(/^Prereq:\s/, ''); 
                        prereqs = reformatCourseCodes(prereqs);

                    //if text starts with 'Coreqs: '
                    } else if (text.match(/^Coreq:\s/)) { 
                        //remove 'Coreqs: ' from text and set coreqs
                        coreqs = text.replace(/^Coreq:\s/, '');
                        coreqs = reformatCourseCodes(coreqs);

                    //if text starts with 'Antireqs: '
                    } else if (text.match(/^Antireq:\s/)) { 
                        //remove 'Antireqs: ' from text and set antireqs
                        antireqs = text.replace(/^Antireq:\s/, ''); 
                        antireqs = reformatCourseCodes(antireqs);
                    }
                }
            } catch (err) {
                console.log(err);
            }

            //add data to json
            data.push({
                cCode: cCode,
                creditWeight: '[' + creditWeight + ']',
                name: name,
                description: desc,
                prereqs: prereqs,
                coreqs: coreqs,
                restrictions: antireqs
            });
        });

        return data;
    });
    return subjectData;
}




/**
 * scrapes course info from https://ugradcalendar.uwaterloo.ca/page/Course-Descriptions-Index and stores it in a json file
 */
const main = async () => {
    //init browser
    const [browser, page] = await initBrowser('https://ugradcalendar.uwaterloo.ca/page/Course-Descriptions-Index');

    console.log('loading data from https://ugradcalendar.uwaterloo.ca/page/Course-Descriptions-Index');

    // get the urls for each subject
    const links = await getLinks(page, '//*[@class="MainContent"]//td/a[not(contains(@shape, "rect"))][not(contains(., "00s"))][not(contains(., "Notes"))][not(contains(., "top"))]');

    allData = [];

    //loop through links
    for (link of links) {
        //go to each link
        await page.goto(link['url']);

        //gets data
        data = await getCoursesData(page);


        //get subject title
        let title = null;
        title = await page.$eval('//h2[contains(@class, "subject")]', elm => elm.innerText);

        //reformat subject title because of weird spacing
        title = title.replace(/\s\s/g, '!');
        title = title.replace(/\s/g, '');
        title = title.replace(/!/g, ' ');

        //add to json
        allData.push({
            subject: title + ' (' + link['text'] + ')',
            data: data
        })
    }

    //write file
    writeFile('waterlooData.json', JSON.stringify(allData));
    //close browser
    await browser.close();
}

if (require.main === module) {
    main();
} else {
    module.exports = {
        getCoursesData
    }
}