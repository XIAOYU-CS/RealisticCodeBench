import unittest


class TestCalculateRedProportion(unittest.TestCase):

    def test_all_red_pixels(self):
        pixels = [(255, 0, 0), (255, 0, 0), (255, 0, 0)]
        result = calculate_red_proportion(pixels)
        self.assertAlmostEqual(result, 1.0)

    def test_no_red_pixels(self):
        pixels = [(0, 255, 0), (0, 0, 255), (0, 255, 255)]
        result = calculate_red_proportion(pixels)
        self.assertAlmostEqual(result, 0.0)

    def test_empty_pixel_list(self):
        pixels = []
        result = calculate_red_proportion(pixels)
        self.assertAlmostEqual(result, 0.0)

    def test_all_black_pixels(self):
        pixels = [(0, 0, 0), (0, 0, 0), (0, 0, 0)]
        result = calculate_red_proportion(pixels)
        self.assertAlmostEqual(result, 0.0)

    def test_mixed_pixels(self):
        pixels = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 255)]
        result = calculate_red_proportion(pixels)
        self.assertAlmostEqual(result, 1 / 3)
