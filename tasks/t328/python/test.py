import unittest
import numpy as np

class TestNearestNonzero(unittest.TestCase):

    def test_basic_functionality_with_default_mask(self):
        some_arr = np.array([[1, 2, 3],
                             [4, 5, 6],
                             [7, 8, 9]], dtype=float)

        rms = np.array([[1, 0, 3],
                        [0, 5, 6],
                        [7, 8, 9]], dtype=float)

        expected = np.array([[1, 1, 3],
                             [1, 5, 6],
                             [7, 8, 9]], dtype=float)

        result = replace_by_nearest(some_arr, rms)
        np.testing.assert_array_equal(result, expected)

    def test_custom_mask_function(self):
        some_arr = np.array([[10, 20, 30],
                             [40, 50, 60],
                             [70, 80, 90]], dtype=float)

        rms = np.array([[1, -1, 3],
                        [-1, 5, 6],
                        [7, 8, 9]], dtype=float)

        mask_func = lambda x: x < 0

        expected = np.array([[10, 10, 30],
                             [10, 50, 60],
                             [70, 80, 90]], dtype=float)

        result = replace_by_nearest(some_arr, rms, mask_func)
        np.testing.assert_array_equal(result, expected)

    def test_no_replacement_needed(self):
        some_arr = np.array([[1, 2, 3],
                             [4, 5, 6]], dtype=float)

        rms = np.array([[1, 2, 3],
                        [4, 5, 6]], dtype=float)

        result = replace_by_nearest(some_arr, rms)
        np.testing.assert_array_equal(result, some_arr)
        # Ensure it's a copy, not the same object
        self.assertIsNot(result, some_arr)

    def test_all_elements_masked(self):
        some_arr = np.array([[0, 0],
                             [0, 0]], dtype=float)

        rms = np.array([[0, 0],
                        [0, 0]], dtype=float)

        result = replace_by_nearest(some_arr, rms)
        np.testing.assert_array_equal(result, some_arr)
        self.assertIsNot(result, some_arr)

    def test_empty_array(self):
        some_arr = np.array([]).reshape(0, 0)
        rms = np.array([]).reshape(0, 0)

        result = replace_by_nearest(some_arr, rms)
        np.testing.assert_array_equal(result, some_arr)
        self.assertEqual(result.shape, (0, 0))
