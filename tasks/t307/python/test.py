import unittest


class TestFormatComment(unittest.TestCase):

    def test_hash_style_with_line_prefix(self):
        input_text = "This is a test comment that should be wrapped to multiple lines"
        result = format_comment_with_custom_style(input_text, max_length=30, comment_style="hash", line_prefix="[INFO] ")
        expected = "# [INFO] This is a test\n# [INFO] comment that should\n# [INFO] be wrapped to\n# [INFO] multiple lines"
        self.assertEqual(result, expected)

    def test_slash_style_simple_comment(self):
        input_text = "Simple single line comment"
        result = format_comment_with_custom_style(input_text, max_length=50, comment_style="slash")
        expected = "// Simple single line comment"
        self.assertEqual(result, expected)

    def test_block_style_multiline_comment(self):
        input_text = "This is a block comment that spans multiple lines and should be properly formatted"
        result = format_comment_with_custom_style(input_text, max_length=40, comment_style="block")
        expected = "/*\n* This is a block comment that spans\n* multiple lines and should be properly\n* formatted\n*/"
        self.assertEqual(result, expected)

    def test_multiline_input_with_word_wrapping(self):
        input_text = "First line of text\nSecond line with more words to wrap"
        result = format_comment_with_custom_style(input_text, max_length=25, comment_style="hash")
        expected = "# First line of text\n# Second line with more\n# words to wrap"
        self.assertEqual(result, expected)

    def test_irregular_whitespace_collapses_to_single_spaces(self):
        input_text = "Alpha   beta\tgamma\n\n delta"
        result = format_comment_with_custom_style(input_text, max_length=40, comment_style="hash")
        expected = "# Alpha beta gamma delta"
        self.assertEqual(result, expected)
