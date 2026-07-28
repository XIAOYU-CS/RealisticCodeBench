import unittest
import numpy as np

class TestTrilinearInterp(unittest.TestCase):

    def setUp(self):
        self.voxel_min = (0, 0, 0)
        self.voxel_max = (2, 2, 2)
        self.voxel_values = [0, 2, 2, 4, 2, 4, 4, 6]

    def test_single_point_interpolation(self):
        point = (1, 1, 1)
        result = trilinear_interp(point, self.voxel_min, self.voxel_max, self.voxel_values)

        expected = 3.0
        self.assertAlmostEqual(result, expected, places=6)

        self.assertIsInstance(result, np.float32)

    def test_batch_points_interpolation(self):
        batch_points = [
            (0, 0, 0),
            (2, 2, 2),
            (1, 1, 1),
            (0, 1, 0.5)
        ]

        result = trilinear_interp(batch_points, self.voxel_min, self.voxel_max, self.voxel_values)

        self.assertIsInstance(result, np.ndarray)
        self.assertEqual(result.shape, (4,))

        self.assertAlmostEqual(result[0], 0.0, places=6)
        self.assertAlmostEqual(result[1], 6.0, places=6)
        self.assertAlmostEqual(result[2], 3.0, places=6)

    def test_clip_boundary_mode(self):
        out_of_bounds_point = (3, 1, 1)
        result = trilinear_interp(
            out_of_bounds_point,
            self.voxel_min,
            self.voxel_max,
            self.voxel_values,
            bounds_mode="clip"
        )

        clipped_point = (2, 1, 1)
        expected_result = trilinear_interp(clipped_point, self.voxel_min, self.voxel_max, self.voxel_values)
        self.assertAlmostEqual(result, expected_result, places=6)

    def test_fill_boundary_mode(self):
        out_of_bounds_point = (-1, 1, 1) 
        result = trilinear_interp(
            out_of_bounds_point,
            self.voxel_min,
            self.voxel_max,
            self.voxel_values,
            bounds_mode="fill",
            fill_value=-1.0
        )

        self.assertAlmostEqual(result, -1.0, places=6)

        batch_points = [(1, 1, 1), (5, 1, 1), (0.5, 0.5, 0.5)]
        result_batch = trilinear_interp(
            batch_points,
            self.voxel_min,
            self.voxel_max,
            self.voxel_values,
            bounds_mode="fill",
            fill_value=-999.0
        )

        self.assertAlmostEqual(result_batch[1], -999.0, places=6)

    def test_error_boundary_mode(self):
        out_of_bounds_point = (3, 1, 1)

        with self.assertRaises(ValueError):
            trilinear_interp(
                out_of_bounds_point,
                self.voxel_min,
                self.voxel_max,
                self.voxel_values,
                bounds_mode="error"
            )
