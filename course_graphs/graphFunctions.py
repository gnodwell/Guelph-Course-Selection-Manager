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

def parsePrereqs(courses):
    if courses == None:
        return []

    pattern = re.compile(r"[a-zA-Z]+\*[0-9]+")
    prereqsList = re.findall(pattern, courses)
    return prereqsList

def generateGraphByCourse(course_graph, all_courses, course):
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
                    print(b)

                    if n["prereqs"]:
                        pattern = re.compile(r"[a-zA-Z]+\*[0-9]+")
                        prereqsList = re.findall(pattern, n["prereqs"])

                        for prereq in prereqsList:
                            course_graph.add_edge(prereq, b)
                            generateGraphByCourse(course_graph, all_courses, prereq)
                    else:
                        print("NO PREREQS")

def main():
    cis = readJSON("cis.json")
    all_courses = readJSON("relations.json")

    graph = pgv.AGraph(directed=True)
    course_graph = pgv.AGraph(directed=True)

    
    #recursively generate graph for specified course
    generateGraphByCourse(course_graph, all_courses, "CIS*2520")


    for k, v in cis.items():
        prereqsList = parsePrereqs(v["prereqs"])
        for prereq in prereqsList:
            graph.add_edge(prereq, k)

    graph.layout(prog='dot')
    # graph.write('cis.dot')
    graph.draw("cis.png")

    #code to display the image using a bash command depending on the OS
    if(platform.system() == 'Linux'):
        bshCmd = "xdg-open cis.png"
        process = subprocess.run(bshCmd, shell=True)
    elif(platform.system() == 'Windows'):
        os.system('cmd /k "cis.png"')
    elif(platform.system() == 'Darwin'):
        commands.getstatusoutput("open cis.png")

    course_graph.layout(prog='dot')
    course_graph.write('course.dot')
    course_graph.draw("course.png")
    
    

if __name__ == '__main__':
    main()
