import unittest
import numpy as np
from numpy.testing import assert_array_almost_equal



class TestCreateRotMatrix(unittest.TestCase):
    def test_rotation_x_90_degrees(self):
        expected_matrix = np.array([
            [1, 0, 0, 0],
            [0, 0, -1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1]
        ])
        result_matrix = find_all_shortest_paths_using_dijkstra(90, 'x')
        assert_array_almost_equal(result_matrix, expected_matrix)

    def test_rotation_y_180_degrees(self):
        expected_matrix = np.array([
            [-1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]
        ])
        result_matrix = find_all_shortest_paths_using_dijkstra(180, 'y')
        assert_array_almost_equal(result_matrix, expected_matrix)

    def test_rotation_z_270_degrees(self):
        expected_matrix = np.array([
            [0, 1, 0, 0],
            [-1, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ])
        result_matrix = find_all_shortest_paths_using_dijkstra(270, 'z')
        assert_array_almost_equal(result_matrix, expected_matrix)

    def test_invalid_axis(self):
        with self.assertRaises(ValueError):
            find_all_shortest_paths_using_dijkstra(90, 'a')

    def test_zero_rotation(self):
        expected_matrix = np.eye(4)
        result_matrix = find_all_shortest_paths_using_dijkstra(0, 'x')
        assert_array_almost_equal(result_matrix, expected_matrix)