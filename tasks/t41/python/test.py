import os
import unittest
import numpy as np

class TestReadColumns(unittest.TestCase):

    def setUp(self):
        self.test_file = 'test_file.txt'

    def tearDown(self):
        if os.path.exists(self.test_file):
            os.remove(self.test_file)

    def test_basic_functionality(self):
        content = """Line 1
Line 2
/
1.0 2.0 3.0
4.0 5.0 6.0
"""
        with open(self.test_file, 'w') as f:
            f.write(content)

        result = read_numerical_columns_from_file(self.test_file)
        expected_result = np.array([[1.0, 2.0, 3.0],
                                    [4.0, 5.0, 6.0]])
        np.testing.assert_array_equal(result, expected_result)

    def test_no_slash_character(self):
        content = """Line 1
Line 2
Line 3
"""
        with open(self.test_file, 'w') as f:
            f.write(content)

        with self.assertRaises(ValueError):
            read_numerical_columns_from_file(self.test_file)

    def test_file_with_comments_and_empty_lines(self):
        content = """Line 1
/
! This is a comment
1.0 2.0 3.0

4.0 5.0 6.0
! Another comment
"""
        with open(self.test_file, 'w') as f:
            f.write(content)

        result = read_numerical_columns_from_file(self.test_file)
        expected_result = np.array([[1.0, 2.0, 3.0],
                                    [4.0, 5.0, 6.0]])
        np.testing.assert_array_equal(result, expected_result)

    def test_different_number_of_columns(self):
        content = """Line 1
/
1.0 2.0
3.0 4.0
5.0 6.0 7.0
"""
        with open(self.test_file, 'w') as f:
            f.write(content)

        with self.assertRaises(ValueError):
            read_numerical_columns_from_file(self.test_file)

    def test_empty_file(self):
        content = """"""
        with open(self.test_file, 'w') as f:
            f.write(content)

        with self.assertRaises(Exception):
            read_numerical_columns_from_file(self.test_file)
