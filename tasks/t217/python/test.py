import unittest


class TestGetFileExtension(unittest.TestCase):

    def test_standard_file_extension(self):
        self.assertEqual(extract_file_extension('example.txt'), 'txt')

    def test_no_extension(self):
        self.assertEqual(extract_file_extension('example'), '')

    def test_multiple_dots(self):
        self.assertEqual(extract_file_extension('example.with.many.dots.jpg'), 'jpg')

    def test_filenames_ending_with_dot(self):
        self.assertEqual(extract_file_extension('example.'), '')

    def test_case_sensitivity(self):
        self.assertEqual(extract_file_extension('example.JPG'), 'JPG')
