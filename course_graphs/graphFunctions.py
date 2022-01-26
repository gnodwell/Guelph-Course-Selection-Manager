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

def main():
    cis = readJSON("cis.json")
    graph = pgv.AGraph(directed=True)

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
    
    

if __name__ == '__main__':
    main()
