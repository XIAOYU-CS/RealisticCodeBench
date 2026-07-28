import unittest
import numpy as np

class TestMollerTrumbore(unittest.TestCase):

    def test_single_ray_single_triangle_intersect(self):
        ray_origins = np.array([[0, 0, 0]])
        ray_directions = np.array([[0, 0, 1]])
        triangles = np.array([[[0, 0, 2], [1, 0, 2], [0, 1, 2]]])
        valid, t = moller_trumbore_numpy(ray_origins, ray_directions, triangles)
        self.assertTrue(valid[0, 0])
        self.assertAlmostEqual(t[0, 0], 2.0)

    def test_no_intersection_parallel_ray(self):
        ray_origins = np.array([[0, 0, 0]])
        ray_directions = np.array([[1, 0, 0]])
        triangles = np.array([[[0, 0, 2], [1, 0, 2], [0, 1, 2]]])
        valid, t = moller_trumbore_numpy(ray_origins, ray_directions, triangles)
        self.assertFalse(valid[0, 0])

    def test_multiple_rays_multiple_triangles(self):
        ray_origins = np.array([[0, 0, 0], [0, 0, 0]])
        ray_directions = np.array([[0, 0, 1], [0, 0, 1]])
        triangles = np.array([
            [[0, 0, 2], [1, 0, 2], [0, 1, 2]],
            [[0, 0, 4], [1, 0, 4], [0, 1, 4]]
        ])
        valid, t = moller_trumbore_numpy(ray_origins, ray_directions, triangles)

        self.assertTrue(valid[0, 0])
        self.assertTrue(valid[0, 1])
        self.assertTrue(valid[1, 0])
        self.assertTrue(valid[1, 1])

        self.assertAlmostEqual(t[0, 0], 2.0, places=5)
        self.assertAlmostEqual(t[0, 1], 4.0, places=5)
        self.assertAlmostEqual(t[1, 0], 2.0, places=5)
        self.assertAlmostEqual(t[1, 1], 4.0, places=5)

    def test_ray_missing_triangle(self):
        ray_origins = np.array([[0, 0, 0]])
        ray_directions = np.array([[0, 0, 1]])
        triangles = np.array([[[10, 10, 2], [11, 10, 2], [10, 11, 2]]])
        valid, t = moller_trumbore_numpy(ray_origins, ray_directions, triangles)
        self.assertFalse(valid[0, 0])

    def test_degenerate_triangle(self):
        ray_origins = np.array([[0, 0, 0]])
        ray_directions = np.array([[0, 0, 1]])
        triangles = np.array([[[0, 0, 2], [0, 0, 2], [0, 1, 2]]])
        valid, t = moller_trumbore_numpy(ray_origins, ray_directions, triangles)
        self.assertFalse(valid[0, 0])