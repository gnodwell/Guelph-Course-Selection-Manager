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
    for i in courses:
        try:
            if (i['semesters'].find(semester) != -1):
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


#seaches courses by matching names
def getCoursesByName(courses, name):
    returnArray = []
    for i in courses:
        if (i['name'] == name):
            returnArray.append(i)

    return returnArray




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
    print("5: Exit Program")
    usrInput = input('--> ')

    while (usrInput != "5") :
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
        else:
            print ("Incorrect Input, Please try again")

        if (len(res) > 0):
            for i in res:
                print(i)
                print('\n\n')

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
            print("5: Exit Program")
            usrInput = input('--> ')
        elif (usrInput == "n"):
            exit (0)



if __name__ == "__main__":
    main()
