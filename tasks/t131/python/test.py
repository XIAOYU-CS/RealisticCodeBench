import unittest

import numpy as np


class TestTranslatePointCloud(unittest.TestCase):

    def test_simple_translation(self):
        point_cloud = np.array([[1.0, 2.0, 3.0]])
        translation_vector = np.array([1.0, 1.0, 1.0])
        expected_output = np.array([[2.0, 3.0, 4.0]])
        np.testing.assert_array_almost_equal(translate_3d_point_cloud(point_cloud, translation_vector), expected_output)

    def test_multiple_points_translation(self):
        point_cloud = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
        translation_vector = np.array([1.0, 2.0, 3.0])
        expected_output = np.array([[2.0, 4.0, 6.0], [5.0, 7.0, 9.0]])
        np.testing.assert_array_almost_equal(translate_3d_point_cloud(point_cloud, translation_vector), expected_output)

    def test_zero_translation(self):
        point_cloud = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
        translation_vector = np.array([0.0, 0.0, 0.0])
        expected_output = point_cloud
        np.testing.assert_array_almost_equal(translate_3d_point_cloud(point_cloud, translation_vector), expected_output)

    def test_negative_translation(self):
        point_cloud = np.array([[1.0, 2.0, 3.0]])
        translation_vector = np.array([-1.0, -2.0, -3.0])
        expected_output = np.array([[0.0, 0.0, 0.0]])
        np.testing.assert_array_almost_equal(translate_3d_point_cloud(point_cloud, translation_vector), expected_output)

    def test_invalid_translation_vector_length(self):
        point_cloud = np.array([[1.0, 2.0, 3.0]])
        translation_vector = np.array([1.0, 2.0])

        with self.assertRaises(ValueError):
            translate_3d_point_cloud(point_cloud, translation_vector)
