import json
import re

def getMajorCode(major):
    """parse major code from 'major' key in JSON

    Args:
        major ([String]): [name of major to parse code from]

    Returns:
        [String]: [major code]
    """
    return major[major.find('(')+1:-1]

def getPrereqs(course, data):
    """retrieve course prereqs in string format

    Args:
        course (String): course to find prereqs for
        data (List): course data from course's department

    Returns:
        None | String: course prereqs
    """

    if '*' not in course:
        return None    

    for c in data:
        if c['cCode'] == course:
            return c['prereqs']

    return None

def getNodes(prereqs):
    """get all the to-be-added-node prereqs from string

    Args:
        prereqs (String): course prereqs

    Returns:
        List: all prereqs as nodes to be added
    """

    if not prereqs:
        return []

    #regex searching for course codes or credit requirements
    regex = r"[a-zA-Z]+[*][0-9]+|\d{1,2}[.]\d\d\scredits|work\sexperience|Phase\s\d"
    pattern = re.compile(regex)
    reqsList = re.findall(pattern, prereqs)

    if(len(reqsList) != 0):
        if(reqsList[-1] == "work experience"):
            reqsList[-1] = "EXP"

    return reqsList

def addNodes(node, curr, data):
    """recursively add prereq courses to course's prereqs

    Args:
        node (String): current course being built
        curr (Dictionary): current course's information
        data (List): course data from course's department

    Returns:
        Dictionary: current course's updated information
    """

    curr["name"] = node
    prereqs = getPrereqs(node, data)
    if not prereqs: # prereqs does not exist for given course, return just name
        return curr
    
    curr["children"] = []
    nodes = getNodes(prereqs)
    for node in nodes:
        # recursively search for course child's prereqs
        child = addNodes(node, {}, data)
        # add prereqs of current course to its children list
        curr["children"].append(child)

    return curr

def createGraphJSON(course, data):
    """wrapper for addNodes, called on root course

    Args:
        course (String): course given to build
        data (List): course data from course's department

    Returns:
        Dictionary: root course's updated information
    """

    return addNodes(course, {}, data)

def generateDataset(course):
    """create graph json to be passed to front-end

    Args:
        course (String): course to build
    """


    with open('data.json', 'r') as f:
        data = json.load(f)
    
    currentMajor = ''
    if (course.find('*') != -1 and (len(course) >= 7 and len(course) <= 8)):
        currentMajor = course[:course.find('*')]
    else:
        return {'name': '', 'children': []}

    graphJSON = {'name': '', 'children': []}

    for major in data:
        if getMajorCode(major['major']).lower() == currentMajor.lower():
            mData = major['title']

    for c in mData:
        if c['cCode'].lower() == course.lower():
            graphJSON = createGraphJSON(course, mData)
    

    return graphJSON

    # file = json.dumps(graphJSON, indent=4)
    # with open("graph.json", "w") as f:
    #     f.write(file)

if __name__ == "__main__":
    generateDataset('CIS*3760')