import unittest

class TestConvertTimeHMSToUnit(unittest.TestCase):

    def test_basic_hms_conversion_to_ms(self):
        result = convert_time_hms_to_unit("1h30m45s", "ms")
        expected = (1 * 3600 + 30 * 60 + 45) * 1000
        self.assertEqual(result, expected)

    def test_decimal_time_values(self):
        result = convert_time_hms_to_unit("1.5h30.5m", "s")
        expected = 1.5 * 3600 + 30.5 * 60
        self.assertAlmostEqual(result, expected, places=10)

    def test_single_component_conversion(self):
        result1 = convert_time_hms_to_unit("45.5s", "ms")
        expected1 = round(45.5 * 1000)
        self.assertEqual(result1, expected1)

        result2 = convert_time_hms_to_unit("30m", "s")
        expected2 = 30 * 60
        self.assertEqual(result2, expected2)

        result3 = convert_time_hms_to_unit("2.5h", "m")
        expected3 = 2.5 * 60
        self.assertEqual(result3, expected3)

    def test_partial_components_conversion(self):
        result1 = convert_time_hms_to_unit("1h30s", "s")
        expected1 = 1 * 3600 + 30
        self.assertEqual(result1, expected1)

        result2 = convert_time_hms_to_unit("45m15.5s", "ms")
        expected2 = round((45 * 60 + 15.5) * 1000)
        self.assertEqual(result2, expected2)

    def test_default_unit_conversion(self):
        result = convert_time_hms_to_unit("1m30s")
        expected = (1 * 60 + 30) * 1000
        self.assertEqual(result, expected)

    def test_invalid_time_format_raises_error(self):
        with self.assertRaises(ValueError) as context:
            convert_time_hms_to_unit("invalid_format")
        # Test format with invalid characters
        with self.assertRaises(ValueError) as context:
            convert_time_hms_to_unit("1h30x")
    def test_unsupported_unit_raises_error(self):
        with self.assertRaises(ValueError) as context:
            convert_time_hms_to_unit("1h30m", "weeks")

    def test_rounding_behavior_for_milliseconds(self):
        result1 = convert_time_hms_to_unit("1.2345s", "ms")
        expected1 = round(1.2345 * 1000)
        self.assertEqual(result1, expected1)

        # Test rounding down
        result2 = convert_time_hms_to_unit("2.1234s", "ms")
        expected2 = round(2.1234 * 1000)
        self.assertEqual(result2, expected2)