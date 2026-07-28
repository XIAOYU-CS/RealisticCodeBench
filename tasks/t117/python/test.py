import unittest


class TestCamelToSnake(unittest.TestCase):
    def test_basic_conversion(self):
        self.assertEqual(camel_to_snake("HelloWorld"), "hello_world")

    def test_multiple_words(self):
        self.assertEqual(camel_to_snake("ThisIsATest"), "this_is_a_test")

    def test_with_numbers(self):
        self.assertEqual(camel_to_snake("ConvertThis123String"), "convert_this123_string")

    def test_leading_uppercase(self):
        self.assertEqual(camel_to_snake("PythonFunction"), "python_function")

    def test_empty_string(self):
        self.assertEqual(camel_to_snake(""), "")
