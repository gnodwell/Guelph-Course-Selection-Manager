import pygraphviz as pgv
import re
import platform

if(platform.system() == 'Linux'):
    import subprocess
elif(platform.system() == 'Windows'):
    import os
elif(platform.system() == 'Darwin'):
    import commands

try:
    from courseGraph import readJSON
except Exception as e:
    flag = 1

def displayGraph(graphName):
    #code to display the image using a bash command depending on the OS
    if(platform.system() == 'Linux'):
        bshCmd = "xdg-open " + graphName + ".png"
        process = subprocess.run(bshCmd, shell=True)
    elif(platform.system() == 'Windows'):
        os.system('cmd /k ' + graphName + ".png")
    elif(platform.system() == 'Darwin'):
        commands.getstatusoutput("open " + graphName +".png")

def drawGraph(graph, graphName):
    graph.layout(prog='dot')
    graph.write(graphName + '.dot')
    graph.draw(graphName + '.png')

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
        #graph.add_node(k)
        if(k[len(k) - 4] == '1'):
            graph.add_node(k, color="red")
        elif(k[len(k) - 4] == '2'):
            graph.add_node(k, color="orange")
        elif(k[len(k) - 4] == '3'):
            graph.add_node(k, color="green")
        elif(k[len(k) - 4] == '4'):
            graph.add_node(k, color="purple")
        else:
            graph.add_node(k)

        #add edges between prereqs and course
        prereqsList = parseReqs(v["prereqs"], majorName)
        for prereq in prereqsList:
            #graph.add_edge(prereq, k)
            if(prereq[len(prereq) - 4] == '1'):
                graph.add_node(prereq, color="red")
                graph.add_edge(prereq, k, color="red", shape="box")
            elif(prereq[len(prereq) - 4] == '2'):
                graph.add_node(prereq, color="orange")
                graph.add_edge(prereq, k, color="orange")
            elif(prereq[len(prereq) - 4] == '3'):
                graph.add_node(prereq, color="green")
                graph.add_edge(prereq, k, color="green")
            elif(prereq[len(prereq) - 4] == '4'):
                graph.add_node(prereq, color="purple")
                graph.add_edge(prereq, k, color="purple")
            else:
                graph.add_edge(prereq, k)
            
            level_counter = level_counter + 1
            

        #add edges in both directions between coreqs and course
        coreqsList = parseReqs(v["coreqs"], majorName)
        for coreq in coreqsList:
            if(coreq[len(coreq) - 4] == '1'):
                graph.add_node(coreq, color="red", shape="box3d")
                graph.add_edge(coreq, k, color="red")
                graph.add_node(k, color="red")
                graph.add_edge(k, coreq, color="red")
            elif(coreq[len(coreq) - 4] == '2'):
                graph.add_node(coreq, color="orange", shape="box3d")
                graph.add_edge(coreq, k, color="orange")
                graph.add_node(k, color="orange")
                graph.add_edge(k, coreq, color="orange")
            elif(coreq[len(coreq) - 4] == '3'):
                graph.add_node(coreq, color="green", shape="box3d")
                graph.add_edge(coreq, k, color="green")
                graph.add_node(k, color="green")
                graph.add_edge(k, coreq, color="green")
            elif(coreq[len(coreq) - 4] == '4'):
                graph.add_node(coreq, color="purple", shape="box3d")
                graph.add_edge(coreq, k, color="purple")
                graph.add_node(k, color="purple")
                graph.add_edge(k, coreq, color="purple")
            else:
                graph.add_edge(coreq, k)
                graph.add_edge(k, coreq)
                

        level_counter = 0
        

def generateGraphByCourse(course_graph, all_courses, course, level_counter):
    """Recursivevly generates a graph for a specified course.

    Args:
        course_graph ([graph]): [empty graph to be generated]
        all_courses ([dict]): [json data of all courses]
        course ([string]): [string of specified course]

    Returns:
        [course_graph]: [graph of specified course]
    """

    if isinstance(all_courses, dict):           #check if all_courses is dict
        for k, v in all_courses.items():        #traverse first layer of json data (ex. "ACCT", "AGR", "ANSC", etc...)
            for b, n in v.items():              #traverse second layer of json data (course codes)
                if (b == course):
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
                            elif(level_counter == 1):
                                course_graph.add_edge(prereq, b, color="orange")
                            elif(level_counter == 2):
                                course_graph.add_edge(prereq, b, color="green")
                            elif(level_counter == 3):
                                course_graph.add_edge(prereq, b, color="purple")
                            elif(level_counter == 4):
                                course_graph.add_edge(prereq, b, color="blue")
                            else:
                                course_graph.add_edge(prereq, b)

                            generateGraphByCourse(course_graph, all_courses, prereq, level_counter + 1)
                    else:
                        #do nothing
                        dummy = 1

def main():
    # all_courses = readJSON("relations.json")

    # graph = pgv.AGraph(directed=True)
    # course_graph = pgv.AGraph(directed=True)

    
    # #recursively generate graph for specified course
    # generateGraphByCourse(course_graph, all_courses, "CIS*3190", 0)


    # generateGraphByMajor(graph, all_courses, "ENGG")

    # drawGraph(course_graph, "CIS*3190")

    # drawGraph(graph, "ENGG")
    
    # displayGraph("CIS*3190.png")

    

    # course_graph.layout(prog='dot')
    # course_graph.write('course.dot')
    # course_graph.draw("course.png")
    
    

if __name__ == '__main__':
    main()
