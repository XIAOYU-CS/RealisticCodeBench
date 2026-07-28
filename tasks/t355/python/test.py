import unittest
import base64


class TestArrayBufferToBase64(unittest.TestCase):

    def test_basic_conversion(self):
        test_data = b"Hello World"
        expected = base64.b64encode(test_data).decode('utf-8')
        result = arraybuffer_to_base64(test_data)
        self.assertEqual(result, expected)
        test_bytearray = bytearray(b"Hello World")
        result_bytearray = arraybuffer_to_base64(test_bytearray)
        self.assertEqual(result_bytearray, expected)

    def test_url_safe_conversion(self):
        test_data = b"Hello+World/123"
        standard_result = arraybuffer_to_base64(test_data, url_safe=False)
        expected_standard = base64.b64encode(test_data).decode('utf-8')
        self.assertEqual(standard_result, expected_standard)
        url_safe_result = arraybuffer_to_base64(test_data, url_safe=True)
        expected_url_safe = base64.urlsafe_b64encode(test_data).decode('utf-8')
        self.assertEqual(url_safe_result, expected_url_safe)
        self.assertNotIn('+', url_safe_result)
        self.assertNotIn('/', url_safe_result)

    def test_padding_control(self):
        test_data = b"Hello"
        result_with_padding = arraybuffer_to_base64(test_data, keep_padding=True)
        self.assertTrue(result_with_padding.endswith('='))
        result_without_padding = arraybuffer_to_base64(test_data, keep_padding=False)
        self.assertFalse(result_without_padding.endswith('='))
        core_with_padding = result_with_padding.rstrip('=')
        self.assertEqual(core_with_padding, result_without_padding)

    def test_empty_input(self):
        empty_data = b""
        result = arraybuffer_to_base64(empty_data)
        expected = ""  # Empty input should produce empty output
        self.assertEqual(result, expected)
        empty_bytearray = bytearray()
        result_bytearray = arraybuffer_to_base64(empty_bytearray)
        self.assertEqual(result_bytearray, expected)
        result_url_safe = arraybuffer_to_base64(empty_data, url_safe=True)
        self.assertEqual(result_url_safe, expected)

    def test_binary_data_and_exceptions(self):
        binary_data = bytes(range(256))
        result = arraybuffer_to_base64(binary_data)
        expected = base64.b64encode(binary_data).decode('utf-8')
        self.assertEqual(result, expected)
        mv = memoryview(binary_data)
        result_mv = arraybuffer_to_base64(mv)
        self.assertEqual(result_mv, expected)
        with self.assertRaises(Exception):
            arraybuffer_to_base64("not_bytes")
        list_data = [72, 101, 108, 108, 111]
        result_list = arraybuffer_to_base64(list_data)
        expected_list = base64.b64encode(bytes(list_data)).decode('utf-8')
        self.assertEqual(result_list, expected_list)