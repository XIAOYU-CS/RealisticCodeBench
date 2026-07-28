import unittest


class Tester(unittest.TestCase):

    def test_normal_weight_bmi(self):
        self.assertAlmostEqual(calculate_bmi(70, 1.75), 22.86, delta=0.01)

    def test_underweight_bmi(self):
        self.assertAlmostEqual(calculate_bmi(50, 1.75), 16.33, delta=0.01)

    def test_overweight_bmi(self):
        self.assertAlmostEqual(calculate_bmi(80, 1.75), 26.12, delta=0.01)

    def test_obesity_bmi(self):
        self.assertAlmostEqual(calculate_bmi(100, 1.75), 32.65, delta=0.01)

    def test_negative_weight_raises(self):
        with self.assertRaises(Exception):
            calculate_bmi(-70, 1.75)

    def test_zero_height_raises(self):
        with self.assertRaises(Exception):
            calculate_bmi(70, 0)

    def test_negative_height_raises(self):
        with self.assertRaises(Exception):
            calculate_bmi(70, -1.75)
