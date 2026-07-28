import unittest


class TestCalculateFinalPrice(unittest.TestCase):

    def test_calculate_price_with_discount_with_valid_inputs(self):
        result = calculate_price_with_discount('200', '10')
        self.assertEqual(result, 180.0)

    def test_discount_is_zero(self):
        result = calculate_price_with_discount('150', '0')
        self.assertEqual(result, 150.0)

    def test_discount_is_hundred(self):
        result = calculate_price_with_discount('100', '100')
        self.assertEqual(result, 0.0)

    def test_decimal_values_are_rounded_to_two_places(self):
        result = calculate_price_with_discount('99.99', '15.5')
        self.assertEqual(result, 84.49)

    def test_invalid_price_or_discount_raises(self):
        with self.assertRaises(ValueError):
            calculate_price_with_discount('abc', '10')
        with self.assertRaises(ValueError):
            calculate_price_with_discount('50', '101')
