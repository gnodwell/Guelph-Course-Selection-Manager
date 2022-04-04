# W22_CIS3760_Team4 - Sprint 9

## About

Sprint 9 involves refining our graphing feature and adding the ability to "drop a course"
within a graph.

### Prerequisites

- NodeJS (https://nodejs.dev/)
- Python 3 (https://www.python.org/downloads/)
- PlayWright (https://playwright.dev/)
- PyGraphiz (https://pypi.org/project/pygraphviz/)
- NGINX
- React
- Bootstrap
- Flask
- jQuery


## Usage

##### To use the webscraper:

1. Navigate to "scraper" folder.

2. Type "node scraper.js"

  

The scraper will then create a file named "data.json" containing all the

course data form the UofG course descriptions website.

  

##### To use the CLI tool:

1. Ensure the "data.json" file has been created and is in the "scaper" folder.

2. Navigate to root project folder.

3. Type "python3 cli.py" to run program.

4. Use the numbered menu to operate the CLI tool and follow the prompts to perform searchs.

  

##### To use the Web Application:

###### Front-End:

1. Start NGINX web server by typing "sudo systemctl start nginx".

2. Using a browser navigate to "https://131.104.49.104/".

3. Stop NGINX web server by typing "sudo systemctl stop nginx".

  

###### Back-End (uWSGI & Flask):

1. Start uWSGI server by typing "sudo systemctl start api".

2. Using a browser navigate to "https://131.104.49.104/api" to view the API data.

3. Stop uWSGI server by typing "sudo systemctl stop api".

  

#### Web-App Navigation:

1. Navigate web-app by clicking "HOME", "COURSE SEARCH" or "CREATE GRAPHS" tab located in the drawer menu which can be accessed by pressing the button on the top left corner of the screen.

2. On the "Course Search" page enter in textboxes desired requirements and press "SEARCH COURSES". The drop-down filters can also be used. 
>When entering multiple courses into the "Course Pre-requisites" or "Course Co-requisites" boxes, the course codes must be seperate by commas.

4. On the "Create Graph" page click either "GENERATE GRAPH" to show an example graph, then press the close button to close the graph. You can click on a course node to view its information. You are then given the option to drop said course from the graph.
