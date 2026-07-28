import math
import unittest


class TestDegreesToRadians(unittest.TestCase):
    def test_zero_degrees(self):
        self.assertAlmostEqual(degrees_to_radians(0), 0, places=5)

    def test_ninety_degrees(self):
        self.assertAlmostEqual(degrees_to_radians(90), math.pi / 2, places=5)

    def test_one_eighty_degrees(self):
        self.assertAlmostEqual(degrees_to_radians(180), math.pi, places=5)

    def test_two_seventy_degrees(self):
        self.assertAlmostEqual(degrees_to_radians(270), 3 * math.pi / 2, places=5)

    def test_three_sixty_degrees(self):
        self.assertAlmostEqual(degrees_to_radians(360), 2 * math.pi, places=5)

    def test_negative_degrees(self):
        self.assertAlmostEqual(degrees_to_radians(-90), -math.pi / 2, places=5)

    def test_large_degrees(self):
        self.assertAlmostEqual(degrees_to_radians(720), 4 * math.pi, places=5)
