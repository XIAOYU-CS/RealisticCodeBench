import unittest


class TestAbbreviateNumber(unittest.TestCase):

    def test_less_than_1000(self):
        self.assertEqual(abbreviate_number_with_suffix(999), '999')

    def test_one_thousand(self):
        result = abbreviate_number_with_suffix(1000)
        self.assertIn(result, ['1k', '1.0k'])

    def test_one_thousand_five_hundred(self):
        self.assertEqual(abbreviate_number_with_suffix(1500), '1.5k')

    def test_one_million(self):
        result = abbreviate_number_with_suffix(1000000)
        self.assertIn(result, ['1M', '1.0M'])

    def test_twenty_five_million(self):
        self.assertEqual(abbreviate_number_with_suffix(25000000), '25M')

    def test_one_billion(self):
        result = abbreviate_number_with_suffix(1000000000)
        self.assertIn(result, ['1B', '1.0B'])

    def test_one_point_two_trillion(self):
        self.assertEqual(abbreviate_number_with_suffix(1234567890123), '1.2T')
