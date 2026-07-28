import unittest
import tempfile
import os
import json


class TestReplaceTextWithConfig(unittest.TestCase):

    def setUp(self):
        self.test_dir = tempfile.mkdtemp()

    def tearDown(self):
        for filename in os.listdir(self.test_dir):
            os.remove(os.path.join(self.test_dir, filename))
        os.rmdir(self.test_dir)

    def create_config_file(self, config_data, filename="config.json"):
        config_path = os.path.join(self.test_dir, filename)
        with open(config_path, 'w', encoding='utf-8') as f:
            json.dump(config_data, f)
        return config_path

    def test_exact_string_replacement(self):
        config = {
            "replacements": [
                {"pattern": "hello", "replacement": "hi"},
                {"pattern": "world", "replacement": "universe"}
            ]
        }
        config_path = self.create_config_file(config)

        input_text = "hello world, hello everyone"
        expected = "hi universe, hi everyone"

        result = replace_text_with_config(input_text, config_path)
        self.assertEqual(result, expected)

    def test_regex_replacement(self):
        config = {
            "replacements": [
                {"pattern": r"\d+", "replacement": "NUMBER"},
                {"pattern": r"[aeiou]", "replacement": "*"}
            ]
        }
        config_path = self.create_config_file(config)

        input_text = "hello 123 world 456"
        expected = "h*ll* NUMBER w*rld NUMBER"

        result = replace_text_with_config(input_text, config_path, use_regex=True)
        self.assertEqual(result, expected)

    def test_file_not_found_error(self):
        with self.assertRaises(FileNotFoundError):
            replace_text_with_config("test text", "/non/existent/file.json")

    def test_invalid_json_config(self):
        invalid_config_path = os.path.join(self.test_dir, "invalid_config.json")
        with open(invalid_config_path, 'w', encoding='utf-8') as f:
            f.write("{ invalid json content }")

        with self.assertRaises(json.JSONDecodeError):
            replace_text_with_config("test text", invalid_config_path)

    def test_missing_replacements_key(self):
        config = {
            "wrong_key": [
                {"pattern": "test", "replacement": "replacement"}
            ]
        }
        config_path = self.create_config_file(config)

        with self.assertRaises(ValueError) as context:
            replace_text_with_config("test text", config_path)
