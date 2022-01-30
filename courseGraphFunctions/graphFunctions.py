from cProfile import label
import pygraphviz as pgv
import re
import platform

if(platform.system() == 'Linux'):
    import subprocess
elif(platform.system() == 'Darwin'):
    import commands

try:
    from courseGraph import readJSON
except Exception as e:
    flag = 1

def displayGraph(graphName):
    """display the image using a bash command depending on the OS

    Args:
        graphName ([String]): [name of graph]
    """
    graphName = graphName.replace('*', '')

    if(platform.system() == 'Linux'):
        bshCmd = "xdg-open " + "graphs/" + graphName + ".pdf"
        process = subprocess.run(bshCmd, shell=True)
    elif(platform.system() == 'Darwin'):
        commands.getstatusoutput("open " + "graphs/" + graphName +".pdf")

def drawGraph(graph, graphName):
    """write out graph to file formats

    Args:
        graph ([AGraph]): [graph to be written out to file]
        graphName ([String]): [name of file that graph is written out to]
    """
    graphName = graphName.replace('*', '')

    graph.layout(prog='dot')
    graph.write('graphs/' + graphName + '.dot')
    graph.draw('graphs/' + graphName + '.pdf')

def parseReqs(courses, majorName):
    """parses coreqs and prereqs, returning the reqs in a list.

    Args:
        courses ([string]): [string of course reqs]
        majorName ([string]): [string of major]

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

def addNodeAndEdge(graph, course1, course2, colour, shape=None):
    """Add a node and edge pointing from course1 to course2 on the graph

    Args:
        graph ([graph]): [graph to make changes to]
        course1 ([string]): [string of first course with arrow pointing to second course]
        course2 ([string]): [string of second course with incoming arrow from first course]
        colour ([string]): [string of colour for arrow and node]
        shape ([string]): [string of shape of the node]
    """

    #add node
    if shape == None: #if no shape input, then don't specify
        graph.add_node(course1, color=colour)
    else: #otherwise specify the shape
        graph.add_node(course1, color=colour, shape=shape)

    #add the edge
    graph.add_edge(course1, course2, color=colour)


def addPrereqsToGraph(graph, prereqsList, course):
    """Add prereqs to the graph by adding the appropriate nodes and edges

    Args:
        graph ([graph]): [graph to make changes to]
        coreqsList ([list]): [list of corequisites for the course]
        course ([string]): [string of specified course]
    """

    #loop through prereqs and add nodes and edges
    for prereq in prereqsList:
        if(prereq[len(prereq) - 4] == '1'): #1000 level node format
            addNodeAndEdge(graph, prereq, course, "red")
        elif(prereq[len(prereq) - 4] == '2'): #2000 level node format
            addNodeAndEdge(graph, prereq, course, "orange")
        elif(prereq[len(prereq) - 4] == '3'): #3000 level node format
            addNodeAndEdge(graph, prereq, course, "green")
        elif(prereq[len(prereq) - 4] == '4'): #4000 level node format
            addNodeAndEdge(graph, prereq, course, "purple")
        else:
            graph.add_edge(prereq, course)

    
def addCoreqsToGraph(graph, coreqsList, course):
    """Add coreqs to the graph by adding the appropriate nodes and edges

    Args:
        graph ([graph]): [graph to make changes to]
        coreqsList ([list]): [list of corequisites for the course]
        course ([string]): [string of specified course]
    """

    #loop through coreqs and add nodes and edges in both directions
    for coreq in coreqsList:
        if(coreq[len(coreq) - 4] == '1'): #1000 level node format
            addNodeAndEdge(graph, coreq, course, "red", "box")
            addNodeAndEdge(graph, course, coreq, "red")
        elif(coreq[len(coreq) - 4] == '2'): #2000 level node format
            addNodeAndEdge(graph, coreq, course, "orange", "box")
            addNodeAndEdge(graph, course, coreq, "orange")
        elif(coreq[len(coreq) - 4] == '3'): #3000 level node format
            addNodeAndEdge(graph, coreq, course, "green", "box")
            addNodeAndEdge(graph, course, coreq, "green")
        elif(coreq[len(coreq) - 4] == '4'): #4000 level node format
            addNodeAndEdge(graph, coreq, course, "purple", "box")
            addNodeAndEdge(graph, course, coreq, "purple")
        else:
            graph.add_edge(coreq, course)
            graph.add_edge(course, coreq)


def generateGraphByMajor(graph, all_courses, majorName):
    """Generates a graph for a specified major.

    Args:
        graph ([graph]): [empty graph to be generated]
        all_courses ([dict]): [json data of all courses]
        majorName ([string]): [string of specified major]
    """
    #make sure major name is in upper case
    majorName = majorName.upper()

    #return if major is not in json
    if majorName not in all_courses: 
        print('Major: "' + majorName + '" does not exists')
        return False

    seenCourses = set()
    #loop through courses in specified major
    for k, v in all_courses[majorName].items():
        #add node for course 
        
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

        #parse prereqs from prereqs attribute
        prereqsList = parseReqs(v["prereqs"], majorName)
        #add the prereqs to the graph by adding edges in a single direction from the prereq to the course
        addPrereqsToGraph(graph, prereqsList, k)
        seenCourses.update(prereqsList)
        
        #parse coreqs from coreqs attribute
        coreqsList = parseReqs(v["coreqs"], majorName)
        #add coreqs to the graph by adding edges in both directions between coreqs and course
        addCoreqsToGraph(graph, coreqsList, k)
        seenCourses.update(coreqsList)

    graph.graph_attr.update(label="Graph of Requisites for {} ({})".format(majorName, len(seenCourses)))
    return True
        
def generateGraphByCourse(course_graph, all_courses, course, level_counter):
    """Recursivevly generates a graph for a specified course.

    Args:
        course_graph ([graph]): [empty graph to be generated]
        all_courses ([dict]): [json data of all courses]
        course ([string]): [string of specified course]

    Returns:
        [course_graph]: [graph of specified course]
    """
    #make sure course name is in upper case
    course = course.upper()

    #return if course code is not in json
    majorName = course[:course.find('*')]
    if majorName not in all_courses: 
        print('Course: "' + course + '" does not exists')
        return False

    if isinstance(all_courses, dict):           #check if all_courses is dict
        for v in all_courses.values():          #traverse first layer of json data (ex. "ACCT", "AGR", "ANSC", etc...)
            for b, n in v.items():              #traverse second layer of json data (course codes)
                if (b == course):

                    #add first node in case of course having no prerequisites
                    if(level_counter == 0):
                        course_graph.add_node(course, shape="box")

                    #if prereqs exist
                    if n["prereqs"]:
                        #regex for parsing prereqs
                        pattern = re.compile(r"[a-zA-Z]+\*[0-9]+|work\sexperience")
                        prereqsList = re.findall(pattern, n["prereqs"])
                        
                        #shorten the work experience prerequisite to exp
                        if(len(prereqsList) != 0):
                            if(prereqsList[-1] == "work experience"):
                                prereqsList[-1] = "EXP"

                        #traverses according to how deep the prereq is for the course
                        #loop through prereqs and add nodes and edges
                        for prereq in prereqsList:
                            if(level_counter == 0): #node format for first level
                                addNodeAndEdge(course_graph, prereq, b, "red")
                            elif(level_counter == 1): #node format for second level
                                addNodeAndEdge(course_graph, prereq, b, "orange")
                            elif(level_counter == 2): #node format for third level
                                addNodeAndEdge(course_graph, prereq, b, "green")
                            elif(level_counter == 3): #node format for fourth level
                                addNodeAndEdge(course_graph, prereq, b, "purple")
                            elif(level_counter == 4): #node format for fifth level
                                addNodeAndEdge(course_graph, prereq, b, "blue")
                            else:
                                course_graph.add_edge(prereq, b)

                            generateGraphByCourse(course_graph, all_courses, prereq, level_counter + 1)

    return True

def main():
    all_courses = readJSON("relations.json")

    graph = pgv.AGraph(directed=True)
    course_graph = pgv.AGraph(directed=True)

    
    #recursively generate graph for specified course
    generateGraphByCourse(course_graph, all_courses, "CIS*3190", 0)


    generateGraphByMajor(graph, all_courses, "ENGG")

    drawGraph(course_graph, "CIS*3190")

    drawGraph(graph, "ENGG")
    
    displayGraph("CIS*3190.pdf")   
    
if __name__ == '__main__':
    main()   