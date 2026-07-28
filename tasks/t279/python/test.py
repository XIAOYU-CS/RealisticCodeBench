import unittest

class Tester(unittest.TestCase):
    def test_positive_float(self):
        input_value = 123.456
        expected = "42f6e979"
        self.assertEqual(float_to_hex(input_value), expected)

    def test_negative_float(self):
        input_value = -123.456
        expected = "c2f6e979"
        self.assertEqual(float_to_hex(input_value), expected)

    def test_zero(self):
        input_value = 0.0
        expected = "00000000"
        self.assertEqual(float_to_hex(input_value), expected)

    def test_small_positive_float(self):
        input_value = 0.0001
        expected = "38d1b717"
        self.assertEqual(float_to_hex(input_value), expected)

    def test_large_float(self):
        input_value = 1e30
        expected = "7149f2ca"
        self.assertEqual(float_to_hex(input_value), expected)
