import unittest
import numpy as np


class TestInterpPerRow(unittest.TestCase):

    def test_linear_interpolation_basic(self):
        grid_row = np.array([1, 3, 5, 7, 9], dtype=float)
        y_initial = np.array([0, 1, 2, 3, 4], dtype=float)
        y_sought = np.array([0.5, 1.5, 2.5, 3.5], dtype=float)
        interp_row = np.empty(4, dtype=float)
        interp_per_row_with_different_methods(grid_row, y_initial, y_sought, interp_row, method='linear')
        expected = np.array([2, 4, 6, 8], dtype=float)
        np.testing.assert_array_almost_equal(interp_row, expected, decimal=10)

    def test_nearest_neighbor_interpolation(self):
        grid_row = np.array([10, 20, 30, 40, 50], dtype=float)
        y_initial = np.array([0, 1, 2, 3, 4], dtype=float)
        y_sought = np.array([0.3, 1.7, 2.4, 3.9], dtype=float)
        interp_row = np.empty(4, dtype=float)
        interp_per_row_with_different_methods(grid_row, y_initial, y_sought, interp_row, method='nearest')
        expected = np.array([10, 30, 30, 50], dtype=float)
        np.testing.assert_array_equal(interp_row, expected)

    def test_cubic_interpolation(self):
        y_initial = np.array([0, 1, 2, 3, 4], dtype=float)
        grid_row = np.array([0, 1, 8, 27, 64], dtype=float)
        y_sought = np.array([0.5, 1.5, 2.5, 3.5], dtype=float)
        interp_row = np.empty(4, dtype=float)
        interp_per_row_with_different_methods(grid_row, y_initial, y_sought, interp_row, method='cubic')
        expected_approx = np.array([0.125, 3.375, 15.625, 42.875], dtype=float)
        self.assertEqual(len(interp_row), 4)
        self.assertTrue(np.all(np.isfinite(interp_row)))

    def test_quadratic_interpolation(self):
        y_initial = np.array([0, 1, 2, 3, 4], dtype=float)
        grid_row = np.array([0, 1, 4, 9, 16], dtype=float)
        y_sought = np.array([0.5, 1.5, 2.5], dtype=float)
        interp_row = np.empty(3, dtype=float)
        interp_per_row_with_different_methods(grid_row, y_initial, y_sought, interp_row, method='quadratic')
        self.assertEqual(len(interp_row), 3)
        self.assertTrue(np.all(np.isfinite(interp_row)))

    def test_invalid_method_raises_error(self):
        grid_row = np.array([1, 2, 3], dtype=float)
        y_initial = np.array([0, 1, 2], dtype=float)
        y_sought = np.array([0.5, 1.5], dtype=float)
        interp_row = np.empty(2, dtype=float)
        with self.assertRaises(Exception) as context:
            interp_per_row_with_different_methods(grid_row, y_initial, y_sought, interp_row, method='invalid_method')

    def test_shape_mismatch_raises_error(self):
        grid_row = np.array([1, 2, 3], dtype=float)
        y_initial = np.array([0, 1], dtype=float)
        y_sought = np.array([0.5, 1.5], dtype=float)
        interp_row = np.empty(2, dtype=float)

        with self.assertRaises(Exception) as context:
            interp_per_row_with_different_methods(grid_row, y_initial, y_sought, interp_row)

        self.assertIn("grid_row and y_initial must have the same length", str(context.exception))

    def test_extrapolation_behavior(self):
        grid_row = np.array([1, 2, 3, 4], dtype=float)
        y_initial = np.array([0, 1, 2, 3], dtype=float)
        y_sought = np.array([-1, 4], dtype=float)
        interp_row = np.empty(2, dtype=float)
        interp_per_row_with_different_methods(grid_row, y_initial, y_sought, interp_row, method='linear')
        self.assertEqual(len(interp_row), 2)
        self.assertTrue(np.all(np.isfinite(interp_row)))