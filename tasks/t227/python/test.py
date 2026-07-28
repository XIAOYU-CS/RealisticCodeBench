import unittest
from datetime import datetime

_REAL_DATETIME = datetime


class FixedDateTime(datetime):
    @classmethod
    def now(cls):
        return cls(2024, 8, 25, 12, 0, 0)


class TestFormatDate(unittest.TestCase):

    def setUp(self):
        globals()["datetime"] = FixedDateTime

    def tearDown(self):
        globals()["datetime"] = _REAL_DATETIME

    def test_one_day_ago(self):
        date_string = '2024-08-24T12:00:00' 
        result = date_string_to_relative_time(date_string)
        self.assertIn(result, ['1 day ago', '24 hours ago'])

    def test_five_hours_ago(self):
        date_string = '2024-08-25T07:00:00'
        result = date_string_to_relative_time(date_string)
        self.assertEqual(result, '5 hours ago')

    def test_two_minutes_ago(self):
        date_string = '2024-08-25T11:58:00'
        result = date_string_to_relative_time(date_string)
        self.assertEqual(result, '2 minutes ago')

    def test_just_now(self):
        date_string = '2024-08-25T11:59:59'
        result = date_string_to_relative_time(date_string)
        self.assertIn(result, ['1 second ago', '1 seconds ago'])

    def test_exact_current_time(self):
        date_string = '2024-08-25T12:00:00'
        result = date_string_to_relative_time(date_string)
        self.assertEqual(result, '0 seconds ago')

    def test_invalid_date_string(self):
        with self.assertRaises(ValueError) as context:
            date_string_to_relative_time('not-a-date')
        self.assertEqual(str(context.exception), 'Invalid Date')
