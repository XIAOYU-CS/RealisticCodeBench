import unittest


class TestHexToAnsi(unittest.TestCase):

    def test_valid_colors(self):
        self.assertEqual(hex_to_ansi("#FF5733"), "\x1b[38;2;255;87;51m")
        self.assertEqual(hex_to_ansi("#00FF00"), "\x1b[38;2;0;255;0m")
        self.assertEqual(hex_to_ansi("#0000FF"), "\x1b[38;2;0;0;255m")

    def test_black_and_white(self):
        self.assertEqual(hex_to_ansi("#000000"), "\x1b[38;2;0;0;0m")
        self.assertEqual(hex_to_ansi("#FFFFFF"), "\x1b[38;2;255;255;255m")

    def test_lowercase_hex_digits(self):
        self.assertEqual(hex_to_ansi("#abcdef"), "\x1b[38;2;171;205;239m")

    def test_leading_zero_components(self):
        self.assertEqual(hex_to_ansi("#0A0B0C"), "\x1b[38;2;10;11;12m")

    def test_invalid_format(self):
        with self.assertRaises(ValueError):
            hex_to_ansi("FF5733")
        with self.assertRaises(ValueError):
            hex_to_ansi("#FFF")

    def test_invalid_hex_digits(self):
        with self.assertRaises(ValueError):
            hex_to_ansi("#GG0000")
