import json



#This function searches for a specificed course code
#@param courses This is an array of json objects of all the courses
#@param code This is the course code that will be used to search
#@return returnArray This is an array filled with results from the search
def getCoursesByCode(courses, code):
    returnArray = []
    code = code.upper()
    for i in courses:
        if (i['cCode'].find(code) != -1):
            returnArray.append(i)

    return returnArray


#This function searches for a course that is offered in a specified semester
#@param courses This is an array of json objects of all the courses
#@param semester This is the semester that will be used to search
#@return returnArray This is an array filled with results from the search
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
            sem = i['semesters'].split()

            #find and remove the irrelevant keywords like 'only' and 'and'
            for word in sem:
                if (word.upper() == 'AND' or word.upper() == "ONLY"):
                    sem.remove(word)

            #removing any commas from the words
            for word in sem:
                word.replace(",", "")

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


#This function searches for courses with a specified credit weights
#@param courses This is an array of json objects of all the courses
#@param credit This is the credit weight that will be used to search
#@return returnArray This is an array filled with results from the search
def getCoursesByCredit(courses, credit):
    
    #change format from string to decimal
    creditFloat = float(credit)
    returnArray = []

    for i in courses:
        
        #parse the string from JSON and convert to float
        JSONstring = ""
        for char in i['creditWeight']:
            if((char >= '0' and char <= '9') or char == '.'):
                JSONstring = JSONstring + char
        
        JSONfloat = float(JSONstring)

        if(JSONfloat == creditFloat):
            returnArray.append(i)

    return returnArray


#This function searches for courses with a specified name
#@param courses This is an array of json objects of all the courses
#@param name This is the name of the course to search for
#@return returnArray This is an array filled with results from the search
def getCoursesByName(courses, name):
    returnArray = []
    #added upper so user can enter a combination of upper and lower case
    for i in courses:
        if (i['name'].upper() == name.upper()):
            returnArray.append(i)

    return returnArray


#This function searches for courses with a specified course level
#@param courses This is an array of json objects of all the courses
#@param level This is the course level to search for
#@return returnArray This is an array filled with results from the search
def getCoursesByLevel(courses, level):
    returnArray = []
    for i in courses:
        cCode = i['cCode']
        # find course level
        levelIndex = cCode.find('*')
        if cCode[levelIndex+1] == level[0]:
            returnArray.append(i)

    return returnArray


#This function searches for courses that are offered in distant education
#@param courses This is an array of json objects of all the courses
#@return returnArray This is an array filled with results from the search
def getCourseByDE(courses):
    returnArray = []
    for i in courses:
        if i['offerings']:
            returnArray.append(i)

    return returnArray



#This function searches for courses with specified credit weight and offered in a specified semester
#@param courses This is an array of json objects of all the courses
#@param credit This is the credit weight used to search
#@param semesters This is the semesters used to search
#@return This is an array filled with results from the search
def getCoursesByCreditSemesters(courses, credit, semesters):
    creditCourses = getCoursesByCredit(courses, credit)
    returnArray = getCoursesBySemester(creditCourses, semesters)

    return returnArray


#This function searches for a course with a specified name and offered in a specified semester
#@param courses This is an array of json objects of all the courses
#@param semesters This is the semesters used to search
#@param name This is the name of the course used to search
#@return This is an array filled with results from the search
def getCoursesBySemesterCourseName(courses, semesters, name):
    nameCourses = getCoursesByName(courses, name)
    returnArray = getCoursesBySemester(nameCourses, semesters)

    return returnArray

#This function searches for a course with a specified name and a specifed credit weight
#@param courses This is an array of json objects of all the courses
#@param name This is the name of the course used to search
#@param credits This is the credit weight of the course used to search
#@return This is an array filled with results from the search
def getCoursesByCourseNameCreditWeights(courses, name, credits):
    creditCourses = getCoursesByCredit(courses, credits)
    returnArray = getCoursesByName(creditCourses, name)

    return returnArray


#This function formats and prints the output of the program to the command line
#@param course This is the course information that is to be printed
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

#This function is used to print the results of the search
#@param res This is the array filled with the results from the search
#@return hasPrinted boolean for whether courses were printed or not.
def printCourses(res):
    hasPrinted = False
    if (len(res) > 0):
        print('')
        for i in res:
            outputJSON(i)
        print("Total courses: {}".format(len(res)))
        hasPrinted = True
    else :
        print("\nNo Courses Found.")
        hasPrinted = False
    print('\n--x\n')
    return hasPrinted

#This function is used to validate user input for course code
#@param courseCode user input for course code
def validateCourseCode(courseCode):
    if not(len(courseCode) >= 8):
        print("\nIncorrect format for course code\nEx: PSYC*1000\n")
        return False
    elif(courseCode[3] != '*' and courseCode[4] != '*'):
        print("\nIncorrect format for course code\nEx: PSYC*1000\n")
        return False
    return True

def validateCourseCreditWeight(courseCredit):
    try : 
        float(courseCredit)
    except :
        print("\nIncorrect format for course credit.\nEx: 0.25\n")
        return False
    return True

def validateCourseLevel(courseLevel):
    if len(courseLevel) == 4 and courseLevel.isdigit():
        return True
    else:
        print("\nIncorrect format for course level.\nEx: 1000\n")
        return False

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
        print("10: Exit Program")
        usrInput = input('\n--> ')
        usrInput = usrInput.strip()

        print('')
        res = []
        if (usrInput == "1") :
            #search coursename
            courseName = input("Please enter the name of the course you are looking for: ")
            res = getCoursesByName(courses, courseName)
        elif (usrInput == "2"):
            #search course code
            courseCode = input("Please enter the code of the course you are looking for: ")
            #error checking the user input
            if validateCourseCode(courseCode):
                res = getCoursesByCode(courses, courseCode)
            else:
                continue 
        elif (usrInput == "3"):
            #search semesters
            courseSemester = input("Please enter the semester you are looking for: ")
            res = getCoursesBySemester(courses, courseSemester)
        elif (usrInput == "4"):
            #search credit weights
            courseCredit = input("Please enter the credit weight you are looking for: ")
            #error checking the user input
            if validateCourseCreditWeight(courseCredit):
                res = getCoursesByCredit(courses, courseCredit)
            else: 
                continue
        elif (usrInput == "5"):
            #search credit weights + semesters
            courseCredit = input("Please enter the credit weight you are looking for: ")
            if not validateCourseCreditWeight(courseCredit):
                continue
            courseSemester = input("Please enter the semester you are looking for: ")
            print(courseCredit, ' ', courseSemester)
            res = getCoursesByCreditSemesters(courses, courseCredit, courseSemester)
        elif (usrInput == "6"):
            #search course name + semesters
            courseName = input("Please enter the name of the course you are looking for: ")
            courseSemester = input("Please enter the semester you are looking for: ")
            res = getCoursesBySemesterCourseName(courses, courseSemester, courseName)
        elif (usrInput == "7"):
            #search by course name + credits
            courseCredit = input("Please enter the credit weight you are looking for: ")
            if not validateCourseCreditWeight(courseCredit):
                continue
            courseName = input("Please enter the name of the course you are looking for: ")
            res = getCoursesByCourseNameCreditWeights(courses, courseName, courseCredit)
        elif (usrInput == "8"):
            #search course level
            courseLevel = input("Please enter the course level you are looking for: ")
            #error checking the user input
            if validateCourseLevel(courseLevel):
                res = getCoursesByLevel(courses, courseLevel)
            else:
                continue
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
