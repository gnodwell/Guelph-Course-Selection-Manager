import json

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

def mapCoursesInfo(courses):
    """map each course in given major to prerequisites, corequisites, and equates of the course

    Args:
        courses ([List]): [json dicts of all courses in major]

    Returns:
        [Dictionary]: [course code mapped to prerequisites, corequisites, and equates]
    """

    relations = {}
    for course in courses:
        relations[course['cCode']] = {
            "prereqs": course['prereqs'],
            "coreqs": course['coreqs'],
            "equates": course['equates']
        }

    return relations

def mapMajorCourses(majors):
    """map major's code to courses (with prereqs mapped) supplied in major

    Args:
        majors ([List]): [json dicts of all available majors]

    Returns:
        [Dictionary]: [major's code mapped to courses]
    """
    majorDict = {getMajorCode(major['major']) : mapCoursesInfo(major['title']) for major in majors}        
    return majorDict

def main():
    data = readJSON()
    majorDict = mapMajorCourses(data)
    
    with open("relations.json", "w") as f:
        json.dump(majorDict, f)
    
if __name__ == '__main__':
    main()  