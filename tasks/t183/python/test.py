import unittest


class TestBackgroundBrightness(unittest.TestCase):
    def test_dark_background(self):
        background_color = 'rgb(30, 30, 30)'
        result = determine_background_light_level(background_color)
        self.assertEqual(result, 'dark')

    def test_bright_background(self):
        background_color = 'rgb(250, 250, 250)'
        result = determine_background_light_level(background_color)
        self.assertEqual(result, 'bright')

    def test_normal_background(self):
        background_color = 'rgb(150, 150, 150)'
        result = determine_background_light_level(background_color)
        self.assertEqual(result, 'normal')

    def test_high_red_component(self):
        background_color = 'rgb(255, 100, 100)'
        result = determine_background_light_level(background_color)
        self.assertEqual(result, 'normal')

    def test_low_green_and_blue(self):
        background_color = 'rgb(10, 10, 100)'
        result = determine_background_light_level(background_color)
        self.assertEqual(result, 'dark')
