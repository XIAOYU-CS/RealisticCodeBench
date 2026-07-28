import unittest


class TestRgbToHsl(unittest.TestCase):

    def test_converts_pure_red_to_hsl(self):
        self.assertEqual(convert_rgb_to_hsl(255, 0, 0), {'h': 0, 's': 100, 'l': 50})

    def test_converts_black_to_hsl(self):
        self.assertEqual(convert_rgb_to_hsl(0, 0, 0), {'h': 0, 's': 0, 'l': 0})

    def test_converts_white_to_hsl(self):
        self.assertEqual(convert_rgb_to_hsl(255, 255, 255), {'h': 0, 's': 0, 'l': 100})

    def test_converts_a_color_on_edge_of_rgb_range(self):
        self.assertEqual(convert_rgb_to_hsl(0, 255, 255), {'h': 180, 's': 100, 'l': 50})

    def test_converts_mixed_blue_dominant_color_to_hsl(self):
        self.assertEqual(convert_rgb_to_hsl(70, 130, 180), {'h': 207, 's': 44, 'l': 49})
