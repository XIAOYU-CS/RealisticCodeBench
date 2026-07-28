import unittest
from datetime import timedelta


class TestGenTimeoutTimedelta(unittest.TestCase):
    def test_single_unit_days(self):
        self.assertEqual(parse_duration_string_to_timedelta("5d"), timedelta(days=5))


    def test_single_unit_hours(self):
        self.assertEqual(parse_duration_string_to_timedelta("8h"), timedelta(hours=8))

    def test_single_unit_minutes(self):
        self.assertEqual(parse_duration_string_to_timedelta("45m"), timedelta(minutes=45))

    def test_single_unit_seconds(self):
        self.assertEqual(parse_duration_string_to_timedelta("30s"), timedelta(seconds=30))

    def test_complex_mix(self):
        self.assertEqual(parse_duration_string_to_timedelta("2d 20h 30m"), timedelta(days=2, hours=20, minutes=30))

    def test_no_units(self):
        self.assertEqual(parse_duration_string_to_timedelta(""), timedelta(0))