import unittest
class TestReadOnlyListProxy(unittest.TestCase):

    def setUp(self):
        self.test_data = [1, 2, 3, 4, 5]
        self.proxy = ReadOnlyListProxy(self.test_data)

    def test_initialization_with_list(self):
        proxy = ReadOnlyListProxy([1, 2, 3])
        self.assertEqual(len(proxy), 3)
        self.assertEqual(proxy[0], 1)

    def test_initialization_with_tuple(self):
        proxy = ReadOnlyListProxy((1, 2, 3, 4))
        self.assertEqual(len(proxy), 4)
        self.assertEqual(proxy[1], 2)

    def test_getitem_with_index(self):
        self.assertEqual(self.proxy[0], 1)
        self.assertEqual(self.proxy[2], 3)
        self.assertEqual(self.proxy[-1], 5)

    def test_getitem_with_slice(self):
        self.assertEqual(self.proxy[1:3], [2, 3])
        self.assertEqual(self.proxy[:2], [1, 2])
        self.assertEqual(self.proxy[::2], [1, 3, 5])

    def test_len(self):
        self.assertEqual(len(self.proxy), 5)
        empty_proxy = ReadOnlyListProxy([])
        self.assertEqual(len(empty_proxy), 0)

    def test_contains(self):
        self.assertTrue(3 in self.proxy)
        self.assertFalse(6 in self.proxy)

    def test_iter(self):
        result = list(iter(self.proxy))
        self.assertEqual(result, [1, 2, 3, 4, 5])

    def test_reversed(self):
        result = list(reversed(self.proxy))
        self.assertEqual(result, [5, 4, 3, 2, 1])

    def test_index_and_count(self):
        self.assertEqual(self.proxy.index(3), 2)
        self.assertEqual(self.proxy.index(1, 0, 3), 0)

        proxy_with_duplicates = ReadOnlyListProxy([1, 2, 2, 3, 2])
        self.assertEqual(proxy_with_duplicates.count(2), 3)
        self.assertEqual(proxy_with_duplicates.count(4), 0)

    def test_repr(self):
        expected = "ReadOnlyListProxy([1, 2, 3, 4, 5])"
        self.assertEqual(repr(self.proxy), expected)

        empty_proxy = ReadOnlyListProxy([])
        self.assertEqual(repr(empty_proxy), "ReadOnlyListProxy([])")