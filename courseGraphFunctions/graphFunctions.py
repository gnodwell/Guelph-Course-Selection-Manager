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

orId = 0
ofId = 0
orDict = {}
checkedCourses = set()
#isOut = 0

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

	#print("here2")

def drawGraph(graph, graphName):
	"""write out graph to file formats

	Args:
		graph ([AGraph]): [graph to be written out to file]
		graphName ([String]): [name of file that graph is written out to]
	"""
	graphName = graphName.replace('*', '')

	graph.layout(prog='dot')
	graph.write('./graphs/' + graphName + '.dot')
	graph.draw('./graphs/' + graphName + '.pdf')


def cleanUpString(string):
	"""Corrects the format of the string in terms of ' 's and ','s.

	Args:
		string ([string]): [the string to be cleaned up]

	Returns:
		[string]: [the cleaned up string]
	"""
	#removing any incorrect formatting with ','s and spaces
	for i in range(len(string)):
		if(i >= len(string)):
			break
		else:
			if string[i] == ' ':
				if string[i+1] == ',':
					string = string[0:i] + string[i+1:]
	return string

def isOrOutsideBrackets(courses):
	"""Determines if the string has an 'or' outside of the brackets.

	Args:
		courses ([string]): [the string to be checked]

	Returns:
		[int]: [the integer to represent yes or no; 1: yes and 0: no]
	"""
	if courses == None:
		return 0

	orList = [(i) for i in find_all(courses, 'or')]

	openBr = 0 #number of open brackets
	closeBr = 0 #number of closed brackets

	#counts the number of open brackets and closed brackets on the left side of each 'or'
	for idx in orList:
		startIdx = idx
		while startIdx != -1:
			if courses[startIdx] == '(' or courses[startIdx] == '[':
				openBr += 1
			elif courses[startIdx] == ')' or courses[startIdx] == ']':
				closeBr += 1
			startIdx -= 1
		#if they are equal then, there is an 'or' outside of brackets
		if openBr == closeBr:
			#now check if the 'or' is between courses or between two complete set of brackets
			if checkOrPos(courses, idx) or checkBr(courses, idx):
				return 1
		openBr = 0
		closeBr = 0

	return 0

def checkBr(courses, idx):
	if not courses == None:
		flagA = 0
		flagB = 0
		flagFirst = 0
		flagSecond = 0
		startIdx = idx

		while flagFirst != 1 and startIdx != -1:
			if courses[startIdx] == ')' and flagB == 0:
				flagA = 1
				flagFirst = 1
			elif courses[startIdx] == '(' and flagA == 0:
				flagB = 1
			startIdx -= 1

		flagA = 0
		flagB = 0

		startIdx = idx
		while flagSecond != 1and startIdx != len(courses):
			if courses[startIdx] == '(' and flagB == 0:
				flagA = 1
				flagSecond = 1
			elif courses[startIdx] == ')' and flagA == 0:
				flagB = 1
			startIdx += 1

		if flagFirst and flagSecond:
			return 1


	else:
		return 0

def checkOrPos(courses, idx):

	
	if not courses == None:
		regex = r"[a-zA-Z+\*[0-9]+"
		pattern = re.compile(regex)
		cList = re.findall(pattern, courses)

		for i in range(len(cList)):
			j = i + 1
			for j in range(len(cList)):
				if (courses.find(cList[i]) + len(cList[i])) == idx and (courses.find(cList[j]) - len(cList[j])) == idx:
					return 1
	else:
		return 0

