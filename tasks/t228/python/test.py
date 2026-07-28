import unittest


class TestConvertToRoman(unittest.TestCase):
    def test_typical_number(self):
        result = convert_arabic_to_roman(1987)
        self.assertEqual(result, 'MCMLXXXVII')
    def test_minimum_value(self):
        result = convert_arabic_to_roman(1)
        self.assertEqual(result, 'I')

    def test_large_number(self):
        result = convert_arabic_to_roman(3999)
        self.assertEqual(result, 'MMMCMXCIX')

    def test_different_numeral_repeats(self):
        result = convert_arabic_to_roman(1666)
        self.assertEqual(result, 'MDCLXVI')

    def test_no_fives_and_ones(self):
        result = convert_arabic_to_roman(2000)
        self.assertEqual(result, 'MM')
