import unittest


class TestCompressWhitespace(unittest.TestCase):

    def test_single_spaces(self):
        self.assertEqual(compress_whitespace("This is a test string."), "This is a test string.")

    def test_multiple_spaces(self):
        self.assertEqual(compress_whitespace("This    is  a   test   string."), "This is a test string.")

    def test_leading_trailing_spaces(self):
        self.assertEqual(compress_whitespace("   Leading and trailing spaces   "), "Leading and trailing spaces")

    def test_only_spaces(self):
        self.assertEqual(compress_whitespace("       "), "")

    def test_empty_string(self):
        self.assertEqual(compress_whitespace(""), "")