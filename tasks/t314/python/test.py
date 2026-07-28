import unittest


class TestCRC8Passing(unittest.TestCase):
    def setUp(self):
        self.default_test_cases = [
            (b"", crc8(b"")),
            (b"a", crc8(b"a")),
            (b"ab", crc8(b"ab")),
            (b"abc", crc8(b"abc")),
            (b"123456789", crc8(b"123456789")),
            (b"\x00", crc8(b"\x00")),
            (b"\xFF", crc8(b"\xFF")),
        ]

        self.custom_poly = 0x31
        self.custom_init = 0x00
        self.custom_data = b"custom test"
        self.custom_crc = crc8(self.custom_data, self.custom_poly, self.custom_init)

        self.special_data = bytes([0x00, 0x01, 0x7F, 0x80, 0xFF])
        self.special_crc = crc8(self.special_data)

        self.verify_data = b"verification test"
        self.verify_crc = crc8(self.verify_data)

    def test_default_parameters_basic(self):
        for data, expected in self.default_test_cases:
            with self.subTest(data=data):
                result = crc8(data)
                self.assertEqual(
                    result, expected,
                    f"Data under default parameters {data!r} Calculation error: Expected 0x{expected:02X}, Actual 0x{result:02X}"
                )

    def test_custom_poly_init(self):
        result = crc8(self.custom_data, self.custom_poly, self.custom_init)
        self.assertEqual(
            result, self.custom_crc,
            f"Custom parameter calculation error: expected 0x{self.custom_crc:02X}, Actual 0x{result:02X}"
        )

        poly = 0x07
        init = 0x55
        data = b"another custom"
        expected = crc8(data, poly, init)
        self.assertEqual(crc8(data, poly, init), expected)

    def test_special_byte_values(self):
        result = crc8(self.special_data)
        self.assertEqual(
            result, self.special_crc,
            f"Special byte calculation error: Expected 0x{self.special_crc:02X}, Actual 0x{result:02X}"
        )

        all_zero = bytes([0x00] * 10)
        expected_zero = crc8(all_zero)
        self.assertEqual(crc8(all_zero), expected_zero)

        all_ones = bytes([0xFF] * 5)
        expected_ones = crc8(all_ones)
        self.assertEqual(crc8(all_ones), expected_ones)

    def test_known_crc_vectors(self):
        self.assertEqual(crc8(b"123456789"), 0x24)
        self.assertEqual(crc8(bytes([0x00, 0x01, 0x7F, 0x80, 0xFF])), 0x18)

    def test_verify_crc8_custom_parameters(self):
        self.assertTrue(verify_crc8(b"verification test", 0xEF, 0x31, 0x00))
        self.assertFalse(verify_crc8(b"verification test", 0xEE, 0x31, 0x00))
        with self.assertRaises(ValueError):
            verify_crc8(b"verification test", 0x100)


if __name__ == "__main__":
    unittest.main()
