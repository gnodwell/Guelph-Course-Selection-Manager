const playwright = require('playwright');
const { initBrowser, writeFile, getLinks } = require("../scraper");


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

        const data = [];
        courseBlocks.forEach(elm => {
            
            //get course code and credits from first string
            const cCodeAndCreds = getTextFromClassTag(elm, 'divTableCell', 0, 'strong', 0);

            //parse the course code out of the string - regex matches '<chars> <nums><char>?' or '<chars> <------>'
            const cCode = cCodeAndCreds.match(/^[A-Z]+\s\d+[A-Z]?\s|^[A-Z]+\s-+/)[0].trim();
            
            //parse the credits out of the string - regex matches '<nums>.<nums>' at the end of the string
            const creditWeight = cCodeAndCreds.match(/\d+\.\d+$/)[0].trim();

            const title = getTextFromClassTag(elm, 'divTableCell colspan-2', 0, 'strong', 0);
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

                    //if text starts with 'Coreqs: '
                    } else if (text.match(/^Coreq:\s/)) { 
                        //remove 'Coreqs: ' from text and set coreqs
                        coreqs = text.replace(/^Coreq:\s/, '');
                    
                    //if text starts with 'Antireqs: '
                    } else if (text.match(/^Antireq:\s/)) { 
                        //remove 'Antireqs: ' from text and set antireqs
                        antireqs = text.replace(/^Antireq:\s/, ''); 
                    }
                }
            } catch (err) {
                console.log(err);
            }

            //add data to json
            data.push({
                cCode: cCode,
                creditWeight: creditWeight,
                title: title,
                desc: desc,
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

        //add to json
        allData.push({
            subject: link['text'],
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
        
    }
}