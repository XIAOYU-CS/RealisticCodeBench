import unittest

class TestFormatTimestampToString(unittest.TestCase):
    def test_basic_functionality(self):
        timestamp = 1655364000.0
        # Assuming the local timezone is UTC
        expected_date_str = 'Thu Jun 16 03:20:00 PM +0800 2022'
        self.assertEqual(unix_timestamp_to_formatted_local_datetime(timestamp), expected_date_str, "Should correctly format the timestamp")

    def test_default_format(self):
        timestamp = 1655364000.0
        expected_date_str = 'Thu Jun 16 03:20:00 PM +0800 2022'
        self.assertEqual(unix_timestamp_to_formatted_local_datetime(timestamp), expected_date_str, "Default format should match the expected date string")

    def test_custom_format(self):
        timestamp = 1655364000.0
        custom_format = '%Y-%m-%d %H:%M:%S'
        expected_date_str = '2022-06-16 15:20:00'
        self.assertEqual(unix_timestamp_to_formatted_local_datetime(timestamp, custom_format), expected_date_str, "Should correctly format the timestamp using the custom format")


    def test_edge_case_boundary_value(self):
        timestamp = 0.0
        expected_date_str = 'Thu Jan 01 08:00:00 AM +0800 1970'
        self.assertEqual(unix_timestamp_to_formatted_local_datetime(timestamp), expected_date_str, "Should correctly format the Unix epoch start time")

    def test_negative_timestamp_raises(self):
        with self.assertRaises(ValueError):
            unix_timestamp_to_formatted_local_datetime(-1.0)