def getOrDict(graph, courses, course, isOut):
	"""Creates a dictionary for all other 'or's inside of brackets.

	Args:
		graph ([AGraph]): [the graph to be modified]
		courses ([string]): [the string of prerequisites]
		course ([string]): [the course with prerequisites]
		isOut ([int]): [determines if the 'courses' string has an 'or' outside of brackets]
	"""

	# go through the string and get the 'or's
	if courses == None:
		return

	idxList = [(i) for i in find_all(courses, 'or')]

	foundStart = 0
	foundEnd = 0
	startIdx = 0
	endIdx = 0
	flagFirst = 0
	tempList = []

	global orDict

	#determine whether or not each 'or' is in brackets
	for idx in idxList:
		startIdx = idx
		endIdx = idx

		#try to find the starting bracket before an ending bracket
		while(foundStart != 1 and startIdx != -1):
			if (courses[startIdx] == '('  or courses[startIdx] == '[') and flagFirst == 0:
				foundStart = 1
				flagFirst = 1
			elif (courses[startIdx] == ')' or courses[startIdx] == ']') and flagFirst == 0:
				flagFirst = 1
			startIdx -= 1

		flagFirst = 0
		#try to find the ending bracket
		while(foundEnd != 1 and endIdx != len(courses)):
			if (courses[endIdx] == ')' or courses[endIdx] == ']') and flagFirst == 0:
				foundEnd = 1
				flagFirst = 1
			elif (courses[endIdx] == '(' or courses[endIdx] == '[') and flagFirst == 0:
				flagFirst = 1
			endIdx += 1

		#if the 'or' is in brackets
		if foundStart and foundEnd:
			#shorten the string to only the brackets
			string = courses[startIdx+1:endIdx]

			#find the courses in the string
			regex = r"[a-zA-Z]+\*[0-9]+"
			pattern = re.compile(regex)
			courseList = re.findall(pattern, string)

			#add the list to a temporary list
			tempList.append(courseList)

		foundEnd = 0
		foundStart = 0

	#set the key as the course and the val as its requisites
	orDict[course] = tempList
	i = 0
	for cList in orDict[course]:
		for elem in cList:
			#create an 'or' node for each bracket containing prereq joined with an 'or'
			graph.add_node('or'+str(course)+str(i), label='or', shape='diamond')
			#print("CREATED")

			#if the course has an 'or' outside of brackets then,
			#connect the newly created 'or' to the course's 'or' node
			if isOut:
				graph.add_edge('or'+str(course)+str(i), 'or'+str(orId))

			#otherwise, connect the newly created 'or' node directly to the course
			else:
				graph.add_edge('or'+str(course)+str(i), course)
		i += 1

def find_all(courses, sub):
	"""Finds all indexes of the substring found in the 'courses' string.

	Args:
		courses ([string]): [the string to be checked]
		sub ([string]): [the substring to check for in the string]

	Returns:
		[int]: [the indexes of the substrings found]
	"""

	#add all found indexes of a sub string to a list
	i = courses.find(sub)
	while i != -1:
		yield i
		i = courses.find(sub, i+1)

def getTheOfRequisites(graph, courses, subStr, course, isOrOutside):
	"""Gets the dictionary of '1 of' or '2 of' nodes in the prerequisites.

	Args:
		graph ([AGraph]): [the graph to be modified]
		courses ([string]): [the string of the prerequisites]
		subStr ([string]): [the substring '1 of' or '2 of']
		course ([string]): [the course with prerequisites]
		isOrOutside ([int]): [determines if the 'courses' string has an 'or' outside of brackets]

	Returns:
		[dict]: [the dictionary of '1 of' or '2 of' nodes]
	"""
	global ofId

	#if courses is not empty
	if courses:

		#incase there is a typo of '1of' instead of '1 of'
		if '1of' in courses:
			courses = courses.replace("1of", "1 of")

		#if the substring exists in the string
		if subStr in courses:

			#clean up the string
			cleanStr = cleanUpString(courses)

			#regex for prereqa with '1 of ...' format
			regex = re.escape(subStr) + r"(([a-zA-Z]+\*[0-9]+,*|\s[a-zA-Z]+\*[0-9]+,*)+)"
			#print(regex)
			pattern = re.compile(regex)
			ofList = re.findall(pattern, cleanStr)
			#print(ofList)

			d = {}

			#putting the list of '1 of ...' substrings into a dictionary
			for ele in ofList:
				d[ofId] = ele[0]
				graph.add_node('of'+str(ofId), label=subStr, shape='diamond')

				#if the course has an 'or' node, connect it to the '1 of' or '2 of' node
				if not isOrOutside:
					graph.add_edge('of'+str(ofId), course)

				ofId += 1

			return d

	return {}

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

