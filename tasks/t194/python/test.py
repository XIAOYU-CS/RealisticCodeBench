import unittest


class TestCalculateDiscount(unittest.TestCase):

    def test_discount_25_percent(self):
        self.assertEqual(calculate_discount_percentage(100, 75), 25.00)

    def test_discount_0_percent(self):
        self.assertEqual(calculate_discount_percentage(50, 50), 0.00)

    def test_discount_100_percent(self):
        self.assertEqual(calculate_discount_percentage(100, 0), 100.00)

    def test_discount_50_percent(self):
        self.assertEqual(calculate_discount_percentage(200, 100), 50.00)

    def test_rounding_overpayment_and_invalid_prices(self):
        self.assertEqual(calculate_discount_percentage(3, 2), 33.33)
        self.assertEqual(calculate_discount_percentage(100, 120), -20.00)
        with self.assertRaises(ValueError):
            calculate_discount_percentage(0, 1)
        with self.assertRaises(ValueError):
            calculate_discount_percentage(10, -1)
