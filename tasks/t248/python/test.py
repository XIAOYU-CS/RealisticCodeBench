import unittest


class TestIsPascalCase(unittest.TestCase):

    def test_valid_pascal_case(self):
        self.assertTrue(is_pascal_case('PascalCase'))

    def test_valid_pascal_case_multiple_words(self):
        self.assertTrue(is_pascal_case('PascalCaseExample'))

    def test_starts_with_lowercase(self):
        self.assertFalse(is_pascal_case('pascalCase'))

    def test_with_underscores(self):
        self.assertFalse(is_pascal_case('Pascal_case'))

    def test_empty_string(self):
        self.assertFalse(is_pascal_case(''))