def connectOrOf(isOrOutside, graph, keyVal, course1, colour, style):
	"""Helper for addNodeAndEdge. Handles connecting the "Or" and "Of" edge cases.
	Args:
		isOrOutside ([int]): [determines if the 'courses' string has an 'or' outside of brackets]
		graph ([AGraph]): [the graph to be modified]
		keyVal ([int]): [the key for the '1 of' or '2 of' dicts]
		course1 ([string]): [the course with prerequisites]
		colour ([string]): [the colour of the edge]
		style ([string]): [the style of the edge]
	"""
	#connect the 'or' node to the 'of' node, and course1 to the 'of' node
	if isOrOutside:
		graph.add_edge('of'+str(keyVal), 'or'+str(orId))
		graph.add_edge(course1, 'of'+str(keyVal), color=colour, style=style)

	#otherwise connect the course to the 'of'
	else:
		graph.add_edge(course1, 'of'+str(keyVal), color=colour, style=style)

def checkKeyInDict(oneOfDict, twoOfDict, course1, isIn, keyVal):
	"""Helper for addNodeAndEdge. Handles connecting the "Or" and "Of" edge cases.
	Args:
		oneOfDict ([dict]): [the dictionary of '1 of' nodes]
		oneOfDict ([dict]): [the dictionary of '2 of' nodes]
		course1 ([string]): [the pre-requisite]
		isIn ([int]): [determines if the course is in any of the dictionaries]
		keyVal ([int]): [the key for the '1 of' or '2 of' dicts]

	Return:
		ret ([list]): [the list containing isIn and keyVal]
	"""

	ret = []

	#go through the dictionary to find course1
	#if true then set isIn to 1
	for key in oneOfDict:
		oneList = oneOfDict[key]

		if course1 in oneList:
			isIn = 1
			keyVal = key
			ret.append(isIn)
			ret.append(keyVal)
			

	#go through the dictionary to find course1
	#if then set isIn to 2
	for key in twoOfDict:
		twoList = twoOfDict[key]
		if course1 in twoList:
			isIn = 2
			keyVal = key
			ret.append(isIn)
			ret.append(keyVal)
			
	return ret


def keyInDict(i, orDict, course1, course2, graph):
	"""Helper for addNodeAndEdge. Handles connecting the "Or" and "Of" edge cases.
	Args:
		i ([int]): [the index counter of the dictionary]
		isConnected ([int]): [determines if a course is connected to the course's 'or' node]
		course1 ([string]): [the pre-requisite]
		course2 ([string]): [the course with pre-requisites]
		graph ([AGraph]): [the graph to be modified]
	"""
	#check to see if the prereq is connected to the course through an 'or'
	#if so connect the prereq's 'or' node to the course's or node
	for key1 in orDict:
		if key1 == course2:
			for cList in orDict[key1]:
				if course1 in cList:
					graph.add_edge(course1, 'or'+str(course2)+str(i))
					return 1
				i += 1
	#print(isConnected)

