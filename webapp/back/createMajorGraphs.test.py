import unittest
import createMajorGraphs 


class testCreateMajorGraph(unittest.TestCase):
    def test_getBaseCode(self):
        res = createMajorGraphs.getBaseCode("CIS*3760")
        self.assertEqual("CIS", res,"Failed createMajorGraphs.<getBaseCode>")

if __name__ == '__main__':
    unittest.main()

