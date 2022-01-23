import unittest
import dataReader

class TestCLIFunctions(unittest.TestCase):
    def test_printCourses(self):
        resultCourses = []
        res = dataReader.printCourses(resultCourses)
        self.assertEqual(res, False, "Failed dataReader.<printCourses>\n")

if __name__ == '__main__':
    unittest.main()