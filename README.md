# W22_CIS3760_Team4 - Sprint 9

  
<!-- ABOUT SECTION -->

## About

Sprint 9 involves further refining and adding a "drop course" function to the graphing feature of our 
project.



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


<!-- INSTALL SECTION -->

## Installation

#### LOCAL

###### To install project:

1. Download/clone the project folder to a compatible system.
2. Navigate to root folder of project.
3. Navigate to "installationScripts" folder of project.
4. Run the "setup.sh" shell script by typing "./setup" in shell or terminal.

>If an error occurs during step 3 ensure the script is executable by typing the command: "chmod +x setup.sh".
>

###### Install PlayWright (Ubuntu/Debian):

1. "npm install" in shell.

  

###### Install Graphviz and PyGraphiz (Ubuntu/Debian):

1. "sudo apt-get install graphviz graphviz-dev" in shell.

2. "pip install pygraphviz"

  
#### WEB APP

###### Front-End Setup:

1. Navigate to root folder of project.

2. Navigate to "installationScripts" folder.

3. Navigate to "nginx_config" folder within "installationScripts" folder.

4. Copy "self-signed.conf" and "ssl-params.conf" to NGINX "snippets" directory (usually located @ /etc/nginx/snippets/).

5. Copy "131.104.49.104" and "default" to NGINX "sites-available directory" directory (usually located @ /etc/nginx/site-availible/) overwrite files if necessary.

6. Run "webAppSetup.sh"

  

###### Back-End Setup:

1. Navigate to root webapp/back/ folder of project.

2. Open api.ini with text-editor.

3. Change chdir value to be the path to the "back" folder on your machine" (Ex: "chdir = {project_director}/w22_cis3760_team4/webapp/back/" without quotations in file).

>*{project_directory} is the path to the directory which you have the project in.*

4. Within the same directory of api.ini, create and save a new file that will process all web requests sent - api.sock

5. Copy "api.service" to NGINX "system directory" directory (usually located @ /etc/systemd/system/) overwrite files if necessary.

  

<!-- USAGE SECTION -->

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

NOTE: The ip address used in the examples below is for the demo server. This
will need to be changed to your host's address in order for you to access the
web application on your server.

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
>When entering input in the "Course Pre-requisites" or "Course Co-requisites" boxes, the course codes must be seperate by commas.

4. On the "Create Graph" page click either "GENERATE GRAPH" to show an example graph or "CLEAR GRAPH" to clear the graph.
