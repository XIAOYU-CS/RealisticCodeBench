import unittest


class TestRemoveFileExtension(unittest.TestCase):
    def test_remove_standard_file_extension(self):
        self.assertEqual(remove_file_extension('document.txt'), 'document')

    def test_return_original_filename_without_extension(self):
        self.assertEqual(remove_file_extension('document'), 'document')

    def test_handle_files_with_multiple_dots(self):
        self.assertEqual(remove_file_extension('my.file.with.many.extensions.pdf'), 'my.file.with.many.extensions')

    def test_return_original_filename_if_ends_with_dot(self):
        self.assertEqual(remove_file_extension('document.'), 'document')

    def test_handle_filenames_with_dots_in_directory_names(self):
        self.assertEqual(remove_file_extension('path.to/my.file.txt'), 'path.to/my.file')
