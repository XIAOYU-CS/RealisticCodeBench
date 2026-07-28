import unittest
import datetime


class TestFindNthWeekdayOfSpecificYear(unittest.TestCase):

    def test_regular_occurrence(self):
        # Test for the 2nd Monday of May 2023
        result = calculate_nth_weekday_in_month(2023, 5, 2, 0)
        expected = datetime.date(2023, 5, 8)
        self.assertEqual(result, expected)

    def test_last_occurrence(self):
        result = calculate_nth_weekday_in_month(2023, 5, 5, 0)
        expected = datetime.date(2023, 5, 29)
        self.assertEqual(result, expected)

    def test_first_day_is_weekday(self):
        result = calculate_nth_weekday_in_month(2023, 8, 1, 1)
        expected = datetime.date(2023, 8, 1)
        self.assertEqual(result, expected)

    def test_edge_year_transition(self):
        result = calculate_nth_weekday_in_month(2023, 12, 1, 4)
        expected = datetime.date(2023, 12, 1)
        self.assertEqual(result, expected)

    def test_missing_fifth_occurrence_returns_last_weekday(self):
        result = calculate_nth_weekday_in_month(2023, 2, 5, 0)
        expected = datetime.date(2023, 2, 27)
        self.assertEqual(result, expected)
