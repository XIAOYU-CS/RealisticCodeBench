import unittest


class TestIntersectVertically(unittest.TestCase):

    def test_case1(self):
        rect1 = (0, 0, 2, 2)
        rect2 = (1, 1, 3, 3)
        self.assertTrue(intersect_vertically(rect1, rect2))

    def test_case2(self):
        rect1 = (-1, -1, 1, 1)
        rect2 = (0, 0, 2, 2)
        self.assertTrue(intersect_vertically(rect1, rect2))

    def test_case3(self):
        rect1 = (0, 1, 2, 4)
        rect2 = (1, 0, 3, 2)
        self.assertTrue(intersect_vertically(rect1, rect2))

    def test_case4(self):
        rect1 = (0, 0, 2, 2)
        rect2 = (0, 0, 2, 2)
        self.assertTrue(intersect_vertically(rect1, rect2))

    def test_case5(self):
        rect1 = (0, 0, 4, 4)
        rect2 = (1, 1, 2, 2)
        self.assertTrue(intersect_vertically(rect1, rect2))
