import unittest

class TestColors(unittest.TestCase):

    def test_red(self):
        input_text = "Hello"
        expected_output = "\033[91mHello\033[0m"
        self.assertEqual(Colors.red(input_text), expected_output)

    def test_green(self):
        input_text = "Hello"
        expected_output = "\033[92mHello\033[0m"
        self.assertEqual(Colors.green(input_text), expected_output)

    def test_blue(self):
        input_text = "Hello"
        expected_output = "\033[94mHello\033[0m"
        self.assertEqual(Colors.blue(input_text), expected_output)

    def test_yellow(self):
        input_text = "Hello"
        expected_output = "\033[93mHello\033[0m"
        self.assertEqual(Colors.yellow(input_text), expected_output)

    def test_magenta(self):
        input_text = "Hello"
        expected_output = "\033[95mHello\033[0m"
        self.assertEqual(Colors.magenta(input_text), expected_output)

    def test_cyan(self):
        input_text = "Hello"
        expected_output = "\033[96mHello\033[0m"
        self.assertEqual(Colors.cyan(input_text), expected_output)

    def test_combined_colors(self):
        input_text_red = Colors.red("Red")
        input_text_blue = Colors.blue("Blue")
        input_text_combined = f"{input_text_red} and {input_text_blue}"
        expected_output = "\033[91mRed\033[0m and \033[94mBlue\033[0m"
        self.assertEqual(input_text_combined, expected_output)
