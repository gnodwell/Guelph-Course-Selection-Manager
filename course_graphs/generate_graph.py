import json
import pygraphviz as pgv

def readJSON(file="../scraper/data.json"):
    """open file and load json data into 'data'

    Args:
        file ([String]): [name of file to read in and parse JSON]
    """
    with open(file, "r") as f:
        data = json.load(f)

    return data

def getMajorCode(major):
    """parse major code from 'major' key in JSON

    Args:
        major ([String]): [name of major to parse code from]

    Returns:
        [String]: [major code]
    """
    return major[major.find('(')+1:-1]

def mapCoursesPrereqs(courses):
    """map each course in given major to prerequisites of the course

    Args:
        courses ([List]): [json dicts of all courses in major]

    Returns:
        [Dictionary]: [course code mapped to prerequisites]
    """
    prereqDict = {course['cCode'] : course['prereqs'] for course in courses}
    return prereqDict

def mapMajorCourses(majors):
    """map major's code to courses (with prereqs mapped) supplied in major

    Args:
        majors ([List]): [json dicts of all available majors]

    Returns:
        [Dictionary]: [major's code mapped to courses]
    """
    majorDict = {getMajorCode(major['major']) : mapCoursesPrereqs(major['title']) for major in majors}        
    return majorDict

def main():
    data = readJSON()
    majorDict = mapMajorCourses(data)
    
    with open("prereqs.json", "w") as f:
        json.dump(majorDict, f)

    #testing pygraphviz
    G = pgv.AGraph()
    G.add_node("a")
    G.add_node("b")
    G.add_edge("a", "b")
    G.draw("test.png")
if __name__ == '__main__':
    main()  