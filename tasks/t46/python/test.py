import unittest

class TestRemoveCommonIndentation(unittest.TestCase):

    def test_empty_string(self):
        self.assertEqual(remove_common_indentation(""), "", "Should return an empty string")

    def test_single_line_string(self):
        self.assertEqual(remove_common_indentation("No indentation here"), "No indentation here", "Should return the same string as input")

    def test_multiple_lines_with_uniform_indentation(self):
        input_text = "    Line one\n    Line two\n    Line three"
        expected_output = "Line one\nLine two\nLine three"
        self.assertEqual(remove_common_indentation(input_text), expected_output, "Should remove common leading indentation")

    def test_multiple_lines_with_mixed_indentation(self):
        input_text = "  Line one\n  Line two\n  Line three"
        expected_output = "Line one\nLine two\nLine three"
        self.assertEqual(remove_common_indentation(input_text), expected_output, "Should remove the minimum common indentation")

    def test_blank_lines_and_trailing_spaces(self):
        input_text = "    Line one  \n\n      Line two  "
        expected_output = "Line one  \n\n  Line two  "
        self.assertEqual(remove_common_indentation(input_text), expected_output, "Should ignore blank lines and preserve trailing spaces")
