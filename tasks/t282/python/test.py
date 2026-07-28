import unittest


class TestJosephusProblem(unittest.TestCase):

    def test_case_1(self):
        self.assertEqual(josephus(7, 3), 4)

    def test_case_2(self):
        self.assertEqual(josephus(1, 1), 1)

    def test_case_3(self):
        self.assertEqual(josephus(5, 2), 3)

    def test_case_4(self):
        self.assertEqual(josephus(10, 5), 3)

    def test_case_5(self):
        self.assertEqual(josephus(6, 1), 6)

    def test_case_6(self):
        self.assertEqual(josephus(8, 4), 6)

    def test_case_7(self):
        self.assertEqual(josephus(12, 7), 12)