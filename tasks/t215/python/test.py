import unittest


class TestFormatNumber(unittest.TestCase):
    def test_format_greater_than_equal_to_million(self):
        self.assertEqual(shorten_large_number(1500000), '1.5M')
        self.assertEqual(shorten_large_number(1000000), '1.0M')

    def test_format_greater_than_equal_to_thousand(self):
        self.assertEqual(shorten_large_number(2500), '2.5K')
        self.assertEqual(shorten_large_number(1000), '1.0K')

    def test_return_string_if_less_than_thousand(self):
        self.assertEqual(shorten_large_number(999), '999')
        self.assertEqual(shorten_large_number(500), '500')

    def test_handle_edge_cases(self):
        self.assertEqual(shorten_large_number(1000), '1.0K')
        self.assertEqual(shorten_large_number(1000000), '1.0M')

    def test_preserves_sign_and_decimals_below_thousand_while_rounding_upper_k(self):
        self.assertEqual(shorten_large_number(-42), '-42')
        self.assertEqual(shorten_large_number(999.5), '999.5')
        self.assertEqual(shorten_large_number(999999), '1000.0K')
