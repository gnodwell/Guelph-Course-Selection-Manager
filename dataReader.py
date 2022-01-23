import json

#searches courses for matching cCodes
def getCoursesByCode(courses, code):
    returnArray = []
    code = code.upper()
    for i in courses:
        if (i['cCode'].find(code) != -1):
            returnArray.append(i)

    return returnArray

#searches courses for matching semesters
def getCoursesBySemester(courses, semester):
    returnArray = []
    flagA = 1

    #parse user input
    uInput = semester.split()
    newKeyWords = []

    #find and remove the irrelevant keywords like 'only' and 'and'
    for word in uInput:
        if (word.upper() == 'AND' or word.upper() == "ONLY"):
            uInput.remove(word)

    #make new list of keywords from user input
    for w in uInput:
        if (w.upper().find("FALL") != -1):
            newKeyWords.append("FALL")
        elif (w.upper().find("SUMMER") != -1):
            newKeyWords.append("SUMMER")
        elif (w.upper().find("WINTER") != -1):
            newKeyWords.append("WINTER")
        elif (w.upper().find("DVM") != -1):
            newKeyWords.append("DVM")
        elif (w.upper().find("PHASE") != -1):
            newKeyWords.append("PHASE")
        elif (w.find("1") != -1):
            newKeyWords.append("1")
        elif (w.find("2") != -1):
            newKeyWords.append("2")
        elif (w.find("3") != -1):
            newKeyWords.append("3")
        elif (w.find("4") != -1):
            newKeyWords.append("4")

    #print(newKeyWords)

    for i in courses:
        try:
            #if (i['semesters'].find(semester) != -1):
                #returnArray.append(i)

            sem = i['semesters'].split()
            

            #find and remove the irrelevant keywords like 'only' and 'and'
            for word in sem:
                if (word.upper() == 'AND' or word.upper() == "ONLY"):
                    sem.remove(word)

            #removing any commas from the words
            for word in sem:
                word.replace(",", "")

            #print(sem)
            
            #matching the keywords
            for keyWord in newKeyWords:
                for word in sem:

                    #looking for the keywords "DVM PHASE [NUM]" consecutively
                    #otherwise if the other keywords are found then append
                    
                    if(keyWord.upper() == "PHASE" or keyWord == "1" or keyWord == "2" or keyWord == "3" or keyWord == "4"):
                        flagA = 1
                        #do nothing
                    elif(keyWord.upper() == "DVM" and word.upper() == "DVM"):
                        
                        if(newKeyWords[newKeyWords.index(keyWord) + 1].upper() == "PHASE"):
                            
                            if(newKeyWords[newKeyWords.index(keyWord) + 2] == "1" and sem[sem.index(word) + 2] == "1"):
                                returnArray.append(i)
                            if(newKeyWords[newKeyWords.index(keyWord) + 2] == "2" and sem[sem.index(word) + 2] == "2"):
                                returnArray.append(i)
                            if(newKeyWords[newKeyWords.index(keyWord) + 2] == "3" and sem[sem.index(word) + 2] == "3"):
                                returnArray.append(i)
                            if(newKeyWords[newKeyWords.index(keyWord) + 2] == "4" and sem[sem.index(word) + 2] == "4"):
                                returnArray.append(i)
                    elif(word.upper() == keyWord.upper()):
                        returnArray.append(i)


        except:
            catch = 1

    return returnArray

#searches courses for matching creditWeights
def getCoursesByCredit(courses, credit):
    formattedCredit = "[" + str(credit) + "]"
    returnArray = []
    for i in courses:
        if (i['creditWeight'] == formattedCredit):
            returnArray.append(i)

    return returnArray

#searches courses by matching names
def getCoursesByName(courses, name):
    returnArray = []
    #added upper so user can enter a combination of upper and lower case
    for i in courses:
        if (i['name'].upper() == name.upper()):
            returnArray.append(i)

    return returnArray

