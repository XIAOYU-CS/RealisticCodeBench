import unittest

import numpy as np


class TestGetMidsFromEdges(unittest.TestCase):

    def test_basic_case(self):
        edges = np.array([1, 2, 3, 4])
        expected_mids = np.array([1.5, 2.5, 3.5])
        np.testing.assert_array_equal(calculate_midpoints_from_edges(edges), expected_mids)

    def test_single_interval(self):
        edges = np.array([5, 10])
        expected_mids = np.array([7.5])
        np.testing.assert_array_equal(calculate_midpoints_from_edges(edges), expected_mids)

    def test_multiple_intervals(self):
        edges = np.array([0, 1, 2, 3, 4, 5])
        expected_mids = np.array([0.5, 1.5, 2.5, 3.5, 4.5])
        np.testing.assert_array_equal(calculate_midpoints_from_edges(edges), expected_mids)

    def test_negative_edges(self):
        edges = np.array([-5, -3, -1, 1])
        expected_mids = np.array([-4.0, -2.0, 0.0])
        np.testing.assert_array_equal(calculate_midpoints_from_edges(edges), expected_mids)

    def test_zero_edges(self):
        edges = np.array([0, 1, 2])
        expected_mids = np.array([0.5, 1.5])
        np.testing.assert_array_equal(calculate_midpoints_from_edges(edges), expected_mids)

    def test_float_edges(self):
        edges = np.array([0.0, 1.5, 3.0])
        expected_mids = np.array([0.75, 2.25])
        np.testing.assert_array_equal(calculate_midpoints_from_edges(edges), expected_mids)

    def test_empty_array(self):
        edges = np.array([])
        expected_mids = np.array([])
        np.testing.assert_array_equal(calculate_midpoints_from_edges(edges), expected_mids)