import unittest


class TestIsSnakeCase(unittest.TestCase):

    def test_valid_snake_case(self):
        self.assertTrue(is_snake_case('snake_case'))

    def test_valid_snake_case_multiple_words(self):
        self.assertTrue(is_snake_case('snake_case_example'))

    def test_uppercase_start(self):
        self.assertFalse(is_snake_case('Snake_Case'))

    def test_mixed_case_letters(self):
        self.assertFalse(is_snake_case('snakeCASE'))

    def test_string_with_numbers(self):
        self.assertFalse(is_snake_case('snake_case_123'))

    def test_empty_string(self):
        self.assertFalse(is_snake_case(''))
