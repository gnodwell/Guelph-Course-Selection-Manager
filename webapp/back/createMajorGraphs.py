import os
import json
import re
import dataToGraph as graphFunctions

def searchFiles(directory, name):
    """searches a directory for a file with the substring 'name'

    Args:
        directory (String): the directory to search in
        name (String): the file to look for

    Returns:
        String: full string of the file
    """

    #loops directories
    for root, dirs, files in os.walk(directory):

        #checks each file for name
        for file in files:
            if name.lower() in file.lower():
                return file

    return ''

def getBaseCode(cCode):
    """gets the base of a course code. Ex. CIS*3760 => CIS

    Args:
        cCode (String): the full course code

    Returns:
        String: the base of the course code
    """
    return cCode[:cCode.find('*')]


def isDup(graphJson, course):
    """checks if course is already in graphJson

    Args:
        graphJson (dict): the graph in json format
        course (String): the course to check for

    Returns:
        Boolean: boolean of whether or not the course in already the json
    """

    #loops through nodes
    for node in graphJson['nodes']:
        #checks node ids
        if node['id'] == course:
            return True

    return False


def getMajorMinorCourses(data, majorMinor):
    """searches the major json to get just the courses back for either the major or minor

    Args:
        data (dict): the json containing the major information
        majorMinor (String): can be either 'major' or 'minor' and checks for that table in the json 

    Returns:
        List: all the courses in the major/minor
    """
    coursesToGraph = []

    #checks each table in the json
    for table in data:

        #checks if the table is the major/minor table
        if majorMinor.lower() in table['title'].lower():

            #loops through tables list
            for courses in table['table']:

                #loops through courses in the table
                for course in courses['courses']:
                    
                    #regex for course code format
                    regex = r"[a-zA-Z]+[*][0-9]+"

                    #checks if the entry is a course code and not just a description
                    for c in re.findall(regex, course):
                        coursesToGraph.append(c)

    return coursesToGraph

def getColor(course):
    levelIndex = course.find('*')

    if (course[levelIndex+1] == '1'):
        return '#2A9D8F'
    elif (course[levelIndex+1] == '2'):
        return '#E9C46A'
    elif (course[levelIndex+1] == '3'):
        return '#F4A261'
    elif (course[levelIndex+1] == '4'):
        return '#E76F51'
    else:
        return '#76CD65'

def createGraphJson(courses, relations):
    """creates a graph in the d3 json format

    Args:
        courses (List): list of courses to graph
        relations (Dict): relations.json relations of all courses

    Returns:
        Dict: d3 graph in json format
    """

    #initialize json
    graphJson = {
        'nodes':[],
        'edges':[]
    }

    #loop through courses to add to graph
    for course in courses:
        baseCode = getBaseCode(course)
        
        #get prereqs for the course from relations json
        prereqs = relations[baseCode][course]['prereqs']

        #turn prereqs string into list
        prereqsList = graphFunctions.getNodes(prereqs)

        #add course as a node if it doesn't already exist
        if not isDup(graphJson, course):
            nodeColor = getColor(course)
            graphJson['nodes'].append({
                'id': course,
                'text': course,
                'color': nodeColor
                # 'name': course
            })
        
        #add its prereqs to json
        for prereq in prereqsList:
            nodeColor = getColor(prereq)
            #add prereq as a node if it doesn't already exist
            if not isDup(graphJson, prereq):
                
                graphJson['nodes'].append({
                    'id': prereq,
                    'text': prereq,
                    'color': nodeColor
                    # 'name': prereq
                })

            #add the links
            graphJson['edges'].append({
                'id': course + '-' + prereq,
                'from': prereq,
                'to': course,
                'color': nodeColor
            })

    return graphJson

def createMajorMinorGraph(majorCode):
    """creates a graph in the d3 json format

    Args:
        majorCode (String): the major code

    Returns:
        Dict: d3 graph in json format
    """
    if not majorCode:
        return {
            'edges': [],
            'nodes': []
            }
        
    #search folder for file with major
    majorJson = searchFiles('includes/', '(' + majorCode + ')')
    if not majorJson:
        return {
            'edges': [],
            'nodes': []
            }


    #open file and load data
    with open('includes/' + majorJson, 'r', encoding='utf-8') as f:
        data = json.load(f)

    #open relations.json and load it in
    with open('relations_guelph.json', 'r', encoding='utf-8') as f:
        relations = json.load(f)

    #get all the courses in the major/minor
    courses = getMajorMinorCourses(data, 'major')

    #turn the information into json
    graphJson = createGraphJson(courses, relations)

    return graphJson

    # file = json.dumps(graphJson, indent=4)
    # with open("majorGraph.json", "w") as f:
    #     f.write(file)



if __name__ == "__main__":
    createMajorMinorGraph('CS')
