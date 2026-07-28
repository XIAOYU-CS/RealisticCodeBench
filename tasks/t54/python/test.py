import unittest

import numpy as np


class Testcompute_im2col_for_image(unittest.TestCase):

    def test_single_channel_no_padding_stride_1(self):
        image = np.array([
            [[1, 2, 3, 4],
             [5, 6, 7, 8],
             [9, 10, 11, 12],
             [13, 14, 15, 16]]
        ])  # Shape (1, 4, 4)
        filter_height = 2
        filter_width = 2
        stride = 1
        padding = 0

        expected_output = np.array([
            [1, 2, 3, 5, 6, 7, 9, 10, 11],
            [2, 3, 4, 6, 7, 8, 10, 11, 12],
            [5, 6, 7, 9, 10, 11, 13, 14, 15],
            [6, 7, 8, 10, 11, 12, 14, 15, 16]
        ])
        output = compute_im2col_for_image(image, filter_height, filter_width, stride, padding)
        np.testing.assert_array_equal(output, expected_output)

    def test_single_channel_no_padding_stride_2(self):
        image = np.array([
            [[1, 2, 3, 4],
             [5, 6, 7, 8],
             [9, 10, 11, 12],
             [13, 14, 15, 16]]
        ])
        filter_height = 2
        filter_width = 2
        stride = 2
        padding = 0

        expected_output = np.array([
            [1, 3, 9, 11],
            [2, 4, 10, 12],
            [5, 7, 13, 15],
            [6, 8, 14, 16]
        ])
        output = compute_im2col_for_image(image, filter_height, filter_width, stride, padding)
        np.testing.assert_array_equal(output, expected_output)

    def test_multi_channel_no_padding_stride_1(self):
        image = np.array([
            [[1, 2, 3],
             [4, 5, 6],
             [7, 8, 9]],
            [[9, 8, 7],
             [6, 5, 4],
             [3, 2, 1]]
        ])
        filter_height = 2
        filter_width = 2
        stride = 1
        padding = 0

        expected_output = np.array([
            [1, 2, 4, 5],
            [2, 3, 5, 6],
            [4, 5, 7, 8],
            [5, 6, 8, 9],
            [9, 8, 6, 5],
            [8, 7, 5, 4],
            [6, 5, 3, 2],
            [5, 4, 2, 1]
        ])
        output = compute_im2col_for_image(image, filter_height, filter_width, stride, padding)
        np.testing.assert_array_equal(output, expected_output)

    def test_single_channel_with_padding_stride_1(self):
        image = np.array([
            [[1, 2],
             [3, 4]]
        ])
        expected_output = np.array([
            [0, 0, 0, 0, 1, 2, 0, 3, 4],
            [0, 0, 0, 1, 2, 0, 3, 4, 0],
            [0, 1, 2, 0, 3, 4, 0, 0, 0],
            [1, 2, 0, 3, 4, 0, 0, 0, 0]
        ])

        output = compute_im2col_for_image(image, 2, 2, stride=1, padding=1)
        np.testing.assert_array_equal(output, expected_output)

    def test_exact_fit_non_square_filter(self):
        image = np.array([
            [[1, 2, 3],
             [4, 5, 6]]
        ])
        expected_output = np.array([[1], [2], [3], [4], [5], [6]])

        output = compute_im2col_for_image(image, 2, 3, stride=1, padding=0)
        np.testing.assert_array_equal(output, expected_output)
