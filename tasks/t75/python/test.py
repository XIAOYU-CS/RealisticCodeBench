import unittest


class TestExtractCharacterBits(unittest.TestCase):

    def test_case_1_valid_utf8(self):
        byte_array = b'Hello, World!'
        char = 'W'
        result = extract_character_bits(byte_array, char, 'utf-8')
        expected_result = (7, '01010111')
        self.assertEqual(result, expected_result)

    def test_case_2_non_existent_character(self):
        byte_array = b'This is a test.'
        char = 'z'
        result = extract_character_bits(byte_array, char, 'utf-8')
        self.assertIsNone(result)

    def test_case_3_invalid_encoding(self):
        byte_array = b'\xff\xfe'
        char = 'A'
        result = extract_character_bits(byte_array, char, 'ascii')
        self.assertIsNone(result)

    def test_case_4_valid_utf16(self):
        byte_array = 'Hello, World!'.encode('utf-16')
        char = '!'
        result = extract_character_bits(byte_array, char, 'utf-16')
        expected_result = (12, '00100001 00000000')
        self.assertEqual(result, expected_result)

    def test_case_5_special_characters_utf8(self):
        byte_array = 'Python 🐍 is fun!'.encode('utf-8')
        char = '🐍'
        result = extract_character_bits(byte_array, char, 'utf-8')
        expected_result = (7, '11110000 10011111 10010000 10001101')
        self.assertEqual(result, expected_result)
