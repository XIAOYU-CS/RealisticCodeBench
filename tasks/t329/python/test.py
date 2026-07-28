import unittest
import numpy as np

class TestMakeSubimages(unittest.TestCase):

    def test_basic_functionality_with_pad_mode(self):
        a_data = np.array([[1, 2, 3, 4],
                           [5, 6, 7, 8],
                           [9, 10, 11, 12],
                           [13, 14, 15, 16]], dtype=float)

        a_mask = np.array([[False, True, False, False],
                           [False, False, True, False],
                           [True, False, False, False],
                           [False, False, False, True]], dtype=bool)

        b, c = make_subimages(a_data, a_mask, 2, 2, edge_mode="pad")

        self.assertEqual(b.shape, (2, 2, 4))
        self.assertEqual(c.shape, (2, 2))
        self.assertIn(b[0, 0, 0], [1.0, 5.0])
        self.assertIn(b[0, 0, 1], [1.0, 5.0])

    def test_keep_mode_with_edge_subimages(self):
        a_data = np.array([[1, 2, 3],
                           [4, 5, 6],
                           [7, 8, 9]], dtype=float)

        a_mask = np.zeros((3, 3), dtype=bool)

        b, c = make_subimages(a_data, a_mask, 2, 2, edge_mode="keep")

        self.assertEqual(b.shape, (2, 2))
        self.assertEqual(c.shape, (2, 2))

        self.assertEqual(b.dtype, np.object_)

        expected_counts = np.array([[4, 2],
                                    [2, 1]])
        np.testing.assert_array_equal(c, expected_counts)

        self.assertEqual(len(b[0, 0]), 4)  # 2x2 = 4 elements
        self.assertEqual(len(b[0, 1]), 2)  # 2x1 = 2 elements
        self.assertEqual(len(b[1, 0]), 2)  # 1x2 = 2 elements
        self.assertEqual(len(b[1, 1]), 1)  # 1x1 = 1 element

        expected_b00 = np.array([1, 2, 4, 5])
        expected_b01 = np.array([3, 6])
        expected_b10 = np.array([7, 8])
        expected_b11 = np.array([9])

        np.testing.assert_array_equal(np.sort(b[0, 0]), np.sort(expected_b00))
        np.testing.assert_array_equal(np.sort(b[0, 1]), np.sort(expected_b01))
        np.testing.assert_array_equal(np.sort(b[1, 0]), np.sort(expected_b10))
        np.testing.assert_array_equal(np.sort(b[1, 1]), np.sort(expected_b11))

    def test_discard_mode_edge_subimages(self):
        a_data = np.array([[1, 2, 3, 4, 5],
                           [6, 7, 8, 9, 10],
                           [11, 12, 13, 14, 15],
                           [16, 17, 18, 19, 20],
                           [21, 22, 23, 24, 25]], dtype=float)

        a_mask = np.zeros((5, 5), dtype=bool)

        b, c = make_subimages(a_data, a_mask, 3, 3, edge_mode="discard")

        self.assertEqual(b.shape, (1, 1, 9))
        self.assertEqual(c.shape, (1, 1))
        expected_count = 9
        self.assertEqual(c[0, 0], expected_count)
        expected_values = np.array([1, 2, 3, 6, 7, 8, 11, 12, 13])
        np.testing.assert_array_equal(np.sort(b[0, 0, :9]), np.sort(expected_values))

    def test_all_masked_values(self):
        a_data = np.array([[1, 2],
                           [3, 4]], dtype=float)
        a_mask = np.ones((2, 2), dtype=bool)
        b, c = make_subimages(a_data, a_mask, 2, 2, edge_mode="pad")
        self.assertEqual(b.shape, (1, 1, 4))
        self.assertEqual(c.shape, (1, 1))
        self.assertEqual(c[0, 0], 0)
        self.assertTrue(np.all(np.isnan(b[0, 0, :4])))

    def test_no_masked_values(self):
        a_data = np.array([[1, 2, 3, 4],
                           [5, 6, 7, 8],
                           [9, 10, 11, 12],
                           [13, 14, 15, 16]], dtype=float)

        a_mask = np.zeros((4, 4), dtype=bool)

        b, c = make_subimages(a_data, a_mask, 2, 2, edge_mode="pad")

        self.assertEqual(b.shape, (2, 2, 4))
        self.assertEqual(c.shape, (2, 2))

        expected_counts = np.array([[4, 4],
                                    [4, 4]])
        np.testing.assert_array_equal(c, expected_counts)

        expected_b00 = np.array([1, 2, 5, 6])
        expected_b01 = np.array([3, 4, 7, 8])
        expected_b10 = np.array([9, 10, 13, 14])
        expected_b11 = np.array([11, 12, 15, 16])

        np.testing.assert_array_equal(b[0, 0, :4], expected_b00)
        np.testing.assert_array_equal(b[0, 1, :4], expected_b01)
        np.testing.assert_array_equal(b[1, 0, :4], expected_b10)
        np.testing.assert_array_equal(b[1, 1, :4], expected_b11)