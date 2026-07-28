import unittest


class TestGetFileIdFromUrl(unittest.TestCase):
    def test_valid_url_with_fileId(self):
        url = 'https://example.com/download?fileId=12345'
        self.assertEqual(parse_file_id_from_url(url), '12345')

    def test_missing_fileId_parameter(self):
        url = 'https://example.com/download'
        self.assertIsNone(parse_file_id_from_url(url))

    def test_empty_fileId_parameter(self):
        url = 'https://example.com/download?fileId='
        self.assertIsNone(parse_file_id_from_url(url))

    def test_malformed_url(self):
        url = 'https://example.com/download?fileId=12345&otherParam'
        self.assertEqual(parse_file_id_from_url(url), '12345')

    def test_invalid_url(self):
        self.assertIsNone(parse_file_id_from_url('not-a-url'))
