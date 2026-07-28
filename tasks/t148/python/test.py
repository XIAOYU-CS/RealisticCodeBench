import unittest
import math


class TestRemoveElements(unittest.TestCase):

    def test_remove_first_occurrence(self):
        array = [1, 2, 3, 2, 4]
        result = remove_elements(array, 2)
        self.assertEqual(result, [1, 3, 2, 4])
        self.assertIsNot(result, array)

    def test_remove_all_occurrences(self):
        array = [1, 2, 3, 2, 2, 4]
        result = remove_elements(array, 2, {'mode': 'all'})
        self.assertEqual(result, [1, 3, 4])

    def test_remove_limited_occurrences(self):
        array = [1, 2, 2, 2, 3]
        result = remove_elements(array, 2, {'mode': 'limit', 'limit': 2})
        self.assertEqual(result, [1, 2, 3])

    def test_loose_equality_comparison(self):
        array = ['1', 2, '2', 3]
        result = remove_elements(array, 2, {'use_strict': False})
        self.assertEqual(result, ['1', '2', 3])


    def test_edge_cases(self):
        self.assertEqual(remove_elements([], 1), [])
        array = [1, 2, 3]
        result = remove_elements(array, 4)
        self.assertEqual(result, [1, 2, 3])
        self.assertIsNot(result, array)

    def test_error_handling(self):
        with self.assertRaises(Exception):
            remove_elements('not a list', 1)
        with self.assertRaises(Exception):
            remove_elements([1, 2, 3], 1, {'mode': 'invalid'})
        with self.assertRaises(Exception):
            remove_elements([1, 2, 3], 1, {'mode': 'limit', 'limit': -1})
        with self.assertRaises(Exception):
            remove_elements([1, 2, 3], 1, {'mode': 'limit', 'limit': 1.5})

    def test_strict_vs_loose_comparison(self):
        array = ['2', 2, '2', 3]
        result_strict = remove_elements(array, 2, {'use_strict': True})
        self.assertEqual(result_strict, ['2', '2', 3])
        result_loose = remove_elements(array, 2, {'use_strict': False})

    def test_limit_mode_edge_cases(self):
        array = [1, 2, 3, 2]
        result = remove_elements(array, 2, {'mode': 'limit', 'limit': 5})
        self.assertEqual(result, [1, 3])

        result_default = remove_elements(array, 2, {'mode': 'limit', 'limit': 1})
        result_first = remove_elements(array, 2)
        self.assertEqual(result_default, result_first)
