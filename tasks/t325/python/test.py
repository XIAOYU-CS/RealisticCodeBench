import unittest


class TestBlake2bWithSalt(unittest.TestCase):

    def test_basic_hash_string_input(self):
        result = blake2b_hash_with_salt("hello world")
        self.assertIsInstance(result, str)
        self.assertGreater(len(result), 0)
        result2 = blake2b_hash_with_salt ("hello world")
        self.assertEqual(result, result2)

    def test_hash_with_salt(self):
        data = "test data"
        result1 = blake2b_hash_with_salt(data, salt="salt1")
        result2 = blake2b_hash_with_salt(data, salt="salt2")
        result3 = blake2b_hash_with_salt(data)  # no salt
        self.assertNotEqual(result1, result2)
        self.assertNotEqual(result1, result3)
        self.assertNotEqual(result2, result3)

    def test_bytes_input(self):
        data = b"binary data"
        salt = b"binary salt"
        result = blake2b_hash_with_salt(data, salt=salt)
        self.assertIsInstance(result, str)
        result2 = blake2b_hash_with_salt(data, salt=salt)
        self.assertEqual(result, result2)

    def test_different_digest_sizes(self):
        data = "test string"
        result_8 = blake2b_hash_with_salt(data, digest_size=8)
        result_16 = blake2b_hash_with_salt(data, digest_size=16)
        result_32 = blake2b_hash_with_salt(data, digest_size=32)
        self.assertIsInstance(result_8, str)
        self.assertIsInstance(result_16, str)
        self.assertIsInstance(result_32, str)
        self.assertLess(len(result_8), len(result_16))
        self.assertLess(len(result_16), len(result_32))

    def test_url_safe_encoding(self):
        data = "test for url safety"
        result = blake2b_hash_with_salt(data)
        self.assertNotIn('=', result)
        import re
        self.assertTrue(re.match(r'^[A-Za-z0-9_-]+$', result))
        # Should not contain standard Base64 padding
        self.assertFalse(result.endswith('='))