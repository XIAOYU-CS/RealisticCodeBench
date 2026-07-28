import os
import unittest


class TestSaveContentToFile(unittest.TestCase):

    def setUp(self):
        self.test_file_path = 'test_output.txt'

    def tearDown(self):
        if os.path.exists(self.test_file_path):
            os.remove(self.test_file_path)

    def test_basic_content(self):
        content = "Hello,  World!  "
        expected = "Hello, World!"
        save_content_to_file(content, self.test_file_path)
        with open(self.test_file_path, 'r', encoding='utf-8') as file:
            result = file.read().strip()
        self.assertEqual(result, expected)

    def test_multiple_spaces_and_empty_lines(self):
        content = """

        This is a    test.

        Another line.      
        """
        expected = "This is a test. Another line."
        save_content_to_file(content, self.test_file_path)
        with open(self.test_file_path, 'r', encoding='utf-8') as file:
            result = file.read().strip()
        self.assertEqual(result, expected)

    def test_only_whitespace(self):
        content = "    \n  \n   "
        expected = ""
        save_content_to_file(content, self.test_file_path)
        with open(self.test_file_path, 'r', encoding='utf-8') as file:
            result = file.read().strip()
        self.assertEqual(result, expected)

    def test_empty_content(self):
        content = ""
        expected = ""
        save_content_to_file(content, self.test_file_path)
        with open(self.test_file_path, 'r', encoding='utf-8') as file:
            result = file.read().strip()
        self.assertEqual(result, expected)

    def test_mixed_whitespace(self):
        content = "Alpha\t\tBeta\nGamma\r\n   Delta"
        expected = "Alpha Beta Gamma Delta"
        save_content_to_file(content, self.test_file_path)
        with open(self.test_file_path, 'r', encoding='utf-8') as file:
            result = file.read().strip()
        self.assertEqual(result, expected)
