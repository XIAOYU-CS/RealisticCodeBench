import unittest


class TestParseRankRange(unittest.TestCase):

    def test_parses_single_numbers(self):
        self.assertEqual(parse_rank_range("1, 2, 3"), [1, 2, 3])

    def test_parses_range_with_double_hyphen(self):
        self.assertEqual(parse_rank_range("1--3"), [1, 2, 3])

    def test_parses_range_with_single_hyphen(self):
        self.assertEqual(parse_rank_range("5-3", 1), [5, 4, 3])

    def test_uses_step_correctly(self):
        self.assertEqual(parse_rank_range("1--10", 3), [1, 4, 7, 10])

    def test_handles_descending_range(self):
        self.assertEqual(parse_rank_range("3--1"), [3, 2, 1])

    def test_ignores_invalid_entries(self):
        self.assertEqual(parse_rank_range("1, invalid, 3--5"), [1, 3, 4, 5])

    def test_returns_empty_array_for_invalid_input(self):
        self.assertEqual(parse_rank_range(123), [])
        self.assertEqual(parse_rank_range("1--2", 0), [])