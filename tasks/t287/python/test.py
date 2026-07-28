import unittest


class Tester(unittest.TestCase):

    def test_sorted_array(self):
        arr1 = [1, 2, 3, 4, 5]
        bubble_sort(arr1)
        self.assertEqual(arr1, [1, 2, 3, 4, 5])

    def test_reverse_sorted_array(self):
        arr2 = [5, 4, 3, 2, 1]
        bubble_sort(arr2)
        self.assertEqual(arr2, [1, 2, 3, 4, 5])

    def test_array_with_duplicates(self):
        arr3 = [3, 1, 2, 3, 2]
        bubble_sort(arr3)
        self.assertEqual(arr3, [1, 2, 2, 3, 3])

    def test_single_element_array(self):
        arr4 = [1]
        bubble_sort(arr4)
        self.assertEqual(arr4, [1])

    def test_empty_array(self):
        arr5 = []
        bubble_sort(arr5)
        self.assertEqual(arr5, [])
