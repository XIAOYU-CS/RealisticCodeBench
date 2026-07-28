import unittest


class TestBytesToSize(unittest.TestCase):
    def test_convert_bytes_to_kb(self):
        self.assertEqual(convert_bytes_to_human_readable(1024), '1.00 KB')
        self.assertEqual(convert_bytes_to_human_readable(2048), '2.00 KB')

    def test_convert_bytes_to_mb(self):
        self.assertEqual(convert_bytes_to_human_readable(1048576), '1.00 MB')
        self.assertEqual(convert_bytes_to_human_readable(2097152), '2.00 MB')

    def test_convert_bytes_to_gb(self):
        self.assertEqual(convert_bytes_to_human_readable(1073741824), '1.00 GB')
        self.assertEqual(convert_bytes_to_human_readable(2147483648), '2.00 GB')

    def test_convert_bytes_to_tb(self):
        self.assertEqual(convert_bytes_to_human_readable(1099511627776), '1.00 TB')
        self.assertEqual(convert_bytes_to_human_readable(2199023255552), '2.00 TB')

    def test_convert_byte_scale_values(self):
        self.assertEqual(convert_bytes_to_human_readable(0), '0 Byte')
        self.assertEqual(convert_bytes_to_human_readable(1), '1.00 Bytes')
        self.assertEqual(convert_bytes_to_human_readable(1023), '1023.00 Bytes')
