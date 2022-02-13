import pygraphviz as pgv
import os
import subprocess
import json

from dataReader import dataReader as dr
from courseGraphFunctions import courseGraph as cg
from courseGraphFunctions import graphFunctions as gf

#variable to distinguish between guelph and waterloo
#0 = guelph; 1 = waterloo
uni = 0 

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

def displayMajors(all_majors, majorToGraph):
    """Displays options for the user to specify the degree type of the major.

    Args:
        all_majors ([list]): [the list of all majors]
        majorToGraph ([string]): [string of specified major]

    Returns:
        [List]: [specified choice of the user]
    """

    majorToGraph = '(' + majorToGraph.upper() + ')'
    print(majorToGraph)
    majorList = []
    count = 0

    for item in all_majors:
        if majorToGraph in item["text"]:
            count += 1
            print(count, ': ', item["text"])
            majorList.append(item["text"])


    usrChoice = input("\n--> ")
    usrChoice = int(usrChoice)

    if usrChoice > count or usrChoice < 1:
        print("Invalid input! Please enter from the selections.")
        return ""
    else:
        return majorList[usrChoice-1]


def makeGraph():
    """ Creates a graph using the course_graphs/courseGraph.py and course_graphs/graphFunctions.py
    """
    try:
        if uni == 0:
            all_courses = cg.readJSON("courseGraphFunctions/relations.json")
            all_majors = cg.readJSON("scraper/majorPages/majorPages.json")
        elif uni == 1:
            all_courses = cg.readJSON("scraper/uWaterloo/waterlooData.json")
    except:
        data = cg.readJSON("scraper/data.json")
        majorDict = cg.mapMajorCourses(data)

        with open("courseGraphFunctions/relations.json", "w") as f:
            json.dump(majorDict, f)
        all_courses = cg.readJSON("courseGraphFunctions/relations.json")



    #recursively generate graph for specified course
    while True:
        print("Please select the type of graph you would like to create.")
        print("1: Graph by Course")
        print("2: Graph by Department")
        print("3: Graph by Major")
        print("4: Return")
        usrInput = input("\n--> ")
        usrInput = usrInput.strip()
        if (usrInput == "1"):
            print("Please enter what course you would like to graph.")
            courseToGraph = input("\n--> ")

            #create function to test validty
            if not dr.validateCourseCode(courseToGraph, uni):
                continue

            course_graph = pgv.AGraph(directed=True)
            course_graph.graph_attr.update(label="Graph of Requisites for {}".format(courseToGraph))

            created = gf.generateGraphByCourse(course_graph, all_courses, courseToGraph, 0)
            #only draw graphs if a graph was made successfully
            if created:
                gf.drawGraph(course_graph, courseToGraph)
                gf.displayGraph(courseToGraph)

        elif (usrInput == "2"):
            print("Please enter the subject's code you would like to graph.")
            subjectToGraph = input("\n--> ")
            
            subject_graph = pgv.AGraph(directed=True)

            created = gf.generateGraphBySubject(subject_graph, all_courses, subjectToGraph, uni)
            #only draw graphs if a graph was made successfully
            if created:
                gf.drawGraph(subject_graph, subjectToGraph)
                gf.displayGraph(subjectToGraph)

        elif (usrInput == "3"):
            print("Please enter the major's course code you would like to graph.")
            majorToGraph = input("\n--> ")

            #validate the major entered
            count = dr.validateMajorCode(majorToGraph, all_majors)
            if count == 0:
                print("The major (" + majorToGraph.upper() + ") does not exist.")
                continue

            #if the major has more than one degree type
            elif count > 1:
                tempName = majorToGraph
                majorToGraph = ""

                while majorToGraph == "":
                    print("Please select the specific major.")
                    majorToGraph = displayMajors(all_majors, tempName)
                    print("Major to Graph", majorToGraph)


            else:
                majorToGraph = displayMajors(all_majors, majorToGraph)

            #call scraperController to create given major's json file(s)
            try:
                js_file = os.getcwd() + '/scraper/majorPages/scraperController.js'
                p = subprocess.Popen(["node", js_file, majorToGraph], stdout=subprocess.PIPE)
                out = p.stdout.readline()
                print('{} major requirements written to file.\n'.format(majorToGraph))
            except:
                print('{} major could not be parsed to file.\n'.format(majorToGraph))
                continue

            major = cg.readJSON('./scraper/majorPages/includes/' + majorToGraph + '.json')

            with open("./courseGraphFunctions/relations.json", "r") as fc:
                allCourses = json.load(fc)

            major_created = False
            minor_created = False

            major_graph = pgv.AGraph(directed=True)
            majorCourses = gf.getMajorCourses(major)
            #print(majorCourses)

            
            courseInfo = gf.getCourseInfo(majorCourses, allCourses)
            #print(courseInfo)


            #     for x in majorCourses:
            major_created = gf.generateGraphByMajor(major_graph, allCourses, courseInfo)
            #print(major_created)


            # #only draw graphs if a graph was made successfully
            if major_created:
                gf.drawGraph(major_graph, majorToGraph+"-major")
               # gf.displayGraph(majorToGraph)

            minor_graph = pgv.AGraph(directed=True)
            minorCourses = gf.getMinorCourses(major)

            #if minorCourses:
            courseInfo = gf.getCourseInfo(minorCourses, allCourses)
            #print(courseInfo)

                #for x in minorCourses:
            minor_created = gf.generateGraphByMajor(minor_graph, allCourses, courseInfo)

            if minor_created:
                
                gf.drawGraph(minor_graph, majorToGraph+"-minor")
                #gf.displayGraph(majorToGraph)


        elif (usrInput == "4"):
            break
        else:
            print ("Incorrect Input, Please try again. \n")
            continue


def main():
    """The main menu for either searching for a course or drawing a Graph for a course or Major
    """
    global uni

    print("Welcome to our program.")
    while True:
        print("Please choose an option of university.")
        print("1: Guelph")
        print("2: Waterloo")
        print("3: Exit")
        usrInput = input("\n--> ")
        usrInput = usrInput.strip()

        if (usrInput == "1"):
            uni = 0

            while True:
                print("Please choose an option of how to proceed.")
                print("1: Course Search")
                print("2: Make Graph")
                print("3: Return")
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

        elif (usrInput == "2"):

            uni = 1

            while True:
                print("Please choose an option of how to proceed.")
                print("1: Course Search")
                print("2: Make Graph")
                print("3: Return")
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

        elif (usrInput == "3"):
            break

        else:
            print ("Incorrect Input, Please try again. \n")
            continue

        

    print('--x Bye!')


if __name__ == "__main__":
    main()
