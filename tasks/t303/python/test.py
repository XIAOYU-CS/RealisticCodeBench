import unittest
class TestConvertStringsToNumbers(unittest.TestCase):

    def test_basic_string_to_int(self):
        result = convert_strings_to_numbers("123")
        self.assertEqual(result, 123)

    def test_basic_string_to_float(self):
        result = convert_strings_to_numbers("123.45")
        self.assertEqual(result, 123.45)

    def test_nested_dict_conversion(self):
        input_data = {
            "a": "123",
            "b": {
                "c": "45.67",
                "d": "hello"
            }
        }
        expected = {
            "a": 123,
            "b": {
                "c": 45.67,
                "d": "hello"
            }
        }
        result = convert_strings_to_numbers(input_data)
        self.assertEqual(result, expected)

    def test_list_conversion(self):
        input_data = ["123", "45.67", "hello", 42, None]
        expected = [123, 45.67, "hello", 42, None]
        result = convert_strings_to_numbers(input_data)
        self.assertEqual(result, expected)

    def test_custom_converter(self):
        def custom_bool_converter(s: str) -> Any:
            if s.lower() in ('true', 'false'):
                return s.lower() == 'true'
            return s

        input_data = {
            "number": "123",
            "boolean": "true",
            "text": "hello"
        }
        expected = {
            "number": 123,
            "boolean": True,
            "text": "hello"
        }
        result = convert_strings_to_numbers(input_data, custom_converters=[custom_bool_converter])
        self.assertEqual(result, expected)