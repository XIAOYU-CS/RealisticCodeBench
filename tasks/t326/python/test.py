import unittest
import numpy as np


class TestMollerTrumboreNumpy(unittest.TestCase):

    def test_single_ray_single_triangle_intersection(self):
        origins = np.array([[0.0, 0.0, -1.0]])
        directions = np.array([[0.0, 0.0, 1.0]])
        triangles = np.array([[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]])
        valid, distances = moller_trumbore_numpy(origins, directions, triangles)
        self.assertTrue(valid[0, 0])
        self.assertAlmostEqual(distances[0, 0], 1.0, places=6)

    def test_no_intersection_parallel_ray(self):
        origins = np.array([[0.0, 0.0, 1.0]])
        directions = np.array([[1.0, 0.0, 0.0]])
        triangles = np.array([[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]])
        valid, distances = moller_trumbore_numpy(origins, directions, triangles)
        self.assertFalse(valid[0, 0])
        self.assertTrue(np.isinf(distances[0, 0]))

    def test_miss_triangle_outside_bounds(self):
        origins = np.array([[10.0, 10.0, -1.0]])
        directions = np.array([[0.0, 0.0, 1.0]])
        triangles = np.array([[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]])
        valid, distances = moller_trumbore_numpy(origins, directions, triangles)
        self.assertFalse(valid[0, 0])

    def test_multiple_rays_multiple_triangles(self):
        origins = np.array([
            [0.0, 0.0, -1.0],  # Will intersect
            [5.0, 5.0, -1.0]  # Will miss
        ])
        directions = np.array([
            [0.0, 0.0, 1.0],  # +z direction
            [0.0, 0.0, 1.0]  # +z direction
        ])
        triangles = np.array([
            [[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]],  # Triangle 1
            [[2.0, 2.0, 0.0], [1.0, 2.0, 0.0], [1.5, 1.0, 0.0]]  # Triangle 2
        ])
        valid, distances = moller_trumbore_numpy(origins, directions, triangles)
        self.assertEqual(valid.shape, (2, 2))
        self.assertEqual(distances.shape, (2, 2))
        self.assertTrue(valid[0, 0])
        self.assertAlmostEqual(distances[0, 0], 1.0, places=6)
        self.assertFalse(valid[1, 0])

    def test_edge_cases_on_triangle_boundary(self):
        origins = np.array([[-0.5, 0.5, -1.0]])
        directions = np.array([[0.0, 0.0, 1.0]])
        triangles = np.array([[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]])
        valid, distances = moller_trumbore_numpy(origins, directions, triangles)
        self.assertEqual(valid.shape, (1, 1))
        self.assertEqual(distances.shape, (1, 1))
        self.assertFalse(np.isnan(distances[0, 0]))