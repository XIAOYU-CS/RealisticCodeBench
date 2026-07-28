import math
import unittest


class Tester(unittest.TestCase):

    def test_zero_spatial_difference(self):
        spatial_diff = 0.0
        sigma_space = 1.0  # arbitrary sigma value
        self.assertAlmostEqual(spatial_weight(spatial_diff, sigma_space), 1.0, delta=0.001)

    def test_positive_spatial_difference(self):
        spatial_diff = 2.0
        sigma_space = 2.0
        expected_weight = math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space))
        self.assertAlmostEqual(spatial_weight(spatial_diff, sigma_space), expected_weight, delta=0.001)

    def test_negative_spatial_difference(self):
        spatial_diff = -2.0
        sigma_space = 2.0
        expected_weight = math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space))
        self.assertAlmostEqual(spatial_weight(spatial_diff, sigma_space), expected_weight, delta=0.001)

    def test_small_sigma_space(self):
        spatial_diff = 1.0
        sigma_space = 0.1
        expected_weight = math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space))
        self.assertAlmostEqual(spatial_weight(spatial_diff, sigma_space), expected_weight, delta=0.001)

    def test_large_sigma_space(self):
        spatial_diff = 1.0
        sigma_space = 100.0
        expected_weight = math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space))
        self.assertAlmostEqual(spatial_weight(spatial_diff, sigma_space), expected_weight, delta=0.001)
