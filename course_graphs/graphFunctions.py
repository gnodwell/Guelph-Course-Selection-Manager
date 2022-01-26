import pygraphviz as pgv
import re 

from courseGraph import readJSON

def parsePrereqs(courses):
    if courses == None:
        return []

    pattern = re.compile(r"[a-zA-Z]+\*[0-9]+")
    prereqsList = re.findall(pattern, courses)
    return prereqsList

def main():
    cis = readJSON("course_graphs/cis.json")
    graph = pgv.AGraph(directed=True)

    for k, v in cis.items():
        prereqsList = parsePrereqs(v["prereqs"])
        for prereq in prereqsList:
            graph.add_edge(prereq, k)

    graph.layout(prog='dot')
    # graph.write('cis.dot')
    graph.draw("cis.png")

if __name__ == '__main__':
    main()
