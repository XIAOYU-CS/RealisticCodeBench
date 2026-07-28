import unittest


class TestRGBtoHSV(unittest.TestCase):

    def test_rgb_to_hsv_red(self):
        r, g, b = 255, 0, 0
        expected_result = (0, 100, 100)
        result = rgb_to_hsv(r, g, b)
        self.assertEqual(result, expected_result)

    def test_rgb_to_hsv_green(self):
        r, g, b = 0, 255, 0
        expected_result = (120, 100, 100)
        result = rgb_to_hsv(r, g, b)
        self.assertEqual(result, expected_result)

    def test_rgb_to_hsv_blue(self):
        r, g, b = 0, 0, 255
        expected_result = (240, 100, 100)
        result = rgb_to_hsv(r, g, b)
        self.assertEqual(result, expected_result)

    def test_rgb_to_hsv_white(self):
        r, g, b = 255, 255, 255
        expected_result = (0, 0, 100)
        result = rgb_to_hsv(r, g, b)
        self.assertEqual(result, expected_result)

    def test_rgb_to_hsv_black(self):
        r, g, b = 0, 0, 0
        expected_result = (0, 0, 0)
        result = rgb_to_hsv(r, g, b)
        self.assertEqual(result, expected_result)