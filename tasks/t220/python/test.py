import unittest


class TestGenerateCombinations(unittest.TestCase):

    def test_single_key_multiple_values(self):
        map_data = {'a': [1, 2, 3]}
        expected = [[1], [2], [3]]
        self.assertEqual(map_values_to_combinations(map_data), expected)

    def test_multiple_keys_single_values(self):
        map_data = {'a': [1], 'b': [2]}
        expected = [[1, 2]]
        self.assertEqual(map_values_to_combinations(map_data), expected)

    def test_multiple_keys_multiple_values(self):
        map_data = {'a': [1, 2], 'b': [3, 4]}
        expected = [
            [1, 3], [1, 4],
            [2, 3], [2, 4]
        ]
        self.assertEqual(map_values_to_combinations(map_data), expected)

    def test_empty_map(self):
        map_data = {}
        expected = [[]]
        self.assertEqual(map_values_to_combinations(map_data), expected)

    def test_empty_array_values(self):
        map_data = {'a': [], 'b': [1, 2]}
        expected = []
        self.assertEqual(map_values_to_combinations(map_data), expected)
