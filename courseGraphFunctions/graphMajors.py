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
    for i in data:
        if (i['title'] == 'Major'):
            for j in i['table']:
                for k in j['courses']:
                    if (str(k).find("Select") != -1) :

                    print("K: ", k)

                return j['courses']


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


def generateGraph(graph, majorCourses, courseInfo):
    for k, v in courseInfo.items():
        if (k[len(k) - 4] == '1'):
            graph.add_node(k, color='red')
            print("Adding 1", k)
        elif(k[len(k) - 4] == '2'):
            graph.add_node(k, color='orange')
            print("Adding 2", k)
        elif(k[len(k) - 4] == '3'):
            graph.add_node(k, color='green')
            print("Adding 3", k)
        elif(k[len(k) - 4] == '4'):
            graph.add_node(k, color='purple')
            print("Adding 4", k)
        else:
            graph.add_node(k)
            print("Adding 5", k)

        prereqsList = gf.parseReqs(v['prereqs'], k[0:k.find('*')])
        gf.addPrereqsToGraph(graph, prereqsList, {}, {}, k)
        coreqsList = gf.parseReqs(v['coreqs'], k[0:k.find('*')])
        gf.addCoreqsToGraph(graph, coreqsList, {}, {}, k)

    return True





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

