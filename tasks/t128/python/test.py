import unittest


class TestTransposeMatrix(unittest.TestCase):

    def test_square_matrix(self):
        matrix = [[1, 2], [3, 4]]
        expected = [[1, 3], [2, 4]]
        result = transpose_matrix(matrix)
        self.assertEqual(result, expected)

    def test_rectangular_matrix(self):
        matrix = [[1, 2, 3], [4, 5, 6]]
        expected = [[1, 4], [2, 5], [3, 6]]
        result = transpose_matrix(matrix)
        self.assertEqual(result, expected)


    def test_matrix_with_empty_rows(self):
        matrix = [[], []]
        expected = []
        result = transpose_matrix(matrix)
        self.assertEqual(result, expected)

    def test_single_element_matrix(self):
        matrix = [[5]]
        expected = [[5]]
        result = transpose_matrix(matrix)
        self.assertEqual(result, expected)

    def test_empty_matrix(self):
        matrix = []
        expected = []
        result = transpose_matrix(matrix)
        self.assertEqual(result, expected)
