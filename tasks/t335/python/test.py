import unittest

class TestProcessStringQuotes(unittest.TestCase):

    def test_strip_outer_quotes_only(self):
        result = process_string_quotes('"Hello World"', strip_outer=True, escape_inner=False, enclose_final=False)
        self.assertEqual(result, 'Hello World')
        result = process_string_quotes("'Hello World'", strip_outer=True, escape_inner=False, enclose_final=False)
        self.assertEqual(result, 'Hello World')

    def test_escape_inner_quotes(self):
        result = process_string_quotes('He said "Hello" to me', strip_outer=False, escape_inner=False,
                                       enclose_final=False)
        self.assertEqual(result, 'He said \\"Hello\\" to me')

    def test_unescape_inner_quotes(self):
        result = process_string_quotes('"Hello \\"World\\""', strip_outer=True, escape_inner=True, enclose_final=True)
        self.assertEqual(result, '"Hello "World""')

    def test_escape_and_enclose(self):
        result = process_string_quotes('Hello "World"', strip_outer=False, escape_inner=False, enclose_final=True)
        self.assertEqual(result, '"Hello \\"World\\""')

    def test_strip_without_enclosing(self):
        result = process_string_quotes('"Hello"', strip_outer=True, escape_inner=True, enclose_final=False)
        self.assertEqual(result, 'Hello')
