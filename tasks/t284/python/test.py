import unittest


class Tester(unittest.TestCase):
    def test_basic_extraction(self):
        input_data = "This is a sample text with some data {data: \"value\"} and more text."
        result = extract_string_from_braces(input_data)
        self.assertEqual(result, "data: \"value\"")

    def test_no_braces(self):
        input_data = "This string has no braces."
        result = extract_string_from_braces(input_data)
        self.assertEqual(result, "No opening brace found.")

    def test_only_opening_brace(self):
        input_data = "This string has an opening brace { but no closing brace."
        result = extract_string_from_braces(input_data)
        self.assertEqual(result, "No closing brace found.")

    def test_only_closing_brace(self):
        input_data = "This string has a closing brace } but no opening brace."
        result = extract_string_from_braces(input_data)
        self.assertEqual(result, "No opening brace found.")

    def test_multiple_braces(self):
        input_data = "First {first} and second {second} braces."
        result = extract_string_from_braces(input_data)
        self.assertEqual(result, "first")

    def test_empty_braces(self):
        input_data = "This string has empty braces {} and some text."
        result = extract_string_from_braces(input_data)
        self.assertEqual(result, "")
