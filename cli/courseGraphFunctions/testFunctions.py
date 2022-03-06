import unittest
import os
from os.path import exists
import json
import sys
from PyPDF2 import PdfFileMerger

sys.path.append('../')

import courseGraph as cg
import graphFunctions as gp
import pygraphviz as pgv
import cli as c


try:
    from courseGraph import readJSON
except Exception as e:
    flag = 1

sampleData2 = [
    {
        "ACCT": {
            "ACCT*1220": {
            },
            "ACCT*1240": {
            },
            "ACCT*2230": {
            },
            "ACCT*3230": {
            }
        }
    }
]
sampleData = [
    {
        "major": "Accounting (ACCT)",
        "title": [
            {
                "cCode":"ACCT*1220",
                "name":"Introductory Financial Accounting",
                "description":"This introductory course is designed to develop a foundational understanding of current accounting principles and their implication for published financial reports of business enterprises. It builds the base of knowledge and understanding required to succeed in more advanced study of accounting. The course approaches the subject from the point of view of the user of accounting information rather than that of a person who supplies the information.",
                "semesters":"Fall and Winter",
                "lec":"LEC: 3",
                "restrictions":"ACCT*2220. This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.",
                "offerings":"Also offered through Distance Education format.",
                "creditWeight":"[0.50]",
                "department":"Department of Management",
                "location":"Guelph",
                "prereqs":None,
                "coreqs":None,
                "equates":None
            },
            {
                "cCode":"ACCT*1240",
                "name":"Applied Financial Accounting",
                "description":"This course requires students to apply the fundamental principles emanating from accounting's conceptual framework and undertake the practice of financial accounting. Students will become adept at performing the functions related to each step in the accounting cycle, up to and including the preparation of the financial statements and client reports. Students will also develop the skills necessary for assessing an organization's system of internal controls and financial conditions.",
                "semesters":"Winter Only",
                "lec":"LEC: 3",
                "restrictions":"ACCT*2240. This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.",
                "offerings":"Also offered through Distance Education format.",
                "creditWeight":"[0.50]",
                "department":"Department of Management",
                "location":"Guelph",
                "prereqs":"ACCT*1220 or ACCT*2220",
                "coreqs":None,
                "equates":None
            },
            {
                "cCode":"ACCT*2230",
                "name":"Management Accounting",
                "description":"This course emphasizes the use of accounting information to facilitate effective management decisions. Topics include cost determination, cost control and analysis, budgeting, profit-volume analysis and capital investment analysis.",
                "semesters":"Fall and Winter",
                "lec":"LEC: 3",
                "restrictions":"This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.",
                "offerings":None,
                "creditWeight":"[0.50]",
                "department":"Department of Management",
                "location":"Guelph",
                "prereqs":"ACCT*1220 or ACCT*2220",
                "coreqs":None,
                "equates":"AGEC*2230, BUS*2230"
            },
            {
                "cCode":"ACCT*3230",
                "name":"Intermediate Management Accounting",
                "description":"This course continues the managerial decision making focus of ACCT*2230. Topics include process costing, transfer pricing, the decision making process, variances and performance measurement.",
                "semesters":"Winter and Summer",
                "lec":"LEC: 3",
                "restrictions":"Enrolment may be restricted to particular degrees or programs. See department for more information.",
                "offerings":"Also offered through Distance Education format.",
                "creditWeight":"[0.50]",
                "department":"Department of Management",
                "location":"Guelph",
                "prereqs":"ACCT*2230",
                "coreqs":None,
                "equates":"BUS*3230"
            }
        ]
    },
    {
        "major": "Chemistry (CHEM)",
        "title": [
            {
                "cCode":"CHEM*1040",
                "name":"General Chemistry I",
                "description":"This course introduces concepts of chemistry, the central link between the physical and biological sciences. Principles discussed include chemical bonding, simple reactions and stoichiometry, chemical equilibria and solution equilibria (acids, bases, and buffers), and introductory organic chemistry.",
                "semesters":"Fall and Winter",
                "lec":"LEC: 3, LAB: 3",
                "restrictions":None,
                "offerings":None,
                "creditWeight":"[0.50]",
                "department":"Department of Chemistry",
                "location":"Guelph",
                "prereqs":"4U Chemistry (or equivalent) or CHEM*1060",
                "coreqs":None,
                "equates":None
            },
            {
                "cCode":"CHEM*1050",
                "name":"General Chemistry II",
                "description":"This course provides an introductory study of the fundamental principles governing chemical transformations: thermodynamics (energy, enthalpy, and entropy); kinetics (the study of rates of reactions); and redox/electrochemistry.",
                "semesters":"Fall and Winter",
                "lec":"LEC: 3, LAB: 3",
                "restrictions":None,
                "offerings":None,
                "creditWeight":"[0.50]",
                "department":"Department of Chemistry",
                "location":"Guelph",
                "prereqs":"CHEM*1040",
                "coreqs":None,
                "equates":None
            },
            {
                "cCode":"CHEM*2060",
                "name":"Structure and Bonding",
                "description":"This course covers the applications of symmetry, simple crystal structures and principles of bonding. Molecular orbital theory is used to explain the fundamental relationship between electronic and molecular structure. This course provides the elementary quantum background for an understanding of the electronic structures of atoms and molecules.",
                "semesters":"Fall Only",
                "lec":"LEC: 3, LAB: 1.5",
                "restrictions":None,
                "offerings":None,
                "creditWeight":"[0.50]",
                "department":"Department of Chemistry",
                "location":"Guelph",
                "prereqs":"CHEM*1050, [IPS*1510 or (MATH*1210, (1 of PHYS*1010, PHYS*1070, PHYS*1300))]",
                "coreqs":None,
                "equates":None
            },
            {
                "cCode":"CHEM*2070",
                "name":"Structure and Spectroscopy",
                "description":"This course provides an introduction to spectroscopy and its relationship to molecular structure and dynamics. Rotational, vibrational, electronic and magnetic resonance spectroscopies will be studied. Concepts introduced in CHEM*2060 will be applied to chemical and biochemical problems through spectroscopic techniques. Central to this course is the use of spectroscopy for the determination of molecular structures and the investigation of molecular motions.",
                "semesters":"Winter and Summer",
                "lec":"LEC: 3, LAB: 1.5",
                "restrictions":None,
                "offerings":None,
                "creditWeight":"[0.50]",
                "department":"Department of Chemistry",
                "location":"Guelph",
                "prereqs":"CHEM*2060",
                "coreqs":None,
                "equates":None
            }
        ]
    }
]