#searches courses in given academic level
def getCoursesByLevel(courses, level):
    returnArray = []
    for i in courses:
        cCode = i['cCode']
        # find course level
        levelIndex = cCode.find('*')
        if cCode[levelIndex+1] == level[0]:
            returnArray.append(i)
        
    return returnArray			

#searches course in Distance Education format
def getCourseByDE(courses):
    returnArray = []
    for i in courses:
        if i['offerings']:
            returnArray.append(i)

    return returnArray
	
#searches courses by matching creditWeights + semesters
def getCoursesByCreditSemesters(courses, credit, semesters):
    creditCourses = getCoursesByCredit(courses, credit)
    returnArray = getCoursesBySemester(creditCourses, semesters)

    return returnArray

#searches courses by semester + name
def getCoursesBySemesterCourseName(courses, semesters, name):
    nameCourses = getCoursesByName(courses, name)
    returnArray = getCoursesBySemester(nameCourses, semesters)

    return returnArray
    
#searches courses by name + credits
def getCoursesByCourseNameCreditWeights(courses, name, credits):
    creditCourses = getCoursesByCredit(courses, credits)
    returnArray = getCoursesByName(creditCourses, name)
    
    return returnArray

#output function
def outputJSON(course):
    print("Course Code: " + course['cCode'])
    print("Credits: " + course['creditWeight'])
    print("Title: " + course['name'])

    # check for existence of field
    if course['description']:
        print("Description: " + course['description'])
    if course['semesters']:
        print("Semesters: " + course['semesters'])
    print('')
    
#print resulting courses
def printCourses(res):
    if (len(res) > 0):
        print('')
        for i in res:
            outputJSON(i)
        print("Total courses: {}".format(len(res)))
    else :
        print("\nNo Courses Found.")
    print('\n--x\n')
 
def main():
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

    #Start of CLI
    print("\nWelcome to our coursesearch!")    
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
        print("10: Exit Program")
        usrInput = input('\n--> ')
        usrInput = usrInput.strip()
        
        print('')
        res = []
        if (usrInput == "1") :
            courseName = input("Please enter the name of the course you are looking for: ")
            res = getCoursesByName(courses, courseName)
            #search coursename
        elif (usrInput == "2"):
            courseCode = input("Please enter the code of the course you are looking for: ")
            res = getCoursesByCode(courses, courseCode)
            #search course code
        elif (usrInput == "3"):
            #search semesters
            courseSemester = input("Please enter the semester you are looking for: ")
            res = getCoursesBySemester(courses, courseSemester)
        elif (usrInput == "4"):
            #search credit weights
            courseCredit = input("Please enter the credit weight you are looking for: ")
            res = getCoursesByCredit(courses, courseCredit)
        elif (usrInput == "5"):
            #search credit weights + semesters
            courseCredit = input("Please enter the credit weight you are looking for: ")
            courseSemester = input("Please enter the semester you are looking for: ")
            res = getCoursesByCreditSemesters(courses, courseCredit, courseSemester)
        elif (usrInput == "6"):
            #search course name + semesters
            courseName = input("Please enter the name of the course you are looking for: ")
            courseSemester = input("Please enter the semester you are looking for: ")
            res = getCoursesBySemesterCourseName(courses, courseSemester, courseName)
        elif (usrInput == "7"):
            #search by course name + credits
            courseCredit = input("Please enter the credit weight you are looking for: ")
            courseName = input("Please enter the name of the course you are looking for: ")
            res = getCoursesByCourseNameCreditWeights(courses, courseName, courseCredit)     
        elif (usrInput == "8"):
            #search course level
            courseLevel = input("Please enter the course level you are looking for: ")
            res = getCoursesByLevel(courses, courseLevel)
        elif (usrInput == "9"):
            #search Distance Education
            res = getCourseByDE(courses)
        elif (usrInput == "10"):
            break
        else:
            print ("Incorrect Input, Please try again. \n")
            continue

        printCourses(res)
    
    print('--x Bye!')

if __name__ == "__main__":
    main()
