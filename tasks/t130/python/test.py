import unittest

import numpy as np


class TestRotatePointCloud(unittest.TestCase):

    def test_no_rotation(self):
        point_cloud = np.array([[1.0, 2.0, 3.0]])
        rotation_angle = 0
        expected_output = point_cloud
        np.testing.assert_array_almost_equal(rotate_point_cloud_around_y_axis(point_cloud, rotation_angle), expected_output)

    def test_180_degree_rotation(self):
        point_cloud = np.array([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]])
        rotation_angle = np.pi  # 180 degrees
        expected_output = np.array([[-1.0, 0.0, 0.0], [0.0, 1.0, 0.0]])  # [1,0,0] -> [-1,0,0]
        np.testing.assert_array_almost_equal(rotate_point_cloud_around_y_axis(point_cloud, rotation_angle), expected_output)

    def test_full_rotation(self):
        point_cloud = np.array([[1.0, 2.0, 3.0]])
        rotation_angle = 2 * np.pi  # 360 degrees
        expected_output = point_cloud  # Should return the same point cloud
        np.testing.assert_array_almost_equal(rotate_point_cloud_around_y_axis(point_cloud, rotation_angle), expected_output)

    def test_90_degree_rotation(self):
        point_cloud = np.array([[1.0, 0.0, 0.0], [0.0, 0.0, 1.0]])
        rotation_angle = np.pi / 2
        expected_output = np.array([[0.0, 0.0, 1.0], [-1.0, 0.0, 0.0]])
        np.testing.assert_array_almost_equal(rotate_point_cloud_around_y_axis(point_cloud, rotation_angle), expected_output)

    def test_empty_point_cloud(self):
        point_cloud = np.empty((0, 3))
        result = rotate_point_cloud_around_y_axis(point_cloud, np.pi / 2)
        self.assertEqual(result.shape, (0, 3))
        np.testing.assert_array_almost_equal(result, point_cloud)
