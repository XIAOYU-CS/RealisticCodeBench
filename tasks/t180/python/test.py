import unittest


class TestSetEurValue(unittest.TestCase):

    def test_formats_standard_values_correctly(self):
        self.assertEqual(convert_value_to_abbreviated_string('250'), '250')
        self.assertEqual(convert_value_to_abbreviated_string('2500'), '2.5k')

    def test_handles_boundary_values_accurately(self):
        self.assertEqual(convert_value_to_abbreviated_string('999'), '999')
        self.assertEqual(convert_value_to_abbreviated_string('1000'), '1.0k')
        self.assertEqual(convert_value_to_abbreviated_string('999999'), '999.9k')
        self.assertEqual(convert_value_to_abbreviated_string('1000000'), '1.0m')

    def test_returns_correct_format_for_zero_and_negative_inputs(self):
        self.assertEqual(convert_value_to_abbreviated_string('0'), '0')

    def test_returns_empty_string_for_invalid_inputs(self):
        self.assertEqual(convert_value_to_abbreviated_string('hello'), '')
        self.assertEqual(convert_value_to_abbreviated_string(None), '')
        self.assertEqual(convert_value_to_abbreviated_string('undefined'), '')

    def test_ensures_precision_for_large_numbers(self):
        self.assertEqual(convert_value_to_abbreviated_string('10000000'), '10.0m')
        self.assertEqual(convert_value_to_abbreviated_string('987654321'), '987.7m')
