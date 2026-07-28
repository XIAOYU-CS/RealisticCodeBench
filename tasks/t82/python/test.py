import unittest

class TestCalculateTotalSeconds(unittest.TestCase):

    def test_complete_time(self):
        time = [1, 2, 3, 4]
        expected = 93784
        result = calculate_total_seconds(time)
        self.assertEqual(result, expected)

    def test_partial_time(self):
        time = [0, 2, 3]
        expected = 7380
        result = calculate_total_seconds(time)
        self.assertEqual(result, expected)

    def test_single_value_is_days(self):
        time = [7200]
        expected = 622080000
        result = calculate_total_seconds(time)
        self.assertEqual(result, expected)

    def test_seconds_position(self):
        time = [0, 0, 0, 7200]
        expected = 7200
        result = calculate_total_seconds(time)
        self.assertEqual(result, expected)

    def test_no_time(self):
        time = []
        expected = 0
        result = calculate_total_seconds(time)
        self.assertEqual(result, expected)
