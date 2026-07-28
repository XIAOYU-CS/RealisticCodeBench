import unittest


class TestFloatToRGB(unittest.TestCase):

    def test_pure_red(self):
        result = float_to_rgb(0.0)
        self.assertEqual(result, (255, 0, 0))

    def test_pure_green(self):
        result = float_to_rgb(1.0)
        self.assertEqual(result, (0, 255, 0))

    def test_midpoint(self):
        result = float_to_rgb(0.5)
        self.assertEqual(result, (127, 127, 0))

    def test_quarter_point(self):
        result = float_to_rgb(0.25)
        self.assertEqual(result, (191, 63, 0))

    def test_invalid_value(self):
        with self.assertRaises(ValueError):
            float_to_rgb(1.5)