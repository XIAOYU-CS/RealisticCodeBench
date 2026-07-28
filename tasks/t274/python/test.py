import unittest

class Tester(unittest.TestCase):
    
    def test_positive_number(self):
        hex_str = "40490FDB"
        result = hex_string_to_float(hex_str)
        self.assertAlmostEqual(result, 3.14159, delta=0.00001)

    def test_negative_number(self):
        hex_str = "C0490FDB"
        result = hex_string_to_float(hex_str)
        self.assertAlmostEqual(result, -3.14159, delta=0.00001)

    def test_zero(self):
        hex_str = "00000000"
        result = hex_string_to_float(hex_str)
        self.assertAlmostEqual(result, 0.0, delta=0.00001)

    def test_small_positive_number(self):
        hex_str = "3F800000"
        result = hex_string_to_float(hex_str)
        self.assertAlmostEqual(result, 1.0, delta=0.00001)

    def test_small_negative_number(self):
        hex_str = "BF800000"
        result = hex_string_to_float(hex_str)
        self.assertAlmostEqual(result, -1.0, delta=0.00001)

