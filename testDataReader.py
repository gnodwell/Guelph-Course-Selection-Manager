import unittest
import dataReader
import json

courses = [
            {
                "cCode": "ACCT*1220",
                "name": "Introductory Financial Accounting",
                "description": "This introductory course is designed to develop a foundational understanding of current accounting principles and their implication for published financial reports of business enterprises. It builds the base of knowledge and understanding required to succeed in more advanced study of accounting. The course approaches the subject from the point of view of the user of accounting information rather than that of a person who supplies the information.",
                "semesters": "Fall and Winter",
                "lec": "LEC: 3",
                "restrictions": "ACCT*2220. This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.",
                "offerings": "Also offered through Distance Education format.",
                "creditWeight": "[0.50]",
                "department": "Department of Management",
                "location": "Guelph",
                "prereqs": None,
                "equates": None
            },
            {
                "cCode": "CIS*3760",
                "name": "Software Engineering",
                "description": "This course is an examination of the software engineering process, the production of reliable systems and techniques for the design and development of complex software. Topics include object-oriented analysis, design and modeling, software architectures, software reviews, software quality, software engineering, ethics, maintenance and formal specifications.",
                "semesters": "Fall and Winter",
                "lec": "LEC: 3, LAB: 2",
                "restrictions": None,
                "offerings": None,
                "creditWeight": "[0.75]",
                "department": "School of Computer Science",
                "location": "Guelph",
                "prereqs": "CIS*2750, CIS*3750",
                "equates": None
            },
            {
                "cCode": "HUMN*4190",
                "name": "Experiential Learning",
                "description": "This course provides an opportunity for independent study based in the Arts and/or Humanities related to either voluntary or paid experience. Evaluation will be based on assignments directly related to the experience. Students interested in this course must have their project approved by the instructor and the office of the Associate Dean (Academic) of the College of Arts prior to the semester in which they plan to engage in their experiential learning experience.",
                "semesters": "Summer, Fall, and Winter",
                "lec": None,
                "restrictions": "Instructor consent required.",
                "offerings": None,
                "creditWeight": "[0.50]",
                "department": "Dean's Office, College of Arts",
                "location": "Guelph",
                "prereqs": "10.00 credits",
                "equates": None
            },
            {
                "cCode": "IDEV*1000",
                "name": "Understanding Development and Global Inequalities",
                "description": "The objective of the course is to provide an introduction to the study of international development as a contested and evolving effort to counteract global inequalities. Students will learn about the historical and political origins of the international development system, as well as the main development actors and institutions. The course will provide an introduction to foundational concepts within development studies, including poverty, inequality, human rights, foreign aid, and sustainable development.",
                "semesters": "Summer, Fall, and Winter",
                "lec": "LEC: 3",
                "restrictions": None,
                "offerings": "Also offered through Distance Education format.",
                "creditWeight": "[0.50]",
                "department": "Dean's Office, College of Social and Applied Human Sciences",
                "location": "Guelph",
                "prereqs": None,
                "equates": None
            },
            {
                "cCode": "MATH*2270",
                "name": "Applied Differential Equations",
                "description": "This course covers the solution of differential equations that arise from problems in engineering and science. Topics include linear equations of first and higher order, systems of linear equations, Laplace transforms, series solutions of second-order equations, and an introduction to partial differential equations.",
                "semesters": "Fall Only",
                "lec": "LEC: 3, LAB: 1",
                "restrictions": None,
                "offerings": None,
                "creditWeight": "[0.50]",
                "department": "Department of Mathematics and Statistics",
                "location": "Guelph",
                "prereqs": "(ENGG*1500 or MATH*1160), (1 of IPS*1510, MATH*1090, MATH*1210, MATH*2080)",
                "equates": None
            }
        ]


class TestCLIFunctions(unittest.TestCase):
    def test_printCourses(self):
        resultCourses = []
        res = dataReader.printCourses(resultCourses)
        self.assertEqual(res, False, "Failed dataReader.<printCourses>\n")

    def test_getCoursesByCode(self):
        code = 'cis*3760'
        res = dataReader.getCoursesByCode(courses, code)

        expected = [courses[1]]
        self.assertEqual(expected, res, 'Failed dataReader.<getCoursesByCode>\n')

    def test_getCoursesBySemester(self):
        semester = 'fall'
        res = dataReader.getCoursesBySemester(courses, semester)

        expected = [courses[0], courses[1], courses[2], courses[3], courses[4]]
        self.assertEqual(res, expected, "Failed dataReader.<getCoursesBySemester>\n")

    def test_getCoursesByCredit(self):
        credit = '0.75'
        res = dataReader.getCoursesByCredit(courses, credit)
        
        expected = [courses[1]]
        self.assertEqual(res, expected, "Failed dataReader.<getCoursesByCredit>\n")

    def test_getCoursesByName(self):
        name = 'Introductory Financial Accounting'
        res = dataReader.getCoursesByName(courses, name)

        expected = [courses[0]]
        self.assertEqual(res, expected, 'Failed dataReader.<getCoursesByCredit>\n')

    def test_getCoursesByLevel(self):
        courseLevel = '1000'
        res = dataReader.getCoursesByLevel(courses, courseLevel)

        expected = [courses[0], courses[3]]
        self.assertEqual(res, expected, 'Failed dataReader.<getCoursesByCredit>\n')

    def test_getCourseByDE(self):
        res = dataReader.getCourseByDE(courses)
        
        expected = [courses[0], courses[3]]
        self.assertEqual(res, expected, 'Failed dataReader.<getCoursesByCredit>\n')

    def test_getCoursesByCreditSemesters(self):
        credit = '0.50'
        semesters = 'winter'
        res = dataReader.getCoursesByCreditSemesters(courses, credit, semesters)

        expected = [courses[0], courses[2], courses[3]]
        self.assertEqual(res, expected, 'Failed dataReader.<getCoursesByCreditSemesters>\n')

    def test_getCoursesBySemesterCourseName(self):
        semesters = 'fall'
        name = 'Applied Differential Equations'
        res = dataReader.getCoursesBySemesterCourseName(courses, semesters, name)

        expected = [courses[4]]
        self.assertEqual(res, expected, 'Failed dataReader.<getCoursesBySemesterCourseName>\n')

    def test_getCoursesByCourseNameCreditWeights(self):
        name = 'Applied Differential Equations'
        credits = '0.50'
        res = dataReader.getCoursesByCourseNameCreditWeights(courses, name, credits)

        expected = [courses[4]]
        self.assertEqual(res, expected, 'Failed dataReader.<getCoursesByCourseNameCreditWeights>\n')

    def test_validateCourseCode(self):
        courseCode = 'cis*1500'
        res = dataReader.validateCourseCode(courseCode)

        self.assertTrue(res, 'Failed dataReader.<validateCourseCode>\n')

    def test_validateCourseCreditWeight(self):
        creditWeight = '0.5'
        res = dataReader.validateCourseCreditWeight(creditWeight)

        self.assertTrue(res, 'Failed dataReader.<validateCourseCreditWeight>\n')

    def test_validateCourseLevel(self):
        courseLevel = '2000'
        res = dataReader.validateCourseLevel(courseLevel)

        self.assertTrue(res, 'Failed dataReader.<validateCourseLevel>\n')
        


if __name__ == '__main__':
    unittest.main()