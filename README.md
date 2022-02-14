# W22_CIS3760_Team4 - Sprint 4

<!-- ABOUT SECTION -->
## About 

Sprint 4 tasked us with adding support for another University's course 
catalog to our project. We decided to go with the University of Waterloos
course database. 

### Prerequisites

-NodeJS (https://nodejs.dev/)
-Python 3 (https://www.python.org/downloads/)
-PlayWright (https://playwright.dev/)
-PyGraphiz (https://pypi.org/project/pygraphviz/)

### Installation

To install project:
1. Download/clone the project folder to a compatible system.
2. Navigate to root folder of project. 
3. Run the "setup.sh" shell script by typing "./setup" in shell or terminal.

Note: if an error occurs during step 3 ensure the script is executable by typing the command:
"chmod +x setup.sh".

Install PlayWright:
1. "npm install" in shell.

Install Graphviz and PyGraphiz:
Ubuntu/Debian:
1. "sudo apt-get install graphviz graphviz-dev" in shell.
2. "pip install pygraphviz"


## Usage

To use the webscraper:

1. Navigate to "scraper" folder.
2. Type "node scraper.js"

The scraper will then create a file named "data.json" containing all the 
course data form the UofG course descriptions website.

To use the CLI tool:

1. Ensure the "data.json" file has been created and is in the "scaper" folder.
2. Navigate to root project folder.
3. Type "python3 cli.py" to run program.
4. Use the numbered menu to operate the CLI tool and follow the prompts to perform searchs.