def addNodeAndEdge(graph, course1, course2, colour, oneOfDict, twoOfDict, isOrOutside, shape=None):
	"""Add a node and edge pointing from course1 to course2 on the graph

	Args:
		graph ([graph]): [graph to make changes to]
		course1 ([string]): [string of first course with arrow pointing to second course]
		course2 ([string]): [string of second course with incoming arrow from first course]
		colour ([string]): [string of colour for arrow and node]
		shape ([string]): [string of shape of the node]
	"""
	#global isOut
	global orDict
	global orId

	#add node
	if shape == None: #if no shape input, then don't specify
		graph.add_node(course1, color=colour)
	else: #otherwise specify the shape
		graph.add_node(course1, color=colour, shape=shape)

	#check if the node is a '1 of', '2 of', or 'EXP' first
	#then change the type of edge depending on the condition and add the edge
	#print(isOut)

	isIn = 0 #used to check if the course is in oneOfDict, twoOfDict or none; 0 = none; 1 = oneOfDict; 2 = twoOfDict
	keyVal = 0 #the key of the dictionary

	ret = checkKeyInDict(oneOfDict, twoOfDict, course1, isIn, keyVal)
	if ret:
		isIn = ret[0]
		keyVal = ret[1]
	#print("isIn: ", isIn)
	#print("keyVal: ", keyVal)

	#if course1 is in oneOfDict
	if isIn == 1:
		connectOrOf(isOrOutside, graph, keyVal, course1, colour, style='dashed')

	#if course1 is in twoOfDict    
	elif isIn == 2:
		connectOrOf(isOrOutside, graph, keyVal, course1, colour, style='dotted')

	#if course1 is not in either
	elif isIn == 0:
		if course1 == 'EXP':
			#if the course has an 'or' node
			if isOrOutside:
				i = 0
				isConnected = 0

				isConnected = keyInDict(i, orDict, course1, course2, graph)

				#otherwise, connect the prereq to the course's 'or' node
				if not isConnected:              
					graph.add_edge(course1, 'or'+str(orId), color=colour)

			else:
				i = 0
				isConnected = 0

				isConnected = keyInDict(i, orDict, course1, course2, graph)   

				#otherwise, connect the prereq to the course's 'or' node
				if not isConnected:
					graph.add_edge(course1, course2, color=colour)
			
		elif course1 == 'IDEV reg.':
			
			#otherwise connect the node
			if isOrOutside:
				i = 0
				isConnected = 0

				isConnected = keyInDict(i, orDict, course1, course2, graph)

				#otherwise, connect the prereq to the course's 'or' node
				if not isConnected:          
					graph.add_edge(course1, 'or'+str(orId), color=colour)

			else:
				i = 0
				isConnected = 0

				isConnected = keyInDict(i, orDict, course1, course2, graph)

				if not isConnected:
					graph.add_edge(course1, course2, color=colour)
		else:
			#otherwise connect the node
			if isOrOutside:
				i = 0
				isConnected = 0

				isConnected = keyInDict(i, orDict, course1, course2, graph)

				#otherwise, connect the prereq to the course's 'or' node
				if not isConnected:
					graph.add_edge(course1, 'or'+str(orId), color=colour)

			else:
				i = 0
				isConnected = 0

				isConnected = keyInDict(i, orDict, course1, course2, graph) 

				#otherwise, connect the prereq to the course's 'or' node
				if not isConnected:
					graph.add_edge(course1, course2, color=colour)

	

def addPrereqsToGraph(graph, prereqsList, oneOfDict, twoOfDict, course, isOut):
	"""Add prereqs to the graph by adding the appropriate nodes and edges

	Args:
		graph ([graph]): [graph to make changes to]
		coreqsList ([list]): [list of corequisites for the course]
		course ([string]): [string of specified course]
	"""

	#loop through prereqs and add nodes and edges
	for prereq in prereqsList:
		#print("PREREQ: ", prereq)
		if(prereq[len(prereq) - 4] == '1'): #1000 level node format
			addNodeAndEdge(graph, prereq, course, "red", oneOfDict, twoOfDict, isOut)
		elif(prereq[len(prereq) - 4] == '2'): #2000 level node format
			addNodeAndEdge(graph, prereq, course, "orange", oneOfDict, twoOfDict, isOut)
		elif(prereq[len(prereq) - 4] == '3'): #3000 level node format
			addNodeAndEdge(graph, prereq, course, "green", oneOfDict, twoOfDict, isOut)
		elif(prereq[len(prereq) - 4] == '4'): #4000 level node format
			addNodeAndEdge(graph, prereq, course, "purple", oneOfDict, twoOfDict, isOut)
		else:
			graph.add_edge(prereq, course)

