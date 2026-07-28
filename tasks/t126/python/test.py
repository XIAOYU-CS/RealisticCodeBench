import json
import os
import unittest


class TestReadJsonl(unittest.TestCase):

    def setUp(self):
        self.valid_jsonl_file = 'test_valid.jsonl'
        self.invalid_jsonl_file = 'test_invalid.jsonl'
        self.nested_jsonl_file = 'test_nested.jsonl'
        self.non_existent_file = 'non_existent.jsonl'

        with open(self.valid_jsonl_file, 'w') as file:
            file.write('{"name": "Alice", "age": 30}\n')
            file.write('{"name": "Bob", "age": 25}\n')
            file.write('{"name": "Charlie", "age": 35}\n')
        with open(self.invalid_jsonl_file, 'w') as file:
            file.write('{"name": "Alice", "age": 30}\n')
            file.write('{"name": "Bob", "age": "twenty-five}\n')

    def tearDown(self):
        if os.path.isfile(self.valid_jsonl_file):
            os.remove(self.valid_jsonl_file)
        if os.path.isfile(self.invalid_jsonl_file):
            os.remove(self.invalid_jsonl_file)
        if os.path.isfile(self.nested_jsonl_file):
            os.remove(self.nested_jsonl_file)

    def test_read_valid_jsonl(self):
        expected_data = [
            {"name": "Alice", "age": 30},
            {"name": "Bob", "age": 25},
            {"name": "Charlie", "age": 35}
        ]
        result = read_and_parse_jsonl (self.valid_jsonl_file)
        self.assertEqual(result, expected_data)

    def test_file_not_found(self):
        with self.assertRaises(FileNotFoundError):
            read_and_parse_jsonl (self.non_existent_file)

    def test_empty_jsonl_file(self):
        empty_jsonl_file = 'test_empty.jsonl'
        with open(empty_jsonl_file, 'w') as file:
            file.write("")

        result = read_and_parse_jsonl (empty_jsonl_file)
        self.assertEqual(result, [])
        os.remove(empty_jsonl_file)

    def test_invalid_jsonl_file(self):
        with self.assertRaises(json.JSONDecodeError):
            read_and_parse_jsonl (self.invalid_jsonl_file)

    def test_whitespace_and_nested_values(self):
        with open(self.nested_jsonl_file, 'w') as file:
            file.write('  {"ok": true, "items": [1, 2], "meta": {"value": null}}  \n')

        result = read_and_parse_jsonl (self.nested_jsonl_file)
        self.assertEqual(result, [{"ok": True, "items": [1, 2], "meta": {"value": None}}])
