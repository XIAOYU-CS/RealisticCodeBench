import unittest


class TestIsKebabCase(unittest.TestCase):

    def test_valid_kebab_case(self):
        self.assertTrue(is_kebab_case('kebab-case'))

    def test_valid_kebab_case_multiple_words(self):
        self.assertTrue(is_kebab_case('this-is-a-valid-kebab-case'))

    def test_uppercase_letters(self):
        self.assertFalse(is_kebab_case('Kebab-Case'))

    def test_consecutive_hyphens(self):
        self.assertFalse(is_kebab_case('kebab--case'))

    def test_empty_string(self):
        self.assertFalse(is_kebab_case(''))