def addCoreqsToGraph(graph, coreqsList, oneOfDict, twoOfDict, course, isOut):
	"""Add coreqs to the graph by adding the appropriate nodes and edges

	Args:
		graph ([graph]): [graph to make changes to]
		coreqsList ([list]): [list of corequisites for the course]
		course ([string]): [string of specified course]
	"""

	#loop through coreqs and add nodes and edges in both directionsDict
	for coreq in coreqsList:
		if(coreq[len(coreq) - 4] == '1'): #1000 level node format
			addNodeAndEdge(graph, coreq, course, "red", oneOfDict, twoOfDict, isOut, "box")
			addNodeAndEdge(graph, course, coreq, "red", oneOfDict, twoOfDict, isOut)
		elif(coreq[len(coreq) - 4] == '2'): #2000 level node format
			addNodeAndEdge(graph, coreq, course, "orange", oneOfDict, twoOfDict, isOut, "box")
			addNodeAndEdge(graph, course, coreq, "orange", oneOfDict, twoOfDict, isOut)
		elif(coreq[len(coreq) - 4] == '3'): #3000 level node format
			addNodeAndEdge(graph, coreq, course, "green", oneOfDict, twoOfDict, isOut, "box")
			addNodeAndEdge(graph, course, coreq, "green", oneOfDict, twoOfDict, isOut)
		elif(coreq[len(coreq) - 4] == '4'): #4000 level node format
			addNodeAndEdge(graph, coreq, course, "purple", oneOfDict, twoOfDict, isOut, "box")
			addNodeAndEdge(graph, course, coreq, "purple", oneOfDict, twoOfDict, isOut)
		else:
			graph.add_edge(coreq, course)
			graph.add_edge(course, coreq)

