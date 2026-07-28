import unittest
from pathlib import Path

class TestIsValidPathFormat(unittest.TestCase):
    def test_non_string_input(self):
        self.assertFalse(is_valid_path_format(123))
        self.assertFalse(is_valid_path_format(None))
        self.assertFalse(is_valid_path_format(['path']))
        self.assertFalse(is_valid_path_format({'path': 'value'}))

    def test_invalid_characters(self):
        self.assertFalse(is_valid_path_format('path?with?invalid?chars'))
        self.assertFalse(is_valid_path_format('invalid*path'))
        self.assertFalse(is_valid_path_format('"quoted path"'))

    def test_absolute_paths(self):
        if Path('/').exists():  # Unix-like systems
            self.assertTrue(is_valid_path_format('/absolute/path'))
        if hasattr(Path, 'drive') and Path('C:').exists():  # Windows systems
            self.assertTrue(is_valid_path_format('C:\\absolute\\path'))

    def test_relative_paths(self):
        self.assertTrue(is_valid_path_format('relative/path'))
        self.assertTrue(is_valid_path_format('another.relative/path'))
        self.assertTrue(is_valid_path_format('a/b/c'))

    def test_single_part_paths(self):
        self.assertFalse(is_valid_path_format('singlepart'))
        self.assertFalse(is_valid_path_format('filename.txt'))
        self.assertFalse(is_valid_path_format('.'))
        self.assertFalse(is_valid_path_format('..'))