import unittest

class TestPointInPolygon(unittest.TestCase):
    def setUp(self):
        self.square = [(0, 0), (0, 10), (10, 10), (10, 0)]
        self.triangle = [(0, 0), (5, 10), (10, 0)]
        self.concave = [(0, 0), (5, 5), (10, 0), (5, 10), (0, 10)]

    def test_point_inside_square(self):
        self.assertTrue(is_point_in_polygon((5, 5), self.square))

    def test_point_outside_square(self):
        self.assertFalse(is_point_in_polygon((15, 5), self.square))

    def test_point_on_edge_of_triangle(self):
        self.assertFalse(is_point_in_polygon((5, 0), self.triangle))

    def test_point_inside_concave_polygon(self):
        self.assertTrue(is_point_in_polygon((5, 9), self.concave))

    def test_point_outside_concave_polygon(self):
        self.assertFalse(is_point_in_polygon((5, 1), self.concave))