def generateGraphBySubject(subject_graph, all_courses, subjectName):
	"""Generates a graph for a specified major.

	Args:
		graph ([graph]): [empty graph to be generated]
		all_courses ([dict]): [json data of all courses]
		majorName ([string]): [string of specified major]
	"""
	#make sure major name is in upper case
	subjectName = subjectName.upper()

	#return if major is not in json
	if subjectName not in all_courses:
		print('Subject: "' + subjectName + '" does not exists')
		return False

	seenCourses = set()

	#loop through courses in specified major
	for k, v in all_courses[subjectName].items():
		#add node for course

		if(k[len(k) - 4] == '1'):
			subject_graph.add_node(k, color="red")
		elif(k[len(k) - 4] == '2'):
			subject_graph.add_node(k, color="orange")
		elif(k[len(k) - 4] == '3'):
			subject_graph.add_node(k, color="green")
		elif(k[len(k) - 4] == '4'):
			subject_graph.add_node(k, color="purple")
		else:
			subject_graph.add_node(k)

		#parse prereqs from prereqs attribute
		prereqsList = parseReqs(v["prereqs"], subjectName)
		print(prereqsList)

		#add the prereqs to the graph by adding edges in a single direction from the prereq to the course
		addPrereqsToGraph(subject_graph, prereqsList, {}, {}, k, 0)
		seenCourses.update(prereqsList)

		#parse coreqs from coreqs attribute
		coreqsList = parseReqs(v["coreqs"], subjectName)
		#add coreqs to the graph by adding edges in both directions between coreqs and course
		addCoreqsToGraph(subject_graph, coreqsList, {}, {}, k, 0)
		seenCourses.update(coreqsList)

	#subject_graph.graph_attr.update(label="Graph of Requisites for {} ({})".format(subjectName, len(seenCourses)))
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

	global orDict
	global checkedCourses

	#return if course code is not in json
	majorName = course[:course.find('*')]
	if majorName not in all_courses and level_counter == 0:
		print('Course: "' + course + '" does not exists')
		return False

	if isinstance(all_courses, dict):           #check if all_courses is dict
		for v in all_courses.values():          #traverse first layer of json data (ex. "ACCT", "AGR", "ANSC", etc...)
			for b, n in v.items():              #traverse second layer of json data (course codes)
				if (b == course):

					#print("COURSE: ", b)
					#add first node in case of course having no prerequisites
					if(level_counter == 0):
						course_graph.add_node(course, shape="box")

					#if prereqs exist
					if n["prereqs"]:
						#regex for parsing prereqs
						pattern = re.compile(r"[a-zA-Z]+\*[0-9]+|work\sexperience|\d{1,2}[.]\d\d\scredits|International\sDevelopment")
						prereqsList = re.findall(pattern, n["prereqs"])


						#shorten the work experience prerequisite to exp
						#shorten international development to IDEV reg.
						idx = 0
						for c in prereqsList:
							if c == "work experience":
								prereqsList[idx] = "EXP"
							elif c == "International Development":
								prereqsList[idx] = "IDEV reg."
							idx += 1



						#check if there is an 'or' outside of brackets in the prereqs
						isOut = isOrOutsideBrackets(n["prereqs"])
						#print("isOut = ", isOut)

						#print("isOut = ", isOut)
						#if there is an 'or' outside, then create an 'or' node and connect it to the course
						if isOut:

							global orId

							#orDict[orId] = b
							orId += 1
							course_graph.add_node('or'+str(orId), label='or', shape='diamond')
							course_graph.add_edge('or'+str(orId), b)
							#print("CREATED")



						#parse the prereqs string to check for other 'or's in brackets
						getOrDict(course_graph, n["prereqs"], b, isOut)
						#print ("orDict = ", orDict)


						#creating the dictionaries for the format of '1 of ...' and '2 of ...'
						oneOfDict = getTheOfRequisites(course_graph, n["prereqs"], "1 of", b, isOut)
						twoOfDict = getTheOfRequisites(course_graph, n["prereqs"], "2 of", b, isOut)

						#print("oneOfDict = ", oneOfDict)
						#print("twoOfDict = ", twoOfDict)

						#traverses according to how deep the prereq is for the course
						#loop through prereqs and add nodes and edges
						#connect an edge between the 'or' node and its prereqs
						for prereq in prereqsList:
							if(level_counter == 0): #node format for first level
								addNodeAndEdge(course_graph, prereq, b, "red", oneOfDict, twoOfDict, isOut)
							elif(level_counter == 1): #node format for second level
								addNodeAndEdge(course_graph, prereq, b, "orange", oneOfDict, twoOfDict, isOut)
							elif(level_counter == 2): #node format for third level
								addNodeAndEdge(course_graph, prereq, b, "green", oneOfDict, twoOfDict, isOut)
							elif(level_counter == 3): #node format for fourth level
								addNodeAndEdge(course_graph, prereq, b, "purple", oneOfDict, twoOfDict, isOut)
							elif(level_counter == 4): #node format for fifth level
								addNodeAndEdge(course_graph, prereq, b, "blue", oneOfDict, twoOfDict, isOut)
							else:
								course_graph.add_edge(prereq, b)

							if prereq not in checkedCourses:
								generateGraphByCourse(course_graph, all_courses, prereq, level_counter + 1)
							checkedCourses.add(prereq)
	if level_counter == 0:
		orId = 0
		global ofId
		ofId = 0
		orDict = {}
		checkedCourses = set()
		#print(checkedCourses)
	return True

def getMajorCourses(data):
	ret = []
	flag = 0
	for i in data:
		if (i['title'] == 'Major' or i['title'] == 'Major (Honours Program)'):
			for j in i['table']:
				for k in j['courses']:
					if (str(k).find("Select") != -1):
						flag = 1
					if (flag == 0):
						ret.append(k)
						#print(k)
	return ret

def getMinorCourses(data):
	for i in data:
		if (i['title'] == 'Minor (Honours Program)'):
			for j in i['table']:
				return j['courses']

