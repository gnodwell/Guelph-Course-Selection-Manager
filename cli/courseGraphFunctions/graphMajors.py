import pygraphviz as pgv
import re
import platform
import json

import graphFunctions as gf

if (platform.system == 'Linux'):
    import subprocess
elif (platform.system == 'Darwin'):
    import commands



orId = 0
ofId = 0
orDict = {}
checkCourses = set()


def getMajorCourses(data):
    ret = []
    flag = 0
    for i in data:
        if (i['title'] == 'Major'):
            for j in i['table']:
                for k in j['courses']:
                    print(k)
                    if (str(k).find("Select") != -1) :
                        flag = 1
                        print("K: ", k)
                    if (flag == 0):
                        ret.append(k)

                print("\n\n")
                return ret


def getMinorCourses(data):
    for i in data:
        print(i)
        if (i['title'] == 'Minor (Honours Program)'):
            for j in i['table']:
                return j['courses']


def getCourseInfo(majorCourses, allCourses):
    courseInfo = {}
    for course in majorCourses:
        hold = course.find("*")
        if (course[0:hold] not in allCourses):
            print("Course Not Found")
        else:
            for k, v in allCourses[course[0:hold]].items():
                if (k == course):
                    courseInfo[course] = v

    return courseInfo





def generateMajorGraph(graph, majorCourses, courseInfo, allCourses):

    for x in majorCourses:
        #print (x)
        gf.generateGraphByMajor(graph, allCourses, x, 0, "ACCT", majorCourses)



def drawGraph(graph, graphName):
    graphName = graphName.replace('*', ' ')
    graph.layout(prog='dot')
    graph.write(graphName + '.dot')
    graph.draw(graphName + '.pdf')

def main():
    majorToGraph = "ACCT"


    with open("../scraper/majorPages/includes/Accounting (ACCT) (B.Comm.).json", "r") as f:
        data = json.load(f)
    with open("relations.json", "r") as f:
        allCourses = json.load(f)

    majorCourses = getMajorCourses(data)
    print("Major Courses: ", majorCourses)
    courseInfo = getCourseInfo(majorCourses, allCourses)
    graph = pgv.AGraph(directed=True)

    generateMajorGraph(graph, majorCourses, courseInfo, allCourses)
    drawGraph(graph, "test")

    #minorCourses = getMinorCourses(data)
    #print("HELLO WORLD")
    #print(minorCourses)
    #minorGraph = pgv.AGraph(directed=True)
    #generateMajorGraph(minorGraph, minorCourses, courseInfo, allCourses)
    #drawGraph(minorGraph, "testMinor")









if (__name__ == "__main__"):
    main()

