import unittest

def is_sorted(iterable):
    it = iter(iterable)
    try:
        prev = next(it)
    except StopIteration:
        return True
    for current in it:
        if prev > current:
            return False
        prev = current
    return True


class Tester(unittest.TestCase):

    def test_already_sorted_array(self):
        arr = [1, 2, 3, 4, 5]
        shell_sort(arr)
        self.assertTrue(is_sorted(arr))

    def test_reverse_sorted_array(self):
        arr = [5, 4, 3, 2, 1]
        shell_sort(arr)
        self.assertTrue(is_sorted(arr))

    def test_array_with_duplicate_elements(self):
        arr = [4, 2, 2, 4, 1]
        shell_sort(arr)
        self.assertTrue(is_sorted(arr))

    def test_array_with_negative_numbers(self):
        arr = [-3, -1, -4, -2, 0]
        shell_sort(arr)
        self.assertTrue(is_sorted(arr))

    def test_empty_array(self):
        arr = []
        shell_sort(arr)
        self.assertTrue(is_sorted(arr))
