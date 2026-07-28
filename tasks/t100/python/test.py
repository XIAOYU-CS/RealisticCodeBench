import numpy as np
import unittest



class TestGetTranslationFunction(unittest.TestCase):

    def test_identity_matrix(self):
        matrix = np.array([[1, 0, 0],
                           [0, 1, 0],
                           [0, 0, 1]])
        expected_translation = np.array([0.0, 0.0])
        np.testing.assert_array_equal(extract_translation_from_matrix(matrix), expected_translation)

    def test_translation_matrix(self):
        matrix = np.array([[1, 0, 5],
                           [0, 1, 10],
                           [0, 0, 1]])
        expected_translation = np.array([5.0, 10.0])
        np.testing.assert_array_equal(extract_translation_from_matrix(matrix), expected_translation)

    def test_negative_translation(self):
        matrix = np.array([[1, 0, -3],
                           [0, 1, -6],
                           [0, 0, 1]])
        expected_translation = np.array([-3.0, -6.0])
        np.testing.assert_array_equal(extract_translation_from_matrix(matrix), expected_translation)

    def test_rotation_and_translation(self):
        matrix = np.array([[0, -1, 2],
                           [1,  0, 3],
                           [0,  0, 1]])
        expected_translation = np.array([2.0, 3.0])
        np.testing.assert_array_equal(extract_translation_from_matrix(matrix), expected_translation)

    def test_scaling_and_translation(self):
        matrix = np.array([[2, 0, -1],
                           [0, 0.5, 4],
                           [0, 0, 1]])
        expected_translation = np.array([-1.0, 4.0])
        np.testing.assert_array_equal(extract_translation_from_matrix(matrix), expected_translation)