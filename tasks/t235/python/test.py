import unittest
from datetime import datetime


class TestIsSameDay(unittest.TestCase):

    def test_different_days(self):
        timestamp1 = int(datetime(2024, 10, 1, 10, 0, 0).timestamp())
        timestamp2 = int(datetime(2024, 10, 2, 10, 0, 0).timestamp())
        self.assertFalse(are_timestamps_on_same_day(timestamp1, timestamp2))

    def test_same_day_different_times(self):
        timestamp1 = int(datetime(2024, 10, 1, 0, 0, 0).timestamp())
        timestamp2 = int(datetime(2024, 10, 1, 12, 30, 0).timestamp())
        self.assertTrue(are_timestamps_on_same_day(timestamp1, timestamp2))

    def test_same_day_different_time_zones(self):
        timestamp1 = int(datetime(2024, 10, 1, 10, 0, 0).timestamp())
        timestamp2 = int(datetime.fromisoformat('2024-10-01T12:00:00+02:00').timestamp())
        self.assertTrue(are_timestamps_on_same_day(timestamp1, timestamp2))

    def test_midnight_same_day(self):
        timestamp1 = int(datetime(2024, 10, 1, 0, 0, 0).timestamp())
        timestamp2 = int(datetime(2024, 10, 1, 0, 0, 0).timestamp())
        self.assertTrue(are_timestamps_on_same_day(timestamp1, timestamp2))

    def test_different_years(self):
        timestamp1 = int(datetime(2023, 10, 1, 10, 0, 0).timestamp())
        timestamp2 = int(datetime(2024, 10, 1, 10, 0, 0).timestamp())
        self.assertFalse(are_timestamps_on_same_day(timestamp1, timestamp2))