def getCourseInfo(majorCourses, allCourses):
	flag = 0
	#print(majorCourses)
	courseInfo = {}
	
	if majorCourses == None:
		return courseInfo

	for course in majorCourses:
		hold = course.find("*")
		if (course[0:hold] not in allCourses):
			flag = 1
		else:
			for k, v in allCourses[course[0:hold]].items():
				if (k == course):
					courseInfo[course] = v
	return courseInfo


def generateGraphByMajor(major_graph, all_courses, majorCourses):
	
	"""Generates a graph for a specified major.

	Args:
		graph ([graph]): [empty graph to be generated]
		all_courses ([dict]): [json data of all courses]
		majorName ([string]): [string of specified major]
	"""
	#make sure major name is in upper case
	#course = course.upper()
	#subjectName = subjectName.upper()

	#return if major is not in json
	#print("all_courses: ", all_courses)
	subjectCode = ""
	idx = 0

	for course in majorCourses:
		idx = course.find('*')
		subjectCode = course[0:idx]

		if subjectCode not in all_courses:
			print('Subject Code: "' + subjectCode + '" does not exists')
			return False
		if course not in all_courses[subjectCode]:
			print('Course: "' + course + '" does not exists')
			return False
	
	#if majorName not in all_courses:
		#print('Subject: "' + majorName + '" does not exists')
		#return False

	seenCourses = set()

	#loop through courses in specified major
	for k in majorCourses:
		#print(k)
		#[majorName].items():
		#add node for course

		if(k[len(k) - 4] == '1'):
			major_graph.add_node(k, color="red")
		elif(k[len(k) - 4] == '2'):
			major_graph.add_node(k, color="orange")
		elif(k[len(k) - 4] == '3'):
			major_graph.add_node(k, color="green")
		elif(k[len(k) - 4] == '4'):
			major_graph.add_node(k, color="purple")
		else:
			major_graph.add_node(k)

		#parse prereqs from prereqs attribute
		idx = k.find('*')
		subjectCode = k[0:idx]

		prereqsList = parseReqs(majorCourses[k]["prereqs"], subjectCode)
		#print(prereqsList)

		#print(majorCourses[k]['prereqs'])
		isOut = isOrOutsideBrackets(majorCourses[k]["prereqs"])

		if isOut:
			global orId

			#orDict[orId] = b
			orId += 1
			major_graph.add_node('or'+str(orId), label='or', shape='diamond')
			major_graph.add_edge('or'+str(orId), k)

		#parse the prereqs string to check for other 'or's in brackets
		getOrDict(major_graph, majorCourses[k]["prereqs"], k, isOut)
		#print ("orDict = ", orDict)


		#creating the dictionaries for the format of '1 of ...' and '2 of ...'
		oneOfDict = getTheOfRequisites(major_graph, majorCourses[k]["prereqs"], "1 of", k, isOut)
		twoOfDict = getTheOfRequisites(major_graph, majorCourses[k]["prereqs"], "2 of", k, isOut)

		#print("oneOfDict = ", oneOfDict)
		#print("twoOfDict = ", twoOfDict)

		#add the prereqs to the graph by adding edges in a single direction from the prereq to the course
		addPrereqsToGraph(major_graph, prereqsList, oneOfDict, twoOfDict, k, isOut)
		seenCourses.update(prereqsList)

		#parse coreqs from coreqs attribute
		coreqsList = parseReqs(majorCourses[k]["coreqs"], subjectCode)
		#add coreqs to the graph by adding edges in both directions between coreqs and course
		addCoreqsToGraph(major_graph, coreqsList, oneOfDict, twoOfDict, k, isOut)
		seenCourses.update(coreqsList)







	# global orDict
	# global checkedCourses

	# #return if course code is not in json
	# majorName = course[:course.find('*')]
	# flag = 0
	# if majorName not in all_courses and level_counter == 0:
	#     flag = 1
	#     return False

	# if isinstance(all_courses, dict):           #check if all_courses is dict
	#     for v in all_courses.values():          #traverse first layer of json data (ex. "ACCT", "AGR", "ANSC", etc...)
	#         for b, n in v.items():              #traverse second layer of json data (course codes)
	#             if (b == course):

	#                 flag = 0
	#                 if (str(n['prereqs']).find("or") != -1):
	#                     splitStr = str(n['prereqs']).split()
	#                     if (len(splitStr) == 3):
	#                         for l in splitStr:
	#                             if (l != 'or'):
	#                                 if (l not in courseList):
	#                                     splitStr.remove(l)
	#                                     splitStr.remove('or')
	#                                     n['prereqs'] = str(splitStr)


	#                 #add first node in case of course having no prerequisites
	#                 if(level_counter == 0):
	#                     major_graph.add_node(course, shape="box")

	#                 #if prereqs exist
	#                 if n["prereqs"]:
	#                     #regex for parsing prereqs
	#                     pattern = re.compile(r"[a-zA-Z]+\*[0-9]+|work\sexperience|\d{1,2}[.]\d\d\scredits|International\sDevelopment")
	#                     prereqsList = re.findall(pattern, n["prereqs"])

	#                     for req in prereqsList:
	#                         if (req not in courseList and req.find("credits") == -1):
	#                             #print("Removing: ", req)
	#                             prereqsList.remove(req)



	#                     #shorten the work experience prerequisite to exp
	#                     #shorten international development to IDEV reg.
	#                     idx = 0
	#                     for c in prereqsList:
	#                         if c == "work experience":
	#                             prereqsList[idx] = "EXP"
	#                         elif c == "International Development":
	#                             prereqsList[idx] = "IDEV reg."
	#                         idx += 1

	#                     #traverses according to how deep the prereq is for the course
	#                     #loop through prereqs and add nodes and edges
	#                     #connect an edge between the 'or' node and its prereqs
	#                     for prereq in prereqsList:
	#                         if (prereq not in courseList and prereq.find("credits") == -1):
	#                             #print ("This is executing on: ", prereq)
	#                             continue
	#                         else:
	#                             #tried to hard type the level here, colors are not working properly
	#                             hold = b.find("*")
	#                             level = int(b[hold+1:hold+2])

	#                             if(level == 0): #node format for first level
	#                                 addNodeAndEdge(major_graph, prereq, b, "red", {}, {}, 0)
	#                             elif(level == 1): #node format for second level
	#                                 addNodeAndEdge(major_graph, prereq, b, "orange", {}, {}, 0)
	#                             elif(level == 2): #node format for third level
	#                                 addNodeAndEdge(major_graph, prereq, b, "green", {}, {}, 0)
	#                             elif(level == 3): #node format for fourth level
	#                                 addNodeAndEdge(major_graph, prereq, b, "purple", {}, {}, 0)
	#                             elif(level == 4): #node format for fifth level
	#                                 addNodeAndEdge(major_graph, prereq, b, "blue", {}, {}, 0)
	#                             else:
	#                                 major_graph.add_edge(prereq, b)

	#                             if prereq not in checkedCourses:
	#                                 generateGraphByMajor(major_graph, all_courses, prereq, level_counter + 1, majorName, courseList)
	#                             checkedCourses.add(prereq)
	# if level_counter == 0:
	#     orId = 0
	#     global ofId
	#     ofId = 0
	#     orDict = {}
	#     checkedCourses = set()
	return True




def main():
	all_courses = readJSON("relations.json")

	graph = pgv.AGraph(directed=True)
	course_graph = pgv.AGraph(directed=True)


	#recursively generate graph for specified course
	generateGraphByCourse(course_graph, all_courses, "CIS*3190", 0)


	#generateGraphByMajor(graph, all_courses, "ENGG")

   # drawGraph(course_graph, "CIS*3190")

	#drawGraph(graph, "ENGG")

	#displayGraph("CIS*3190.pdf")

if __name__ == '__main__':
	main()
