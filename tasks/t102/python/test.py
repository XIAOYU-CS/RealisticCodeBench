import numpy as np
import unittest

class TestShearTransformation(unittest.TestCase):
    def test_identity_shear(self):
        matrix = np.array([[1, 2], [3, 4]])
        shear_factor = 0
        expected_output = np.array([[1, 2], [3, 4]])
        result = apply_shear_x(matrix, shear_factor)
        np.testing.assert_array_equal(result, expected_output, "The matrix should remain unchanged with zero shear factor.")

    def test_positive_shear(self):
        matrix = np.array([[1, 2], [3, 4]])
        shear_factor = 1
        expected_output = np.array([[1, 3], [3, 7]])
        result = apply_shear_x(matrix, shear_factor)
        np.testing.assert_array_equal(result, expected_output, "The matrix should be correctly sheared.")

    def test_negative_shear(self):
        matrix = np.array([[1, 2], [3, 4]])
        shear_factor = -1
        expected_output = np.array([[1, 1], [3, 1]])
        result = apply_shear_x(matrix, shear_factor)
        np.testing.assert_array_equal(result, expected_output, "The matrix should be correctly sheared negatively.")


    def test_high_shear_factor(self):
        matrix = np.array([[1, 1], [1, 1]])
        shear_factor = 10
        expected_output = np.array([[1, 11], [1, 11]])
        result = apply_shear_x(matrix, shear_factor)
        np.testing.assert_array_equal(result, expected_output, "The matrix should be correctly sheared with a high shear factor.")

    def test_fractional_shear_non_square_matrix(self):
        matrix = np.array([[2, 5], [-4, 3], [0, -1]])
        shear_factor = 0.5
        expected_output = np.array([[2, 6], [-4, 1], [0, -1]])
        result = apply_shear_x(matrix, shear_factor)
        np.testing.assert_array_equal(result, expected_output, "The matrix should be correctly sheared for non-square input and fractional factors.")
