import json

from createMajorGraphs import getBaseCode
from dataToGraph import getMajorCode

def getCourseInfo(cCode, uni):
    """return the information for a specific course

    Args:
        cCode (String): course code to get information of
        uni (String): the university that the course belongs to

    Returns:
        dict: course information
    """
    #guelph settings
    if uni.lower() == 'guelph':
        #open appropriate data file
        with open('data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        keys = {
            'subject': 'major',
            'data': 'title'
        }

    #waterloo settings
    elif uni.lower() == 'waterloo':
        #open appropriate data file
        with open('waterlooData.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        keys = {
            'subject': 'subject',
            'data': 'data'
        }

    #invalid university
    else:
        return {}
    

    #get base subject code to look for when looping subjects
    baseCode = getBaseCode(cCode)

    #loop through subjects in data
    for subjectData in data:
        #get the subject code
        subjectCode = getMajorCode(subjectData[keys['subject']])

        if baseCode.lower() == subjectCode.lower():
            #get the courses array for the subject
            courses = subjectData[keys['data']]
            
            #loop courses, trying to find course code
            for course in courses:
                if course['cCode'] == cCode:
                    return course

            return {}
            
    return {}