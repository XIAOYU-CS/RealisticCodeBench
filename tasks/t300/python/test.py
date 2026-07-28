import unittest
import tempfile
import os
import shutil
import uuid


class TestParseKeyValueFormatDataFile(unittest.TestCase):

    def setUp(self):
        self.temp_dir = os.path.join(tempfile.gettempdir(), str(uuid.uuid4()))
        os.makedirs(self.temp_dir, exist_ok=True)
        self.temp_file_path = os.path.join(self.temp_dir, 'test_data.txt')

    def tearDown(self):
        if os.path.exists(self.temp_file_path):
            os.unlink(self.temp_file_path)
        if os.path.exists(self.temp_dir):
            shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_basic_key_value_parsing(self):
        content = """name Alice
age 30
city NewYork
"""
        with open(self.temp_file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        result = parse_key_value_format_data_file(self.temp_file_path)
        expected = [
            ["name", "Alice"],
            ["age", "30"],
            ["city", "NewYork"]
        ]
        self.assertEqual(result, expected)

    def test_with_custom_processors(self):
        content = """1 100
2 200
3 300
"""
        with open(self.temp_file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        result = parse_key_value_format_data_file(
            self.temp_file_path,
            lambda x: int(x),
            lambda x: int(x) ** 2
        )
        expected = [[1, 10000], [2, 40000], [3, 90000]]
        self.assertEqual(result, expected)

    def test_with_custom_separator(self):
        content = """name:Alice Smith
email:alice@example.com
phone:+123456789
"""
        with open(self.temp_file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        result = parse_key_value_format_data_file(
            self.temp_file_path,
            None,
            None,
            ":"
        )
        expected = [
            ["name", "Alice Smith"],
            ["email", "alice@example.com"],
            ["phone", "+123456789"]
        ]
        self.assertEqual(result, expected)

    def test_skip_empty_lines(self):
        content = """key1 value1

key2 value2

key3 value3

"""
        with open(self.temp_file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        result = parse_key_value_format_data_file(self.temp_file_path)
        expected = [
            ["key1", "value1"],
            ["key2", "value2"],
            ["key3", "value3"]
        ]
        self.assertEqual(result, expected)

    def test_handle_invalid_line_format(self):
        content = """valid_line 123
invalid_line_without_value
another_valid line
"""
        with open(self.temp_file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        with self.assertRaises(ValueError):
            parse_key_value_format_data_file(self.temp_file_path)
