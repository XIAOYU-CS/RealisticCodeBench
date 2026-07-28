import unittest


class TestConvertTimeHmsStringToMs(unittest.TestCase):

    def test_converts_typical_time_string_correctly(self):
        result = convert_hms_string_to_milliseconds('1h30m15s')
        self.assertEqual(result, 5415000)

    def test_correctly_converts_string_with_zero_values(self):
        result = convert_hms_string_to_milliseconds('0h0m0s')
        self.assertEqual(result, 0)

    def test_converts_maximum_single_digit_values(self):
        result = convert_hms_string_to_milliseconds('9h59m59s')
        self.assertEqual(result, 35999000)

    def test_handles_large_values(self):
        result = convert_hms_string_to_milliseconds('100h0m0s')
        self.assertEqual(result, 360000000)

    def test_correctly_converts_strings_with_leading_zeros(self):
        result = convert_hms_string_to_milliseconds('01h01m01s')
        self.assertEqual(result, 3661000)
