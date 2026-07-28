import unittest
class TestConvertToColorThroughYellow(unittest.TestCase):
    
    def test_red(self):
        self.assertEqual(convert_range_to_color_yellow_green_change(0.0), (255, 127.5, 127.5))

    def test_yellow(self):
        self.assertEqual(convert_range_to_color_yellow_green_change(0.5), (255, 255, 127.5))

    def test_green(self):
        self.assertEqual(convert_range_to_color_yellow_green_change(1.0), (0, 255, 127.5))

    def test_mid_transition(self):
        self.assertEqual(convert_range_to_color_yellow_green_change(0.25), (255, 191, 127.5))

    def test_yellow_transition(self):
        self.assertEqual(convert_range_to_color_yellow_green_change(0.75), (127, 255, 127.5))