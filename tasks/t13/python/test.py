import os
import unittest
from unittest.mock import mock_open, patch


class TestCompareFiles(unittest.TestCase):

    def setUp(self):
        self.file1_path = 'file1.txt'
        self.file2_path = 'file2.txt'

    def tearDown(self):
        if os.path.exists(self.file1_path):
            os.remove(self.file1_path)
        if os.path.exists(self.file2_path):
            os.remove(self.file2_path)

    def test_identical_files(self):
        # Mock question for two identical files
        file1_content = "Line1\nLine2\nLine3\n"
        file2_content = "Line1\nLine2\nLine3\n"

        with open(self.file1_path, 'w') as f1, open(self.file2_path, 'w') as f2:
            f1.write(file1_content)
            f2.write(file2_content)

        result = diff_files(self.file1_path, self.file2_path)
        self.assertEqual(len(result), 0, "There should be no differences detected")

    def test_files_with_differences(self):
        file1_content = "Line1\nLine2\nLine3\n"
        file2_content = "Line1\nLineChanged\nLine3\n"

        with open(self.file1_path, 'w') as f1, open(self.file2_path, 'w') as f2:
            f1.write(file1_content)
            f2.write(file2_content)

        result = diff_files(self.file1_path, self.file2_path)
        self.assertNotEqual(len(result), 0, "There should be differences detected")

    def test_empty_files(self):
        open(self.file1_path, 'w').close()
        open(self.file2_path, 'w').close()

        result = diff_files(self.file1_path, self.file2_path)
        self.assertEqual(len(result), 0, "Empty files should not produce a diff")

    def test_nonexistent_file(self):
        with patch('builtins.open', side_effect=FileNotFoundError("File not found")):
            with self.assertRaises(FileNotFoundError):
                diff_files('nonexistent.txt', 'file2.txt')

    def test_file_reading_error(self):
        with patch('builtins.open', side_effect=IOError("Error reading file")):
            with self.assertRaises(IOError):
                diff_files('file1.txt', 'file2.txt')
