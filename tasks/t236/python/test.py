import unittest
from datetime import datetime, timedelta


class TestGetRelativeTime(unittest.TestCase):

    def test_should_return_today_for_a_message_created_today(self):
        message_date = datetime.now()
        self.assertEqual(get_relative_time(message_date), "Today")

    def test_should_return_yesterday_for_a_message_created_yesterday(self):
        message_date = datetime.now() - timedelta(days=1)
        self.assertEqual(get_relative_time(message_date), "Yesterday")

    def test_should_return_weekday_for_a_message_created_6_days_ago(self):
        message_date = datetime.now() - timedelta(days=6)
        self.assertEqual(get_relative_time(message_date), message_date.strftime("%A"))

    def test_should_return_formatted_date_string_for_a_message_created_exactly_7_days_ago(self):
        message_date = datetime.now() - timedelta(days=7)
        self.assertEqual(get_relative_time(message_date), message_date.strftime("%Y/%m/%d"))

    def test_should_return_formatted_date_string_for_a_message_created_10_days_ago(self):
        message_date = datetime.now() - timedelta(days=10)
        self.assertEqual(get_relative_time(message_date), message_date.strftime("%Y/%m/%d"))

    def test_should_return_formatted_date_string_for_a_message_created_15_days_ago(self):
        message_date = datetime.now() - timedelta(days=15)
        self.assertEqual(get_relative_time(message_date), message_date.strftime("%Y/%m/%d"))
