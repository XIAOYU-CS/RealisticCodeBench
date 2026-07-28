import unittest


class TestSnakeToCamel(unittest.TestCase):
    def test_basic_conversion(self):
        self.assertEqual(snake_to_camel("hello_world"), "HelloWorld")

    def test_multiple_words(self):
        self.assertEqual(snake_to_camel("this_is_a_test"), "ThisIsATest")

    def test_with_numbers(self):
        self.assertEqual(snake_to_camel("convert_this_123_string"), "ConvertThis123String")

    def test_leading_trailing_underscores(self):
        self.assertEqual(snake_to_camel("_leading_and_trailing_"), "LeadingAndTrailing")
        self.assertEqual(snake_to_camel("___multiple___underscores___"), "MultipleUnderscores")

    def test_empty_string(self):
        self.assertEqual(snake_to_camel(""), "")