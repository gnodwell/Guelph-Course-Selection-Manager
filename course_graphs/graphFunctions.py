import pygraphviz as pgv
import re
import platform

if(platform.system() == 'Linux'):
    import subprocess
elif(platform.system() == 'Windows'):
    import os
elif(platform.system() == 'Darwin'):
    import commands

from courseGraph import readJSON

def parseReqs(courses, majorName):
    """parses coreqs and prereqs, returning the reqs in a list.

    Args:
        courses ([string]): [string of course reqs]

    Returns:
        [List]: [List of course reqs]
    """
    if courses == None:
        return []

    #regex searching for course codes or credit requirements
    regex = re.escape(majorName) + r"[*][0-9]+|\d{1,2}[.]\d\d\scredits|work\sexperience|Phase\s\d"
    pattern = re.compile(regex)
    reqsList = re.findall(pattern, courses)

    if(len(reqsList) != 0):
        if(reqsList[-1] == "work experience"):
            reqsList[-1] = "EXP"

    
    return reqsList

def generateGraphByMajor(graph, all_courses, majorName):
    """Generates a graph for a specified major.

    Args:
        graph ([graph]): [empty graph to be generated]
        all_courses ([dict]): [json data of all courses]
        majorName ([string]): [string of specified major]
    """
    #return if major is not in json
    if majorName not in all_courses: 
        print('Major: "' + majorName + '" does not exists')
        return 


    #loop through courses in specified major
    for k, v in all_courses[majorName].items():
        #add node for course 
        graph.add_node(k)

        #add edges between prereqs and course
        prereqsList = parseReqs(v["prereqs"], majorName)
        for prereq in prereqsList:
            graph.add_edge(prereq, k)

        #add edges in both directions between coreqs and course
        coreqsList = parseReqs(v["coreqs"], majorName)
        for coreq in coreqsList:
            graph.add_edge(coreq, k)
            graph.add_edge(k, coreq)

def generateGraphByCourse(course_graph, all_courses, course, level_counter):
    """Recursivevly generates a graph for a specified course.

    Args:
        course_graph ([graph]): [empty graph to be generated]
        all_courses ([dict]): [json data of all courses]
        course ([string]): [string of specified course]

    Returns:
        [course_graph]: [graph of specified course]
    """
    #check if all_courses is dict
    if isinstance(all_courses, dict):    

        #traverse first layer of json data (ex. "ACCT", "AGR", "ANSC", etc...)
        for k, v in all_courses.items():

            #traverse second layer of json data (course codes)
            for b, n in v.items():

                if (b == course):
                    print(level_counter)
                    print(b)

                    if n["prereqs"]:
                        pattern = re.compile(r"[a-zA-Z]+\*[0-9]+|work\sexperience")
                        prereqsList = re.findall(pattern, n["prereqs"])
                        
                        if(len(prereqsList) != 0):
                            if(prereqsList[-1] == "work experience"):
                                prereqsList[-1] = "EXP"

                        for prereq in prereqsList:
                            if(level_counter == 0):
                                course_graph.add_node(b, shape="box")
                                course_graph.add_edge(prereq, b, color="red", shape="box")
                            if(level_counter == 1):
                                course_graph.add_edge(prereq, b, color="orange")
                            if(level_counter == 2):
                                course_graph.add_edge(prereq, b, color="green")
                            if(level_counter == 3):
                                course_graph.add_edge(prereq, b, color="purple")
                            if(level_counter == 4):
                                course_graph.add_edge(prereq, b, color="blue")
                            else:
                                course_graph.add_edge(prereq, b)

                            generateGraphByCourse(course_graph, all_courses, prereq, level_counter + 1)
                    else:
                        print("NO PREREQS")

def main():
    all_courses = readJSON("relations.json")

    graph = pgv.AGraph(directed=True)
    course_graph = pgv.AGraph(directed=True)

    
    #recursively generate graph for specified course
    generateGraphByCourse(course_graph, all_courses, "CIS*3190", 0)


    generateGraphByMajor(graph, all_courses, "ENGG")

    graph.layout(prog='dot')
    # graph.write('major.dot')
    graph.draw("major.png")

    #code to display the image using a bash command depending on the OS
    if(platform.system() == 'Linux'):
        bshCmd = "xdg-open major.png"
        process = subprocess.run(bshCmd, shell=True)
    elif(platform.system() == 'Windows'):
        os.system('cmd /k "major.png"')
    elif(platform.system() == 'Darwin'):
        commands.getstatusoutput("open major.png")

    course_graph.layout(prog='dot')
    course_graph.write('course.dot')
    course_graph.draw("course.png")
    
    

if __name__ == '__main__':
    main()
