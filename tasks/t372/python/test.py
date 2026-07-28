import unittest
from io import StringIO
import os
import tempfile
from unittest.mock import patch
class TestCatFunction(unittest.TestCase):

    def setUp(self):
        self.temp_files = []

    def tearDown(self):
        for temp_file in self.temp_files:
            if os.path.exists(temp_file):
                os.remove(temp_file)

    def create_temp_file(self, content):
        temp_file = tempfile.NamedTemporaryFile(mode='w', delete=False, encoding='utf-8')
        temp_file.write(content)
        temp_file.close()
        self.temp_files.append(temp_file.name)
        return temp_file.name

    def test_basic_file_reading(self):
        content = "Hello World\nThis is a test\nThird line\n"
        filename = self.create_temp_file(content)
        captured_output = StringIO()
        with patch('sys.stdout', captured_output):
            cat([filename])

        self.assertEqual(captured_output.getvalue(), content)

    def test_number_lines_option(self):
        content = "First line\nSecond line\nThird line\n"
        filename = self.create_temp_file(content)

        captured_output = StringIO()
        with patch('sys.stdout', captured_output):
            cat([filename], number_lines=True)

        expected_output = "     1  First line\n     2  Second line\n     3  Third line\n"
        self.assertEqual(captured_output.getvalue(), expected_output)

    def test_show_ends_option(self):
        content = "Line 1\nLine 2\nLine 3\n"
        filename = self.create_temp_file(content)

        captured_output = StringIO()
        with patch('sys.stdout', captured_output):
            cat([filename], show_ends=True)

        expected_output = "Line 1$\nLine 2$\nLine 3$\n"
        self.assertEqual(captured_output.getvalue(), expected_output)

    def test_squeeze_blank_option(self):
        content = "Line 1\n\n\n\nLine 2\n\nLine 3\n"
        filename = self.create_temp_file(content)

        captured_output = StringIO()
        with patch('sys.stdout', captured_output):
            cat([filename], squeeze_blank=True)

        expected_output = "Line 1\n\nLine 2\n\nLine 3\n"
        self.assertEqual(captured_output.getvalue(), expected_output)

    def test_file_not_found_error(self):
        non_existent_file = "non_existent_file.txt"
        captured_stderr = StringIO()
        with patch('sys.stderr', captured_stderr):
            cat([non_existent_file])
        error_output = captured_stderr.getvalue()
        self.assertIn(non_existent_file, error_output)