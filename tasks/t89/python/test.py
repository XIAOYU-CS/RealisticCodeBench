import os
import tempfile
import unittest


class TestFormatText(unittest.TestCase):

    def test_basic_text(self):
        input_text = "This is line one.\nThis is line two.\nThis is line three."
        expected_output = "This is line one. This is line two. This is line three."

        with tempfile.NamedTemporaryFile(delete=False, mode='w+t') as input_file:
            input_file.write(input_text)
            input_file.seek(0)
            output_file_path = tempfile.mktemp(suffix='.txt')

            format_text(input_file.name, output_file_path)

            with open(output_file_path, 'r') as output_file:
                output_text = output_file.read().strip()

            self.assertEqual(expected_output, output_text)

        os.remove(input_file.name)
        os.remove(output_file_path)

    def test_single_line(self):
        input_text = "This is a single line."
        expected_output = "This is a single line."

        with tempfile.NamedTemporaryFile(delete=False, mode='w+t') as input_file:
            input_file.write(input_text)
            input_file.seek(0)
            output_file_path = tempfile.mktemp(suffix='.txt')

            format_text(input_file.name, output_file_path)

            with open(output_file_path, 'r') as output_file:
                output_text = output_file.read().strip()

            self.assertEqual(expected_output, output_text)

        os.remove(input_file.name)
        os.remove(output_file_path)

    def test_empty_file(self):
        input_text = ""
        expected_output = ""

        with tempfile.NamedTemporaryFile(delete=False, mode='w+t') as input_file:
            input_file.write(input_text)
            input_file.seek(0)
            output_file_path = tempfile.mktemp(suffix='.txt')

            format_text(input_file.name, output_file_path)

            with open(output_file_path, 'r') as output_file:
                output_text = output_file.read().strip()

            self.assertEqual(expected_output, output_text)

        os.remove(input_file.name)
        os.remove(output_file_path)

    def test_file_with_no_newlines(self):
        input_text = "This is a continuous line without breaks."
        expected_output = "This is a continuous line without breaks."

        with tempfile.NamedTemporaryFile(delete=False, mode='w+t') as input_file:
            input_file.write(input_text)
            input_file.seek(0)
            output_file_path = tempfile.mktemp(suffix='.txt')

            format_text(input_file.name, output_file_path)

            with open(output_file_path, 'r') as output_file:
                output_text = output_file.read().strip()

            self.assertEqual(expected_output, output_text)

        os.remove(input_file.name)
        os.remove(output_file_path)

    def test_missing_input_file(self):
        missing_input_path = tempfile.mktemp(suffix='.txt')
        output_file_path = tempfile.mktemp(suffix='.txt')

        format_text(missing_input_path, output_file_path)

        self.assertFalse(os.path.exists(output_file_path))
        if os.path.exists(output_file_path):
            os.remove(output_file_path)
