import unittest


class TestcheckBitNameIs3DigitInteger(unittest.TestCase):
    def test_valid_three_digit_number_with_suffix(self):
        input_value = "123.bit"
        result = check_bit_name_is_3digit_integer(input_value)
        self.assertTrue(result)

    def test_valid_two_digit_number_with_suffix(self):
        input_value = "12.bit"
        result = check_bit_name_is_3digit_integer(input_value)
        self.assertTrue(result)

    def test_non_numeric_characters_after_suffix(self):
        input_value = "12a.bit"
        result = check_bit_name_is_3digit_integer(input_value)
        self.assertFalse(result)

    def test_lower_boundary_value(self):
        input_value = "0.bit"
        result = check_bit_name_is_3digit_integer(input_value)
        self.assertTrue(result)

    def test_upper_boundary_value(self):
        input_value = "999.bit"
        result = check_bit_name_is_3digit_integer(input_value)
        self.assertTrue(result)