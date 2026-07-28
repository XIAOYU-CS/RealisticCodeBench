import unittest


class TestFormatComment(unittest.TestCase):

    def test_short_string(self):
        input_string = "This is a test."
        expected_output = "# This is a test."
        self.assertEqual(format_comment(input_string), expected_output)

    def test_long_string(self):
        input_string = "This is a test of the format_comment function which should wrap long lines correctly."
        expected_output = (
            "# This is a test of the format_comment function which should\n"
            "# wrap long lines correctly."
        )
        self.assertEqual(format_comment(input_string, max_length=60), expected_output)

    def test_multiple_lines(self):
        input_string = "First line.\nSecond line that is quite long and needs to be wrapped."
        expected_output = (
            "# First line.\n"
            "# Second line that is quite long and needs to be wrapped."
        )
        self.assertEqual(format_comment(input_string, max_length=60), expected_output)

    def test_exact_max_length(self):
        input_string = "A" * 60
        expected_output = "# " + "A" * 60
        self.assertEqual(format_comment(input_string, max_length=60), expected_output)

    def test_empty_string(self):
        input_string = ""
        expected_output = "# "
        self.assertEqual(format_comment(input_string), expected_output)
