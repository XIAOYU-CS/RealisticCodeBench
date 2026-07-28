import unittest


class TestConvertCsvValues(unittest.TestCase):

    def test_valid_numeric_strings(self):
        row = {'value1': '1,234', 'value2': '5,678', 'value3': '9,876'}
        expected = {'value1': '1.234', 'value2': '5.678', 'value3': '9.876'}
        result = standardize_csv_row_numeric_values(row)
        self.assertEqual(result, expected)

    def test_non_numeric_strings(self):
        row = {'value1': 'not_a_number', 'value2': 'hello', 'value3': 'world'}
        expected = {'value1': None, 'value2': None, 'value3': None}
        result = standardize_csv_row_numeric_values(row)
        self.assertEqual(result, expected)

    def test_mixed_values(self):
        row = {'value1': '1,234', 'value2': 'not_a_number', 'value3': '3,14159'}
        expected = {'value1': '1.234', 'value2': None, 'value3': '3.14159'}
        result = standardize_csv_row_numeric_values(row)
        self.assertEqual(result, expected)

    def test_no_values(self):
        row = {'value1': 'aaaa', 'value2': 'not_a_number', 'value3': '3,14'}
        expected = {'value1': None, 'value2': None, 'value3': '3.14'}
        result = standardize_csv_row_numeric_values(row)
        self.assertEqual(result, expected)

    def test_edge_cases(self):
        row = {'value1': '', 'value2': '0.0', 'value3': '1,23'}
        expected = {'value1': None, 'value2': '0.0', 'value3': '1.23'}
        result = standardize_csv_row_numeric_values(row)
        self.assertEqual(result, expected)
