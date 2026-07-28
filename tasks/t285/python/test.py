import math
import unittest


class Tester(unittest.TestCase):

    def test_zero_intensity_difference(self):
        intensity_diff = 0.0
        sigma_color = 1.0  # arbitrary sigma value
        self.assertAlmostEqual(gaussian_weight(intensity_diff, sigma_color), 1.0, delta=0.001)

    def test_positive_intensity_difference(self):
        intensity_diff = 2.0
        sigma_color = 2.0
        expected_weight = math.exp(-(intensity_diff ** 2) / (2 * sigma_color ** 2))
        self.assertAlmostEqual(gaussian_weight(intensity_diff, sigma_color), expected_weight, delta=0.001)

    def test_negative_intensity_difference(self):
        intensity_diff = -2.0
        sigma_color = 2.0
        expected_weight = math.exp(-(intensity_diff ** 2) / (2 * sigma_color ** 2))
        self.assertAlmostEqual(gaussian_weight(intensity_diff, sigma_color), expected_weight, delta=0.001)

    def test_small_sigma_color(self):
        intensity_diff = 1.0
        sigma_color = 0.1
        expected_weight = math.exp(-(intensity_diff ** 2) / (2 * sigma_color ** 2))
        self.assertAlmostEqual(gaussian_weight(intensity_diff, sigma_color), expected_weight, delta=0.001)

    def test_large_sigma_color(self):
        intensity_diff = 1.0
        sigma_color = 100.0
        expected_weight = math.exp(-(intensity_diff ** 2) / (2 * sigma_color ** 2))
        self.assertAlmostEqual(gaussian_weight(intensity_diff, sigma_color), expected_weight, delta=0.001)
