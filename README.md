# W22_CIS3760_Team4 - Sprint 2

<!-- ABOUT SECTION -->
## About 

Sprint 2 tasked us with adding graphical output for the scraper and cli tools that we created during Sprint 1.
This was done using PyGraphiz which is the python graphiz library. The required graphical output was to create
a graph for all the courses in the CIS major. We went beyond this by allow the user to create a graph for not only 
the CIS major but for every department guelph offers. On top of that, the user can also input a specific course
and receive a graph output of the course and its prerequisites and its prerequisites' prerequisites and so on.

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

