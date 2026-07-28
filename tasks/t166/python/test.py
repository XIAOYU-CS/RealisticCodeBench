import unittest


class TestAdjustArrayLength(unittest.TestCase):

    def test_array_length_equal_to_target_length(self):
        result = fit_array_to_length(5, [1, 2, 3, 4, 5])
        self.assertEqual(result, [1, 2, 3, 4, 5])

    def test_array_length_shorter_than_target_length(self):
        result = fit_array_to_length(8, [1, 2, 3])
        self.assertEqual(result, [1, 2, 3, 1, 2, 3, 1, 2])

    def test_array_length_shorter_than_target_length_multiple(self):
        result = fit_array_to_length(6, [10, 20])
        self.assertEqual(result, [10, 20, 10, 20, 10, 20])

    def test_array_length_shorter_than_target_length_not_multiple(self):
        result = fit_array_to_length(7, [7, 14, 21])
        self.assertEqual(result, [7, 14, 21, 7, 14, 21, 7])

    def test_array_length_longer_than_target_length(self):
        result = fit_array_to_length(3, [1, 2, 3, 4, 5])
        self.assertEqual(result, [1, 2, 3])

    def test_empty_array_cannot_repeat_to_positive_target_length(self):
        with self.assertRaises(Exception):
            fit_array_to_length(2, [])