class testCLI(unittest.TestCase):
    #possibly test readJSON()
    def test_getMajorCode(self):
        res = cg.getMajorCode(sampleData[0]['major'])
        expected = "ACCT"
        self.assertEqual(res, expected, "Failed courseGraph.<getMajorCode>\n")

    def test_mapCoursesInfo(self):
        res = cg.mapCoursesInfo(sampleData[0]['title'])

        expected = {
                "prereqs":"ACCT*2230",
                "coreqs":None,
                "equates":"BUS*3230"
                }
        self.assertEqual(res['ACCT*3230'], expected, "Failed courseGraph.<mapCoursesInfo>")


    def test_mapMajorCourses(self):
        expected = {'ACCT': {'ACCT*1220': {'prereqs': None, 'coreqs': None, 'equates': None}, 'ACCT*1240': {'prereqs': 'ACCT*1220 or ACCT*2220', 'coreqs': None, 'equates': None}, 'ACCT*2230': {'prereqs': 'ACCT*1220 or ACCT*2220', 'coreqs': None, 'equates': 'AGEC*2230, BUS*2230'}, 'ACCT*3230': {'prereqs': 'ACCT*2230', 'coreqs': None, 'equates': 'BUS*3230'}}, 'CHEM': {'CHEM*1040': {'prereqs': '4U Chemistry (or equivalent) or CHEM*1060', 'coreqs': None, 'equates': None}, 'CHEM*1050': {'prereqs': 'CHEM*1040', 'coreqs': None, 'equates': None}, 'CHEM*2060': {'prereqs': 'CHEM*1050, [IPS*1510 or (MATH*1210, (1 of PHYS*1010, PHYS*1070, PHYS*1300))]', 'coreqs': None, 'equates': None}, 'CHEM*2070': {'prereqs': 'CHEM*2060', 'coreqs': None, 'equates': None}}}

        res = cg.mapMajorCourses(sampleData)
        self.assertEqual(res, expected, "Failed courseGraph.<mapMajorCourses>")

    def test_displayGraph(self):
        flag = 1

    def test_drawGraph(self):
        flag = 1

    def test_parseReqs(self):
        courses = '15.00 credits including ACCT*3280, ACCT*3340, ACCT*3350'
        majorName = 'ACCT'
        res = gp.parseReqs(courses, majorName)
        expected = ['15.00 credits', 'ACCT*3280', 'ACCT*3340', 'ACCT*3350']

        self.assertEqual(res, expected, "Failed graphFunctions.<parseReqs>")

    def test_generateGraphByMajor(self):
        all_courses = readJSON("testData.json")
        testGraph = pgv.AGraph(directed=True)
        #sampleGraph = pgv.AGraph(directed=True)

        major = cg.readJSON('../scraper/majorPages/includes/Accounting (ACCT) (B.Comm.).json')
        majorCourses = gp.getMajorCourses(major)
        courseInfo = gp.getCourseInfo(majorCourses, all_courses)

        # sampleGraph.add_node("ACCT*1220", color="red")
        # sampleGraph.add_node("ACCT*1240", color="red")
        # sampleGraph.add_node("ACCT*2230", color="orange")
        # sampleGraph.add_node("ACCT*3230", color="green")

        ret = gp.generateGraphByMajor(testGraph, all_courses, courseInfo)

        self.assertEqual(ret, True, "Failed test_generateGraphByMajor")

    def test_generateGraphByCourse(self):
        all_courses = readJSON("relations.json")


        testGraph = pgv.AGraph(directed=True)
        sampleGraph = pgv.AGraph(directed=True)
        
        sampleGraph.add_node("ACCT*1220", shape="box")

        gp.generateGraphByCourse(testGraph, all_courses, "ACCT*1220", 0)

        self.assertEqual(testGraph, sampleGraph, "Failed test_generateGraphByCourse")

    def test_generateGraphBySubject(self):
        all_courses = readJSON("testData.json")
        testGraph = pgv.AGraph(directed=True)
        sampleGraph = pgv.AGraph(directed=True)

        sampleGraph.add_node("ACCT*1220", color="red")
        sampleGraph.add_node("ACCT*1240", color="red")
        sampleGraph.add_node("ACCT*2230", color="orange")
        sampleGraph.add_node("ACCT*3230", color="green")

        gp.generateGraphBySubject(testGraph, all_courses, "ACCT", 0)

        self.assertEqual(testGraph, sampleGraph, "Failed test_generateGraphBySubject")

    def test_getOrDict(self):

        testGraph = pgv.AGraph(directed=True)
        courses = "ACCT*1220 or ACCT*2220"
        isOut = 0

        gp.getOrDict(testGraph, courses, "ACCT*1240", isOut)

        self.assertEqual(isOut, 0, "Failed test_getOrDict")

    def test_find_all(self):

        courses = "ACCT*1220 or ACCT*2220"
        sub = "ACCT*1220"
        gp.find_all(courses, sub)
   
        self.assertEqual(sub, "ACCT*1220", "Failed test_find_all")
    

    def test_cleanUpString(self):
        string = "1 of CIS*3760, CIS*3750 , CIS*3110 , CIS*3050"
        string = gp.cleanUpString(string)

        self.assertEqual(string, "1 of CIS*3760, CIS*3750, CIS*3110, CIS*3050", "Failed test_cleanUpString")

    def test_isOrOutsideBrackets(self):
        testString = "((CIS*3760 or CIS*3750) or CIS*3110) or (CIS*3760 or CIS*3050)"

        ret = gp.isOrOutsideBrackets(testString)

        self.assertEqual(ret, 1, "Failed test_isOrOutsideBrackets")

    def test_checkBr(self):
        testString = "((CIS*2430, CIS1300), CIS*2750) or (CIS3760, CIS*4300)"
        orList = [(i) for i in gp.find_all(testString, 'or')]

        ret = gp.checkBr(testString, orList[0])

        self.assertEqual(ret, 1, "Failed test_checkBr")

    def test_getTheOfRequisites(self):
        graph = pgv.AGraph(directed=True)
        testString = "(CIS*3100 or CIS*2750), 1 of CIS*1300, CIS*1500, CIS*2430"
        subStr = "1 of"
        course = "CIS*3760"
        isOrOutside = 0
        trueDict = {}
        trueDict[0] = ' CIS*1300, CIS*1500, CIS*2430'

        ret = gp.getTheOfRequisites(graph, testString, subStr, course, isOrOutside)

        self.assertEqual(ret, trueDict, "Failed test_getTheOfRequisites")

    def test_checkKeyInDict(self):
        course = 'CIS*1300'
        testDict = {0 :'CIS*2430, CIS*3760', 1: 'CIS*1300, CIS*3000'}
        isIn = 2
        keyVal = 0

        ret = gp.checkKeyInDict([], testDict, course, isIn, keyVal)

        self.assertEqual(ret, [2,1], "Failed test_checkKeyInDict")


    def test_keyInDict(self):
        orDict = {'CIS*2430' : [['CIS*1300', 'CIS*1500'], ['CIS*2750', 'CIS*2500']]}
        prereq = 'CIS*2500';
        course = 'CIS*2430'
        graph = pgv.AGraph(directed=True)
        i = 0

        ret = gp.keyInDict(i, orDict, prereq, course, graph)

        self.assertEqual(ret, 1, "Failed test_keyInDict")

    def test_mergePDFs(self):
        c.mergePDFs('../graphs/')

        ret = os.path.isfile('../graphs/Waterloo.pdf')

        self.assertEqual(ret, True, "Failed mergePDFs")

if __name__ == '__main__':
    unittest.main()

