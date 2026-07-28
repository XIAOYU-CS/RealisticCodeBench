import unittest
import random


class TestGenerateRandomSubsets(unittest.TestCase):

    def test_basic_integer_range(self):
        result = generate_random_subsets(1, 10, 3, 2, step=1)
        self.assertEqual(len(result), 2)
        for subset in result:
            self.assertEqual(len(subset), 3)
            for item in subset:
                self.assertTrue(1 <= item < 10)

    def test_with_custom_data_source(self):
        data = ['a', 'b', 'c', 'd', 'e', 'f']
        result = generate_random_subsets(0, 1, 2, 3, data_source=data)
        self.assertEqual(len(result), 3)
        for subset in result:
            self.assertEqual(len(subset), 2)
            for item in subset:
                self.assertIn(item, data)

    def test_no_duplicates_mode(self):
        result = generate_random_subsets(1, 5, 2, 3, allow_duplicates=False)
        self.assertEqual(len(result), 3)
        subset_sets = [set(subset) for subset in result]
        self.assertEqual(len(subset_sets), len(set(frozenset(s) for s in subset_sets)))

    def test_shuffle_mode(self):
        random.seed(42)
        result1 = generate_random_subsets(1, 10, 4, 1, shuffle=True)
        random.seed(42)
        result2 = generate_random_subsets(1, 10, 4, 1, shuffle=False)

        self.assertEqual(len(result1), 1)
        self.assertEqual(len(result2), 1)
        self.assertEqual(len(result1[0]), 4)
        self.assertEqual(len(result2[0]), 4)

    def test_exact_fit_range_returns_only_possible_subset(self):
        result = generate_random_subsets(2, 5, 3, 4)

        self.assertEqual(result, [[2, 3, 4]] * 4)
