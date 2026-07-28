import unittest

class TestPadString(unittest.TestCase):
    def test_left_padding_default_char(self):
        input_str = "hello\nworld"
        expected = "    hello\n    world"
        self.assertEqual(pad_string(input_str, n=4), expected)

    def test_right_padding_custom_char(self):
        input_str = "test"
        expected = "test####"
        self.assertEqual(pad_string(input_str, n=4, char='#', side='right'), expected)

    def test_both_sides_padding_with_string(self):
        input_str = "line1\nline2"
        expected = "abline1ab\nabline2ab"
        self.assertEqual(pad_string(input_str, n=2, char='ab', side='both'), expected)

    def test_edge_cases_empty_string_and_zero_padding(self):
        self.assertEqual(pad_string(""), "")
        self.assertEqual(pad_string("example", n=0), "example")
        self.assertEqual(pad_string("test", n=-3), "test")

    def test_error_handling_invalid_side(self):
        with self.assertRaises(ValueError):
            pad_string("hello", n=4, side="center")
