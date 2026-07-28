import re
import unittest
from unittest.mock import patch, mock_open


class TestReadMappingFile(unittest.TestCase):

    def test_valid_mapping_file(self):
        mock_file_content = "'old_pattern1','new_word1'\n'old_pattern2','new_word2'\n"
        with patch("builtins.open", mock_open(read_data=mock_file_content)):
            result = load_regex_mappings_from_file("dummy_path.txt")
            expected = [
                (re.compile("old_pattern1"), "new_word1"),
                (re.compile("old_pattern2"), "new_word2"),
            ]
            self.assertEqual(result, expected)

    def test_missing_file(self):
        with self.assertRaises(FileNotFoundError):
            load_regex_mappings_from_file("non_existent_file.txt")

    def test_malformed_line_no_comma(self):
        mock_file_content = "'old_pattern1' 'new_word1'\n"
        with patch("builtins.open", mock_open(read_data=mock_file_content)):
            with self.assertRaises(ValueError) as context:
                load_regex_mappings_from_file("dummy_path.txt")
            self.assertEqual(str(context.exception), "Each line must contain exactly one comma separating the pattern and the replacement.")

    def test_valid_patterns_with_special_characters(self):
        mock_file_content = "'\\d+', 'number'\n'\\w+', 'word'\n"
        with patch("builtins.open", mock_open(read_data=mock_file_content)):
            result = load_regex_mappings_from_file("dummy_path.txt")
            expected = [
                (re.compile(r"\d+"), "number"),
                (re.compile(r"\w+"), "word"),
            ]
            self.assertEqual(result, expected)

    def test_empty_mapping_file(self):
        with patch("builtins.open", mock_open(read_data="")):
            self.assertEqual(load_regex_mappings_from_file("dummy_path.txt"), [])
