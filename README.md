# W22_CIS3760_Team4 - Sprint 1

<!-- ABOUT SECTION -->
## About 

Sprint 1 required us to create a web scraper using PlayWright (https://playwright.dev/) and either Node.JS or Python. 
It then required us to create a CLI (command line interface) to search and view the data provided by the scraper.

The webscraper we created scrapes data from the University of Guelph course descriptions website (https://calendar.uoguelph.ca/undergraduate-calendar/course-descriptions/)
and saves the data of all courses at UofG into a JSON file. The data is in the format: course code, course name, course description, semesters offered, lecture times, 
restrictions, offerings, credit weight, department, location, prerequesites and equates. We created the webscraper using NodeJS.

The CLI we created allows the user to search and filter courses by:
-Name
-Course Code
-Semester's Available
-Credit Weights
-Credit Weights + Semesters Available
-Course Name + Semesters Available
-Course Name + Credit Weights
-Course Level
-Courses in Distance Education

We created the CLI tool using Python 3.

### Prerequisites

-NodeJS (https://nodejs.dev/)
-Python 3 (https://www.python.org/downloads/)
-PlayWright (https://playwright.dev/)

### Installation

To install project:
1. Download/clone the project folder to a compatible system.
2. Navigate to root folder of project. 
3. Run the "setup.sh" shell script by typing "./setup" in shell or terminal.

Note: if an error occurs during step 3 ensure the script is executable by typing the command:
"chmod +x setup.sh".



Install PlayWright:
1. "npx playwright install" in shell.


## Usage

To use the webscraper:

1. Navigate to "scraper" folder.
2. Type "npx run scraper.js"

The scraper will then create a file named "data.json" containing all the 
course data form the UofG course descriptions website.

To use the CLI tool:

1. Ensure the "data.json" file has been created and is in the "scaper" folder.
2. Navigate to root project folder.
3. Type "python3 dataReader.py"
4. Use the numbered menu to operate the CLI tool and follow the prompts to perform searchs.









