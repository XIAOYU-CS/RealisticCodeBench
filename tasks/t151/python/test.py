import unittest


class TestConvertTimeFunction(unittest.TestCase):

    def test_full_iso_duration(self):
        self.assertEqual(convert_iso8601_duration_to_readable('PT1H23M45.678S'), '1h23m45s678ms')

    def test_duration_with_seconds_and_milliseconds(self):
        self.assertEqual(convert_iso8601_duration_to_readable('PT45.5S'), '45s500ms')

    def test_duration_with_hours_and_minutes_no_seconds(self):
        self.assertEqual(convert_iso8601_duration_to_readable('PT2H5M'), '2h5m')

    def test_duration_with_only_seconds_no_milliseconds(self):
        self.assertEqual(convert_iso8601_duration_to_readable('PT20S'), '20s')

    def test_invalid_duration_without_pt_prefix(self):
        self.assertEqual(convert_iso8601_duration_to_readable('1H23M45S'), '')
