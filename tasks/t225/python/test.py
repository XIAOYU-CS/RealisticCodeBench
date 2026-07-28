import unittest


class TestNextGreatestLetter(unittest.TestCase):

    def test_target_greater_than_all_letters(self):
        letters = ['c', 'f', 'j']
        target = 'j'
        result = find_smallest_letter_greater_than_target(letters, target)
        self.assertEqual(result, 'c')

    def test_typical_input(self):
        letters = ['c', 'f', 'j']
        target = 'a'
        result = find_smallest_letter_greater_than_target(letters, target)
        self.assertEqual(result, 'c')

    def test_edge_case_between_two_letters(self):
        letters = ['c', 'f', 'j']
        target = 'd'
        result = find_smallest_letter_greater_than_target(letters, target)
        self.assertEqual(result, 'f')

    def test_target_equal_to_largest_letter(self):
        letters = ['a', 'b', 'c', 'd']
        target = 'd'
        result = find_smallest_letter_greater_than_target(letters, target)
        self.assertEqual(result, 'a')

    def test_single_letter_array(self):
        letters = ['a']
        target = 'z'
        result = find_smallest_letter_greater_than_target(letters, target)
        self.assertEqual(result, 'a')