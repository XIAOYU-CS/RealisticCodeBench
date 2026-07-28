import unittest


class TestCompressFilename(unittest.TestCase):
    def test_return_filename_unchanged_if_under_max_length(self):
        self.assertEqual(truncate_filename_with_ellipsis('file.txt', 10), 'file.txt')

    def test_truncate_and_append_if_exceeds_max_length(self):
        self.assertEqual(truncate_filename_with_ellipsis('verylongfilename.txt', 10), 'verylongfi***.txt')

    def test_preserve_file_extension_after_compression(self):
        self.assertEqual(truncate_filename_with_ellipsis('document.pdf', 5), 'docum***.pdf')

    def test_leave_basename_unchanged_when_matches_max_length(self):
        self.assertEqual(truncate_filename_with_ellipsis('report.csv', 6), 'report.csv')

    def test_truncate_and_append_if_filename_exceeds(self):
        self.assertEqual(truncate_filename_with_ellipsis('short.mp3', 2), 'sh***.mp3')
