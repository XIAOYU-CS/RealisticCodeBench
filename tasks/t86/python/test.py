import unittest

class TestMatrixPower(unittest.TestCase):

    def test_identity_matrix(self):
        matrix = [[1, 0], [0, 1]]
        expected = [[1, 0], [0, 1]]
        result = compute_matrix_power(matrix, 1)
        self.assertEqual(result, expected)

    def test_zero_power(self):
        matrix = [[2, 3], [1, 4]]
        expected = [[1, 0], [0, 1]]
        result = compute_matrix_power(matrix, 0)
        self.assertEqual(result, expected)

    def test_positive_power(self):
        matrix = [[2, 1], [1, 3]]
        expected = [[5, 5], [5, 10]]
        result = compute_matrix_power(matrix, 2)
        self.assertEqual(result, expected)

    def test_single_element_matrix(self):
        matrix = [[5]]
        expected = [[125]]
        result = compute_matrix_power(matrix, 3)
        self.assertEqual(result, expected)

    def test_negative_power(self):
        matrix = [[2, 1], [1, 3]]
        with self.assertRaises(Exception):
            compute_matrix_power(matrix, -1)
