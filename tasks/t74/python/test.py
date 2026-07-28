import unittest


class TestBitsToBytes(unittest.TestCase):

    def test_exact_multiple_of_eight(self):
        bits = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1]
        expected = bytearray([0b10110010, 0b01001111])
        result = bits_to_bytes(bits)
        self.assertEqual(result, expected)

    def test_incomplete_byte_discarded(self):
        bits = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1]
        expected = bytearray([0b10110010])
        result = bits_to_bytes(bits)
        self.assertEqual(result, expected)

    def test_empty_bit_array(self):
        bits = []
        expected = bytearray()
        result = bits_to_bytes(bits)
        self.assertEqual(result, expected)

    def test_single_full_byte(self):
        bits = [1, 1, 1, 1, 1, 1, 1, 1]
        expected = bytearray([0xFF])
        result = bits_to_bytes(bits)
        self.assertEqual(result, expected)

    def test_no_bits_discarded(self):
        bits = [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1]
        expected = bytearray([0xCC, 0x77])
        result = bits_to_bytes(bits)
        self.assertEqual(result, expected)