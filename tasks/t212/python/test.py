import hashlib
import unittest


class TestCompressHash(unittest.TestCase):

    def test_length_of_result(self):
        hash_bytes = hashlib.sha256(b'test').digest()
        result = compress_hash_to_alphanumeric(hash_bytes)
        self.assertEqual(len(result), 5)

    def test_different_inputs(self):
        hash1 = hashlib.sha256(b'test1').digest()
        hash2 = hashlib.sha256(b'test2').digest()
        result1 = compress_hash_to_alphanumeric(hash1)
        result2 = compress_hash_to_alphanumeric(hash2)
        self.assertNotEqual(result1, result2)

    def test_consistent_result_for_same_input(self):
        hash_bytes = hashlib.sha256(b'test').digest()
        result1 = compress_hash_to_alphanumeric(hash_bytes)
        result2 = compress_hash_to_alphanumeric(hash_bytes)
        self.assertEqual(result1, result2)

    def test_all_zeros(self):
        hash_bytes = bytes([0] * 32)  # 32 bytes of zeros
        result = compress_hash_to_alphanumeric(hash_bytes)
        self.assertRegex(result, r'^[0-9a-zA-Z]{5}$')

    def test_all_ones(self):
        hash_bytes = bytes([255] * 32)  # 32 bytes of 0xFF (255 in decimal)
        result = compress_hash_to_alphanumeric(hash_bytes)
        self.assertRegex(result, r'^[0-9a-zA-Z]{5}$')
