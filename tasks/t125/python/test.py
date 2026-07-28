import unittest


class TestFormatDateString(unittest.TestCase):

    def test_default_format_success(self):
        date_str = "Mon, 15 Jan 2024 14:30:25 +0000 (UTC)"
        result = reformat_date_string(date_str)
        expected = "2024-01-15_14:30:25"
        self.assertEqual(result, expected)

    def test_custom_input_format_success(self):
        date_str = "2024-03-20 09:15:30"
        input_formats = ['%Y-%m-%d %H:%M:%S']
        result = reformat_date_string(date_str, input_formats=input_formats)
        expected = "2024-03-20_09:15:30"
        self.assertEqual(result, expected)

    def test_custom_output_format(self):
        date_str = "Mon, 15 Jan 2024 14:30:25 +0000 (UTC)"
        output_format = '%d/%m/%Y at %H:%M'
        result = reformat_date_string(date_str, output_format=output_format)
        expected = "15/01/2024 at 14:30"
        self.assertEqual(result, expected)

    def test_multiple_input_formats(self):
        date_str = "2024/12/25 16:45:30"
        input_formats = ['%Y-%m-%d %H:%M:%S', '%Y/%m/%d %H:%M:%S', '%d-%m-%Y']
        result = reformat_date_string(date_str, input_formats=input_formats)
        expected = "2024-12-25_16:45:30"
        self.assertEqual(result, expected)

    def test_invalid_date_string_returns_none(self):
        date_str = "invalid date format"
        input_formats = ['%Y-%m-%d', '%d/%m/%Y']
        result = reformat_date_string(date_str, input_formats=input_formats)
        self.assertIsNone(result)