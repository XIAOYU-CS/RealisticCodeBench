import numpy as np
import unittest


class TestGetRotationFunction(unittest.TestCase):

    def test_rotation_0_degrees(self):
        matrix = np.array([[1, 0, 0],
                           [0, 1, 0],
                           [0, 0, 1]])
        expected_rotation = 0.0
        self.assertAlmostEqual(extract_rotation_angle_from_matrix(matrix), expected_rotation, places=6)

    def test_rotation_90_degrees(self):
        matrix = np.array([[0, -1, 0],
                           [1, 0, 0],
                           [0, 0, 1]])
        expected_rotation = np.pi / 2
        self.assertAlmostEqual(extract_rotation_angle_from_matrix(matrix), expected_rotation, places=6)

    def test_rotation_180_degrees(self):
        matrix = np.array([[-1, 0, 0],
                           [0, -1, 0],
                           [0, 0, 1]])
        expected_rotation = np.pi
        self.assertAlmostEqual(extract_rotation_angle_from_matrix(matrix), expected_rotation, places=6)

    def test_rotation_negative_90_degrees(self):
        matrix = np.array([[0, 1, 0],
                           [-1, 0, 0],
                           [0, 0, 1]])
        expected_rotation = -np.pi / 2
        self.assertAlmostEqual(extract_rotation_angle_from_matrix(matrix), expected_rotation, places=6)

    def test_rejects_non_3x3_matrix(self):
        matrix = np.array([[1, 0],
                           [0, 1]])
        with self.assertRaises(ValueError):
            extract_rotation_angle_from_matrix(matrix)
