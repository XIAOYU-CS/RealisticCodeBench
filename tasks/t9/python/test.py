import unittest


class TestHaversineDistance(unittest.TestCase):

    def test_same_point(self):
        lat, lon = 52.2296756, 21.0122287
        result = haversine_distance(lat, lon, lat, lon)
        self.assertAlmostEqual(result, 0.0, places=6)

    def test_small_distance(self):
        lat1, lon1 = 52.2296756, 21.0122287
        lat2, lon2 = 52.2296756, 21.0122297
        result = haversine_distance(lat1, lon1, lat2, lon2)
        self.assertAlmostEqual(result, 0.0001, places=4)

    def test_large_distance(self):
        lat1, lon1 = 52.2296756, 21.0122287
        lat2, lon2 = 41.8919300, 12.5113300
        result = haversine_distance(lat1, lon1, lat2, lon2)
        self.assertAlmostEqual(result, 1315.514, places=2)

    def test_equator_distance(self):
        lat1, lon1 = 0.0, 0.0
        lat2, lon2 = 0.0, 90.0
        result = haversine_distance(lat1, lon1, lat2, lon2)
        self.assertAlmostEqual(result, 10007.54, places=2)

    def test_pole_to_pole(self):
        lat1, lon1 = 90.0, 0.0
        lat2, lon2 = -90.0, 0.0
        result = haversine_distance(lat1, lon1, lat2, lon2)
        self.assertAlmostEqual(result, 20015.09, places=2)
