const fs = require('fs');
const { initBrowser, writeFile } = require("../scraper");

/**
 * uses html xpath string to find and parse elements on the given browser page, returning data
 * @param {playwright browser page} page
 * @param {string} selector 
 * @return {array} 
 */
const parseElements = async (page, selector) => {

    //using xpath to evaluate elements within the given html element
    const elements = await page.$$eval(selector, element => {
        //stores all data of the html element
        const data = [] 

        /**
         * reads in course code data in given table, returning course codes + extra credits
         * @param {HTML DOM Collection} rows 
         * @returns {Dictionary} 
         */
        const getTableData = (rows) => {
            let codes = []
            let credits = 0.0

            for (let j = 1; j < rows.length; j++) {
                let cells = rows[j].cells;
                for (let i = 0; i < cells.length; i += 3) {
                    //get course code col per row
                    text = cells[i].innerText;

                    //only read data if: is a credit, is a condition, is a course code
                    if (text.includes('Semester')) { //ignore 'Semester'
                        continue
                    } else if (cells[i].colSpan >= 2 && text.match('^[0-9]*\.[0-9]+') == null) { //is a condition
                        codes.push(text)
                        continue
                    } else if (text.match('^[0-9]*\.[0-9]+') != null) { //credit
                        credits += parseFloat(text.match('[0-9]*\.[0-9]+')[0]);
                    } else if (text.includes('or')) {
                        //add on current course to previous to fit 'or' archetype. 
                        //ex: ['CIS*1300', 'OR CIS*1500'] -> ['CIS*1300 OR CIS*1500']
                        codes[codes.length - 1] += ' ' + text; 
                    } else {
                        if (text.includes('\n&')) {
                            text = text.replace(/\n&/g, ' and') //replace & with and
                        }
                        codes.push(text)
                    }
                }
            }

            return {
                courses: codes,
                credits: credits
            };
        }

        /**
         * iterate through list items 
         * @param {HTML DOM Collection} items 
         */
        const getList = (items) => {
            let notes = []
            for (let i = 1; i < items.length; i += 2) {
                notes.push(items[i].innerText);
            }

            return notes;
        }
        
        //apply Array Prototype to HTML DOM NodeList for easier parsing
        let children = [...element[0].children];
        children.forEach(child => {
            /* major program = { 
            *       'title': 'section header', 
            *       'desc': [extra and special notes regarding section], 
            *       'table': [courses, credits, conditions], 
            *       'lists': [other details or exceptions regarding section], 
            *       "footnotes": [details regarding table data] 
            *   }
            */
           
            if (child.localName == "h2" || child.localName == "h3" || child.localName == "h4" || child.localName == "h5" || child.localName == "h6") {
                //make new entry to data per section header
                let tempDict = { 'title': child.innerText, 'desc': [], 'table': [], 'lists': [], "footnotes": [] }
                data.push(tempDict)
            } else if (data.length) {
                if (child.localName == "p") {
                    //descriptions of section, except notes
                    text = child.innerText
                    if (text.slice(0, 5) != "Note:") {
                        data[data.length - 1]['desc'].push(text)
                    }
                } else if (child.localName == "table") {
                    //parse course table per section
                    let table = getTableData(child.rows);
                    data[data.length - 1]['table'].push(table)
                } else if (child.localName == "dl") {
                    //get footnotes per section
                    let footnotes = getList(child.children)
                    data[data.length - 1]['footnotes'].push(footnotes)
                } else if (child.localName == "ul") {
                    //add any existing list content
                    data[data.length - 1]['lists'].push(child.innerText)
                }
            }
            
        });

        return data;
    });

    return elements;
}

const main = async() => {
    let reqs = {}
    let selector = ''
    const userCode = process.argv[2]
    let isFileWritten = false
    
    //read all majors urls
    let f = fs.readFileSync('./scraper/majorPages/majorPages.json');
    const json = JSON.parse(f)

    //initialize browser to go through urls in json
    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/');
    for (const dict of json) {

        //check if userCode is valid
        if (dict['text'].includes(userCode)) {
            await page.goto(dict['url'])
            console.log('Loading requirements of '+ dict['text'] +' major');
    
            //depending on major, use given html xpath selector
            selector = '//*[@id="requirementstextcontainer"]'
            if (dict['text'].includes('(D.V.M.)')) {
                selector = '//*[@id="scheduleofstudiestextcontainer"]'
            }
    
            //parse element children of html xpath selector, write to major's json
            reqs = await parseElements(page, selector);
            writeFile('./scraper/majorPages/includes/'+ dict['text'] +'.json', JSON.stringify(reqs));
            isFileWritten = true
        }
    }

    //inform user whether major file was written successfully
    if (!isFileWritten) {
        console.log('Major does not exist.')
    }

    await page.waitForTimeout(1000);
    console.log('Done! Closing browser.');
    await browser.close();
}

if (require.main === module) {
    main();
} else {
    module.exports = {
        parseElements
    }
}