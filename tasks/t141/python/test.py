import unittest
from unittest.mock import patch


class TestTimePassed(unittest.TestCase):

    @patch('time.time', return_value=1609459200)
    def test_time_passed_one_minute_ago(self, mock_time):
        start_time = 1609459140000
        self.assertEqual(time_passed(start_time), "1:00")

    @patch('time.time', return_value=1609459200)
    def test_time_passed_boundary_59_seconds(self, mock_time):
        start_time = 1609459194100
        self.assertEqual(time_passed(start_time), "0:05")

    @patch('time.time', return_value=1609459200)
    def test_time_passed_same_as_current_time(self, mock_time):
        self.assertEqual(time_passed(1609459200000), "0:00")

    @patch('time.time', return_value=1609459200)
    def test_time_passed_future_start_time(self, mock_time):
        start_time = 1609459260000
        result = time_passed(start_time)
        self.assertRegex(result, '-')

    @patch('time.time', return_value=1609459200)
    def test_time_passed_large_time_difference(self, mock_time):
        start_time = 1483228800000
        self.assertEqual(time_passed(start_time), "2103840:00")
