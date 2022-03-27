import json
import re

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

def getColor(course):
    levelIndex = course.find('*')

    if (course[levelIndex+1] == '1'):
        return 'red'
    elif (course[levelIndex+1] == '2'):
        return 'yellow'
    elif (course[levelIndex+1] == '3'):
        return 'green'
    else:
        return 'purple'

def createGraphJSON(subject):
    """iterates through all courses in subject and adds nodes of its prereqs

    Args:
        subject (Dictionary): courses offered by subject and its reqs

    Returns:
        Dictionary: graph dataset for front-end
    """
    nodes, links = [], []
    seen = set()

    for course in subject:
        if course not in seen:
            seen.add(course)
            nodeColor = getColor(course)
            nodes.append(
                {
                    "id": course,
                    "color": nodeColor
                }
            )
            
        prereqs = getNodes(subject[course]['prereqs'])
        for p in prereqs:
            if p not in seen:
                seen.add(p)
                nodeColor = getColor(p)
                nodes.append(
                    {
                        "id": p,
                        "color": nodeColor
                    }
                )

            links.append(
                {
                    "source": course,
                    "target": p
                }
            )

    return {
        "nodes": nodes,
        "links": links
    }

def generateDataset(subject):
    """create graph json to be passed to front-end

    Args:
        subject (String): subject to build

    Returns:
        Dict: d3 graph in json format
    """
    if not subject or subject == '':
        return {
            'links': [],
            'nodes': []
        }

    #open relations.json and load it in
    with open('relations.json', 'r', encoding='utf-8') as f:
        relations = json.load(f)

    subject = subject.upper()
    graphJSON = createGraphJSON(relations[subject])

    # file = json.dumps(graphJSON, indent=4)
    # with open("subjectGraph.json", "w") as f:
    #     f.write(file)

    return graphJSON

if __name__ == "__main__":
    generateDataset('CIS')