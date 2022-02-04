const fs = require('fs');
const { initBrowser, writeFile } = require("../scraper");

const findChildren = async (page, selector) => {

    const elements = await page.$$eval(selector, element => {
        const data = []

        const getTableData = (rows) => {
            let codes = []
            let credits = 0.0

            for (let j = 1; j < rows.length; j++) {
                let cells = rows[j].cells;
                for (let i = 0; i < cells.length; i += 3) {
                    text = cells[i].innerText;

                    if (text.includes('Semester')) {
                        continue
                    } else if (cells[i].colSpan >= 2 && text.match('^[0-9]*\.[0-9]+') == null) {
                        codes.push(text)
                        continue
                    } else if (text.match('^[0-9]*\.[0-9]+') != null) {
                        credits += parseFloat(text.match('[0-9]*\.[0-9]+')[0]);
                    } else if (text.includes('or')) {
                        codes[codes.length - 1] += ' ' + text;
                    } else {
                        if (text.includes('\n&')) {
                            text = text.replace(/\n&/g, ' and')
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

        const getList = (rows) => {
            let notes = []
            for (let i = 1; i < rows.length; i += 2) {
                notes.push(rows[i].innerText);
            }

            return notes;
        }

        let children = [...element[0].children];
        children.forEach(child => {
            // console.log(child)

            if (child.localName == "h2" || child.localName == "h3" || child.localName == "h4" || child.localName == "h5" || child.localName == "h6") {
                let tempDict = { 'title': child.innerText, 'desc': [], 'table': [], 'lists': [], "footnotes": [] }
                data.push(tempDict)
            } else if (data.length) {
                if (child.localName == "p") {
                    text = child.innerText
                    if (text.slice(0, 5) != "Note:") {
                        data[data.length - 1]['desc'].push(text)
                    }
                } else if (child.localName == "table") {
                    let table = getTableData(child.rows);
                    data[data.length - 1]['table'].push(table)
                } else if (child.localName == "dl") {
                    let footnotes = getList(child.children)
                    data[data.length - 1]['footnotes'].push(footnotes)
                } else if (child.localName == "ul") {
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
    
    let f = fs.readFileSync('./majorPages.json');
    const json = JSON.parse(f)

    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/');
    for (const dict of json) {
        await page.goto(dict['url'])
        console.log('Loading requirements of '+ dict['text'] +' major');

        let selector = '//*[@id="requirementstextcontainer"]'
        if (dict['text'].includes('(D.V.M.)')) {
            selector = '//*[@id="scheduleofstudiestextcontainer"]'
        }

        reqs = await findChildren(page, selector);
        writeFile('./includes/'+dict['text']+'.json', JSON.stringify(reqs));
    }

    await page.waitForTimeout(1000);
    console.log('Done! Closing browser.');
    await browser.close();
}

if (require.main === module) {
    main();
} else {
    module.exports = {
        findChildren
    }
}