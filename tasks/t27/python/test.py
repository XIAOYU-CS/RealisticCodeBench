import unittest
import numpy as np

class TestChangeReferenceFrame(unittest.TestCase):
    def setUp(self):
        self.point_cloud = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
        self.ref_frame_points = [np.array([0, 0, 0]), np.array([1, 0, 0]), np.array([0, 1, 0])]

    def test_identity_transformation(self):
        result = transform_point_cloud_to_reference_frame(self.point_cloud, self.ref_frame_points)
        np.testing.assert_array_almost_equal(result, self.point_cloud - np.array([0, 0, 0]))

    def test_translation(self):
        frame_points = [np.array([1, 1, 1]), np.array([2, 1, 1]), np.array([1, 2, 1])]
        result = transform_point_cloud_to_reference_frame(self.point_cloud, frame_points)
        expected = np.array([[-1. , 0.,  1.], [ 2. , 3.,  4.], [ 5.,  6. , 7.]])
        np.testing.assert_array_almost_equal(result, expected)

    def test_rotation(self):
        frame_points = [np.array([0, 0, 0]), np.array([0, 1, 0]), np.array([0, 1, 1])]
        result = transform_point_cloud_to_reference_frame(self.point_cloud, frame_points)
        expected = np.array([[2. , 3.,  1.], [ 5. , 6.,  4.], [ 8.,  9. , 7.]])
        np.testing.assert_array_almost_equal(result, expected)

    def test_non_orthonormal_frame(self):
        frame_points = [np.array([0, 0, 0]), np.array([1, 0, 0]), np.array([1, 1, 0])]
        result = transform_point_cloud_to_reference_frame(self.point_cloud, frame_points)
        u = np.array([1, 0, 0])
        v = np.array([0, 1, 0])
        w = np.cross(u, v)
        rotation_matrix = np.column_stack((u, v, w))
        expected = np.dot(self.point_cloud, rotation_matrix.T)
        np.testing.assert_array_almost_equal(result, expected)

    def test_inverted_frame(self):
        frame_points = [np.array([0, 0, 0]), np.array([-1, 0, 0]), np.array([0, -1, 0])]
        result = transform_point_cloud_to_reference_frame(self.point_cloud, frame_points)
        expected = np.dot(self.point_cloud, np.array([[-1, 0, 0], [0, -1, 0], [0, 0, 1]]))
        np.testing.assert_array_almost_equal(result, expected)
