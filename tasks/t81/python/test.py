import unittest
import os

class TestPrependToEachLine(unittest.TestCase):
    def setUp(self):
        self.test_file_path = "test_file.txt"
        with open(self.test_file_path, 'w') as f:
            f.write("Line 1\nLine 2\nLine 3")

    def tearDown(self):
        os.remove(self.test_file_path)

    def test_prepend_string(self):
        prepend_to_each_line(self.test_file_path, "Test: ")
        with open(self.test_file_path, 'r') as f:
            lines = f.readlines()
            self.assertEqual(lines, ["Test: Line 1\n", "Test: Line 2\n", "Test: Line 3"])

    def test_prepend_empty_string(self):
        prepend_to_each_line(self.test_file_path, "")
        with open(self.test_file_path, 'r') as f:
            lines = f.readlines()
            self.assertEqual(lines, ["Line 1\n", "Line 2\n", "Line 3"])

    def test_prepend_special_characters(self):
        prepend_to_each_line(self.test_file_path, "#$%^&* ")
        with open(self.test_file_path, 'r') as f:
            lines = f.readlines()
            self.assertEqual(lines, ["#$%^&* Line 1\n", "#$%^&* Line 2\n", "#$%^&* Line 3"])

    def test_prepend_numeric_string(self):
        prepend_to_each_line(self.test_file_path, "123 ")
        with open(self.test_file_path, 'r') as f:
            lines = f.readlines()
            self.assertEqual(lines, ["123 Line 1\n", "123 Line 2\n", "123 Line 3"])

    def test_missing_file_raises(self):
        with self.assertRaises(FileNotFoundError):
            prepend_to_each_line(self.test_file_path + ".missing", "Test: ")
