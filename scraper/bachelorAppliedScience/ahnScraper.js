const { initBrowser, writeFile } = require("../scraper");

const getRequirementsAndFootnotes = async(page) => {

    const data = await page.$$eval('//*[@id="requirementstextcontainer"]/table[1]/tbody/tr/td[1]', rows => {    
        const courses = []
        let credits = 0.0

        rows.forEach(course => {
            text = course.innerText;
            
            if (text.match('^[0-9]*\.[0-9]+') != null) {
                console.log('not null');
                credits += parseFloat(text.match('[0-9]*\.[0-9]+')[0]);
            } else if (text.includes('or')) {
                courses[courses.length-1] += ' ' + text;
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

    const footnotes = await page.$$eval('//*[@id="requirementstextcontainer"]/dl/dd', rows => {
        const notes = []
        rows.forEach(note => {
            console.log(note.innerText)
            notes.push(note.innerText)
        });

        return notes;
    });
    
    data['footnotes'] = footnotes;
    return data;
}

const getAreaOfEmphasis = async(page) => {
    const data = await page.$$eval('//*[@id="requirementstextcontainer"]/table[2]/tbody/tr/td[1]', rows => {
        const courses = []
        const electives = []
        let index = 0

        const hasOr = (arr, text) => {
            if (text.includes('or')) {
                arr[arr.length - 1] += ' ' + text;
            } else {
                arr.push(text)
            }
        }

        rows.forEach(course => {
            let text = course.innerText;

            if (text == 'Restricted Electives' || text == 'Required Courses') {
                index += 1
            } else {
                index == 1 ? hasOr(courses, text) : hasOr(electives, text);
            }
        });

        return {
            required: courses,
            restricted: electives
        };
    });

    data['title'] = await page.textContent('//*[@id="requirementstextcontainer"]/h3');
    return data;
}

const ahnMain = async() => {
    const reqs = {}

    const [browser, page] = await initBrowser('https://calendar.uoguelph.ca/undergraduate-calendar/programs-majors-minors/applied-human-nutrition-ahn/#requirementstext');
    console.log('Loading requirements of AHN major');
    reqs['AHN'] = await getRequirementsAndFootnotes(page);
    reqs['AHN']['AOE'] = await getAreaOfEmphasis(page);

    writeFile('asc.json', JSON.stringify(reqs));

    await page.waitForTimeout(1000);
    console.log('Done! Closing browser.');
    await browser.close();
}

if (require.main === module) {
    ahnMain();
} else {
    module.exports = {
        getRequirementsAndFootnotes, getAreaOfEmphasis
    }
}