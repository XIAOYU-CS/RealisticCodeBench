import unittest


class Tester(unittest.TestCase):

    def test_split_string_regular_sentence(self):
        input_str = "Hello world from Catch2"
        expected = ["Hello", "world", "from", "Catch2"]
        self.assertEqual(split_string(input_str), expected)

    def test_handle_multiple_spaces(self):
        input_str = "Multiple   spaces between words"
        expected = ["Multiple", "spaces", "between", "words"]
        self.assertEqual(split_string(input_str), expected)

    def test_single_word_input(self):
        input_str = "Single"
        expected = ["Single"]
        self.assertEqual(split_string(input_str), expected)

    def test_empty_string_input(self):
        input_str = ""
        expected = []
        self.assertEqual(split_string(input_str), expected)

    def test_leading_and_trailing_spaces(self):
        input_str = "   Leading and trailing spaces   "
        expected = ["Leading", "and", "trailing", "spaces"]
        self.assertEqual(split_string(input_str), expected)
