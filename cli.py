import pygraphviz as pgv
import re
import platform
import json

if (platform.system() == 'Linux'):
    import subprocess
elif (platform.system() == 'Windows'):
    import os
elif (platform.system() == 'Darwin'):
    import commands

from dataReader import dataReader as dr
from course_graphs import courseGraph as cg
from course_graphs import graphFunctions as gf


def courseSearch():
    """CLI functionality for courseSearch program using dataReader/dataReader.py

    """
    #open file and load json data into 'data'
    with open("scraper/data.json", "r") as f:
        data = json.load(f)

    #Splits each of the majors and stores into the array
    majors = []
    for i in data:
        majors.append(i)

    #Splits each of the classes into individual items and saves into courses
    courses = []
    for i in majors:
        for j in i['title']:
            courses.append(j)
    print("\nWelcome to our course search!")

    while True:
        print("How would you like to search? (Please enter the number associated with the method)")
        print("1: Course Name")
        print("2: Course Code")
        print("3: Semester's Available")
        print("4: Credit Weights")
        print("5: Credit Weights + Semesters Available")
        print("6: Course Name + Semesters Available")
        print("7: Course Name + Credit Weights")
        print("8: Course Level")
        print("9: Courses in Distance Education")
        print("10: Return")
        usrInput = input('\n--> ')
        usrInput = usrInput.strip()

        print('')
        res = []
        if (usrInput == "1") :
            #search coursename
            courseName = input("Please enter the name of the course you are looking for: ")
            res = dr.getCoursesByName(courses, courseName)
        elif (usrInput == "2"):
            #search course code
            courseCode = input("Please enter the code of the course you are looking for: ")
            #error checking the user input
            if dr.validateCourseCode(courseCode):
                res = dr.getCoursesByCode(courses, courseCode)
            else:
                continue
        elif (usrInput == "3"):
            #search semesters
            courseSemester = input("Please enter the semester you are looking for: ")
            res = dr.getCoursesBySemester(courses, courseSemester)
        elif (usrInput == "4"):
            #search credit weights
            courseCredit = input("Please enter the credit weight you are looking for: ")
            #error checking the user input
            if dr.validateCourseCreditWeight(courseCredit):
                res = dr.getCoursesByCredit(courses, courseCredit)
            else:
                continue
        elif (usrInput == "5"):
            #search credit weights + semesters
            courseCredit = input("Please enter the credit weight you are looking for: ")
            if not dr.validateCourseCreditWeight(courseCredit):
                continue
            courseSemester = input("Please enter the semester you are looking for: ")
            print(courseCredit, ' ', courseSemester)
            res = dr.getCoursesByCreditSemesters(courses, courseCredit, courseSemester)
        elif (usrInput == "6"):
            #search course name + semesters
            courseName = input("Please enter the name of the course you are looking for: ")
            courseSemester = input("Please enter the semester you are looking for: ")
            res = dr.getCoursesBySemesterCourseName(courses, courseSemester, courseName)
        elif (usrInput == "7"):
            #search by course name + credits
            courseCredit = input("Please enter the credit weight you are looking for: ")
            if not dr.validateCourseCreditWeight(courseCredit):
                continue
            courseName = input("Please enter the name of the course you are looking for: ")
            res = dr.getCoursesByCourseNameCreditWeights(courses, courseName, courseCredit)
        elif (usrInput == "8"):
            #search course level
            courseLevel = input("Please enter the course level you are looking for: ")
            #error checking the user input
            if dr.validateCourseLevel(courseLevel):
                res = dr.getCoursesByLevel(courses, courseLevel)
            else:
                continue
        elif (usrInput == "9"):
            #search Distance Education
            res = dr.getCourseByDE(courses)
        elif (usrInput == "10"):
            break
        else:
            print ("Incorrect Input, Please try again. \n")
            continue

        dr.printCourses(res)


def makeGraph():
    """ Creates a graph using the course_graphs/courseGraph.py and course_graphs/graphFunctions.py
    """
    try:
        all_courses = cg.readJSON("course_graphs/relations.json")
    except:
        data = cg.readJSON("scraper/data.json")
        majorDict = cg.mapMajorCourses(data)

        with open("course_graphs/relations.json", "w") as f:
            json.dump(majorDict, f)
        all_courses = cg.readJSON("course_graphs/relations.json")


    #recursively generate graph for specified course
    while True:
        print("Please select the type of graph you would like to create.")
        print("1: Graph by Course")
        print("2: Graph by Major")
        print("3: Return")
        usrInput = input("\n--> ")
        usrInput = usrInput.strip()
        if (usrInput == "1"):
            print("Please enter what course you would like to graph.")
            courseToGraph = input("\n--> ")
            #create function to test validty
            course_graph = pgv.AGraph(directed=True)

            gf.generateGraphByCourse(course_graph, all_courses, courseToGraph, 0)
            gf.drawGraph(course_graph, courseToGraph)
            gf.displayGraph(courseToGraph)
            

            # course_graph.layout(prog='dot')
            # course_graph.write('course.dot')
            # course_graph.draw("course.png")
        elif (usrInput == "2"):
            print("Please enter the major's course code you would like to graph.")
            majorToGraph = input("\n--> ")
            #create function to test validity
            graph = pgv.AGraph(directed=True)

            gf.generateGraphByMajor(graph, all_courses, majorToGraph)
            gf.drawGraph(graph, majorToGraph)
            gf.displayGraph(majorToGraph)


            # graph.layout(prog='dot')
            # graph.draw("major.png")

            # if (platform.system() == 'Linux'):
            #     bshCmd = "xdg-open major.png"
            #     process = subprocess.run(bshCmd, shell=True)
            # elif (platform.system() ==  'Windows'):
            #     os.system('cmd /k "major.png"')
            # elif (platform.system() == 'Darwin'):
            #     commands.getstatusoutput("open major.png")
        elif (usrInput == "3"):
            break
        else:
            print ("Incorrect Input, Please try again. \n")
            continue


def main():


    print("Welcome to our program.")
    while True:
        print("Please choose an option of how to proceed.")
        print("1: Course Search")
        print("2: Make Graph")
        print("3: Exit")
        usrInput = input("\n--> ")
        usrInput = usrInput.strip()

        if (usrInput == "1"):
            courseSearch()
        elif (usrInput == "2"):
            makeGraph()
        elif (usrInput == "3"):
            break
        else:
            print ("Incorrect Input, Please try again. \n")
            continue

    print('--x Bye!')


if __name__ == "__main__":
    main()
