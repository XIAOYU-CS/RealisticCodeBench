import csv
import io
import unittest


class TestAppendSkipRow(unittest.TestCase):

    def setUp(self):
        self.mock_file = io.StringIO()
        self.mock_file.write("Alice,30,USA\nBob,25,UK\nCharlie,35,Canada\n")
        self.mock_file.seek(0)  # Reset pointer to the start of the mock file
        self.reader = csv.reader(self.mock_file)

    def test_append_new_row(self):
        new_row = ['David', '28', 'Australia']
        append_row_after_skip_row(self.mock_file, self.reader, new_row)

        self.mock_file.seek(0)  # Reset pointer to read from the start
        result = list(csv.reader(self.mock_file))
        self.assertIn(new_row, result)

    def test_skip_row_when_first_three_columns_match(self):
        new_row = ['Alice', '30', 'USA', 'Engineer']
        append_row_after_skip_row(self.mock_file, self.reader, new_row)

        self.mock_file.seek(0)
        result = list(csv.reader(self.mock_file))
        self.assertNotIn(new_row, result)
        self.assertEqual(1, sum(row[:3] == new_row[:3] for row in result))

    def test_skip_different_values(self):
        new_row = ['Alice', '31', 'USA']  # Same name, different age
        append_row_after_skip_row(self.mock_file, self.reader, new_row)

        self.mock_file.seek(0)  # Reset pointer to read from the start
        result = list(csv.reader(self.mock_file))
        self.assertIn(new_row, result)

    def test_append_row_with_different_columns(self):
        new_row = ['Eve', '40', 'Australia', 'Engineer']
        append_row_after_skip_row(self.mock_file, self.reader, new_row)

        self.mock_file.seek(0)  # Reset pointer to read from the start
        result = list(csv.reader(self.mock_file))
        self.assertIn(new_row, result)

    def test_multiple_appends(self):
        new_rows = [
            ['Frank', '29', 'Germany'],
            ['Grace', '22', 'France']
        ]

        for row in new_rows:
            append_row_after_skip_row(self.mock_file, self.reader, row)
            self.mock_file.seek(0)  # Reset pointer for the next read
            self.reader = csv.reader(self.mock_file)  # Recreate the reader after each append

        self.mock_file.seek(0)  # Reset pointer to read from the start
        result = list(csv.reader(self.mock_file))
        for row in new_rows:
            self.assertIn(row, result)
