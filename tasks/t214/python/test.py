import unittest
from datetime import datetime, timedelta

class TestGetTimestamp(unittest.TestCase):

    def test_one_second_ago(self):
        one_second_ago = datetime.now() - timedelta(seconds=1)
        self.assertEqual(calculate_time_ago(one_second_ago), '1 second ago')

    def test_five_minutes_ago(self):
        five_minutes_ago = datetime.now() - timedelta(minutes=5)
        self.assertEqual(calculate_time_ago(five_minutes_ago), '5 minutes ago')

    def test_two_hours_ago(self):
        two_hours_ago = datetime.now() - timedelta(hours=2)
        self.assertEqual(calculate_time_ago(two_hours_ago), '2 hours ago')

    def test_three_days_ago(self):
        three_days_ago = datetime.now() - timedelta(days=3)
        self.assertEqual(calculate_time_ago(three_days_ago), '3 days ago')

    def test_one_week_ago(self):
        one_week_ago = datetime.now() - timedelta(days=7)
        self.assertEqual(calculate_time_ago(one_week_ago), '1 week ago')
