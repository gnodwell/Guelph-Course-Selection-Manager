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
    if '*' not in course:
        return None    

    for c in data:
        if c['cCode'] == course:
            return c['prereqs']

    return None

def getNodes(prereqs):
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
    curr["name"] = node
    prereqs = getPrereqs(node, data)
    if not prereqs:
        return curr
    
    curr["children"] = []
    nodes = getNodes(prereqs)
    for node in nodes:
        child = addNodes(node, {}, data)
        curr["children"].append(child)

    return curr

def createGraphJSON(course, data):
    return addNodes(course, {}, data)

def generateDataset(course):
    with open('data.json', 'r') as f:
        data = json.load(f)

    currentMajor = course[:course.find('*')]
    for major in data:
        if getMajorCode(major['major']) == currentMajor:
            data = major['title']
    graphJSON = createGraphJSON(course, data)

    file = json.dumps(graphJSON, indent=4)
    with open("graph.json", "w") as f:
        f.write(file)

if __name__ == "__main__":
    generateDataset('CIS*3760')