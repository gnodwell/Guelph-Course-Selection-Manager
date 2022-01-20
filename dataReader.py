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
    flagB = 0

    #parse user input
    uInput = semester.split()

    #find and remove the irrelevant keywords like 'only' and 'and'
    for word in uInput:
        if (word.upper() == 'AND' or word.upper() == "ONLY"):
            uInput.remove(word)

    for w in uInput:
        if (w.upper() == "FALL,"):
            uInput.remove(w);
            uInput.append("FALL")
        elif (w.upper() == "SUMMER,"):
            uInput.remove(w);
            uInput.append("SUMMER")
        elif (w.upper() == "WINTER,"):
            uInput.remove(w);
            uInput.append("WINTER")

    #print(uInput)

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
            for j in uInput:
                for s in sem:
                    if (j.upper() == s.upper()):
                        flagB = 1
                if(flagB == 0):
                    flagA = 0
                
                flagB = 0    

            if(flagA == 1 and len(sem) == len(uInput)):
                returnArray.append(i)

            flagA = 1
            flagB = 0

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


#seaches courses by matching names
def getCoursesByName(courses, name):
    returnArray = []
    #added upper so user can enter a combination of upper and lower case
    for i in courses:
        if (i['name'].upper() == name.upper()):
            returnArray.append(i)

    return returnArray

#searches courses by matching creditWeights + semesters
def getCoursesByCreditSemesters(courses, credit, semesters):
    creditCourses = getCoursesByCredit(courses, credit)
    returnArray = getCoursesBySemester(creditCourses, semesters)

    return returnArray

#output function
def outputJSON(course):
    print("Course Code: " + course['cCode'])
    print("Credits: " + course['creditWeight'])
    print("Title: " + course['name'])
    print("Description: " + course['description'])
    print("Semesters: " + course['semesters'])
    


def main():
    #open file and load json data into 'data'
    f = open("scraper/data.json", "r")
    data = json.load(f)
    f.close()

    #Splits each of the majors and stores into the array
    majors = []
    for i in data:
        majors.append(i)

    #Splits each of the classes into individual items and saves into courses
    courses = []
    for i in majors:
        for j in i['title']:
            courses.append(j)
            #print (j['cCode'])


    #Start of CLI
    print("Welcome to our coursesearch")
    print("How would you like to search? (Please enter the number associated with the method)")
    print("1: Course Name")
    print("2: Course Code")
    print("3: Semester's Available")
    print("4: Credit Weights")
    print("5: Credit Weights + Semester's Available")
    print("6: Exit Program")
    usrInput = input('--> ')


    while (usrInput != "6") :
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
        else:
            print ("Incorrect Input, Please try again")

        if (len(res) > 0):
            for i in res:
                print('\n')
                outputJSON(i)
                print('\n')
        else :
            print("No Courses Found.")

        usrInput = input("Would you like to perform another search? (y/n)")
        usrInput = usrInput.lower()
        while (usrInput != 'y' and usrInput != 'n'):
            usrInput = input("Unexpected input, Please try again: ")
            usrInput = usrInput.lower()

        if (usrInput == "y"):
            print("How would you like to search? (Please enter the number associated with the method)")
            print("1: Course Name")
            print("2: Course Code")
            print("3: Semester's Available")
            print("4: Credit Weights")
            print("5: Credit Weights + Semester's Available")
            print("6: Exit Program")
            usrInput = input('--> ')
        elif (usrInput == "n"):
            exit (0)



if __name__ == "__main__":
    main()
