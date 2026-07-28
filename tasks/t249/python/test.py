import unittest


class TestIsCamelCase(unittest.TestCase):

    def test_valid_camel_case(self):
        self.assertTrue(is_camel_case('camelCase'))

    def test_valid_camel_case_multiple_words(self):
        self.assertTrue(is_camel_case('camelCaseExample'))

    def test_uppercase_start(self):
        self.assertFalse(is_camel_case('CamelCase'))

    def test_underscores(self):
        self.assertFalse(is_camel_case('camel_case'))

    def test_empty_string(self):
        self.assertFalse(is_camel_case(''))
