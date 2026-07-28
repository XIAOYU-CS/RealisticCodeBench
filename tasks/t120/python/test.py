import unittest


class TestModExp(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(mod_exp(2, 10, 1000), 24)

    def test_case_2(self):
        self.assertEqual(mod_exp(3, 7, 50), 37)

    def test_case_3(self):
        self.assertEqual(mod_exp(5, 0, 13), 1)

    def test_case_4(self):
        self.assertEqual(mod_exp(7, 5, 20), 7)

    def test_case_5(self):
        self.assertEqual(mod_exp(10, 5, 6), 4)