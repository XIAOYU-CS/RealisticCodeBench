import unittest


class TestIsCompliantFourDigit(unittest.TestCase):
    def test_positive_four_digit_number(self):
        self.assertTrue(is_compliant_four_digit(1234))

    def test_boundary_values(self):
        self.assertTrue(is_compliant_four_digit(1000))
        self.assertTrue(is_compliant_four_digit(9999))

    def test_negative_four_digit_number(self):
        self.assertFalse(is_compliant_four_digit(-1234))

    def test_out_of_range_number(self):
        self.assertFalse(is_compliant_four_digit(999))
        self.assertFalse(is_compliant_four_digit(10000))

    def test_non_integer_number(self):
        self.assertFalse(is_compliant_four_digit(1234.5))
