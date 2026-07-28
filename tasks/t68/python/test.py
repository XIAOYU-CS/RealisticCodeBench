import unittest


class TestClassifyFilesByExtension(unittest.TestCase):

    def test_multiple_file_types(self):
        files = [
            "document.docx",
            "photo.jpeg",
            "report.pdf",
            "image.png",
            "archive.zip"
        ]
        expected_result = {
            'docx': ['document.docx'],
            'jpeg': ['photo.jpeg'],
            'pdf': ['report.pdf'],
            'png': ['image.png'],
            'zip': ['archive.zip']
        }
        self.assertEqual(classify_files_by_extension(files), expected_result)

    def test_empty_list(self):
        files = []
        expected_result = {}
        self.assertEqual(classify_files_by_extension(files), expected_result)

    def test_files_without_extension_and_uppercase_extensions(self):
        files = [
            "README",
            "archive.TAR.GZ",
            "photo.JPG",
            "Makefile"
        ]
        expected_result = {
            'gz': ['archive.TAR.GZ'],
            'jpg': ['photo.JPG']
        }
        self.assertEqual(classify_files_by_extension(files), expected_result)

    def test_files_with_same_extension(self):
        files = [
            "file1.txt",
            "file2.txt",
            "file3.txt",
        ]
        expected_result = {
            'txt': [
                "file1.txt",
                "file2.txt",
                "file3.txt",
            ]
        }
        self.assertEqual(classify_files_by_extension(files), expected_result)

    def test_files_with_multiple_dots(self):
        files = [
            "my.document.docx",
            "report.final.pdf",
            "photo.album.jpeg",
            "archive.backup.zip"
        ]
        expected_result = {
            'docx': ['my.document.docx'],
            'pdf': ['report.final.pdf'],
            'jpeg': ['photo.album.jpeg'],
            'zip': ['archive.backup.zip']
        }
        self.assertEqual(classify_files_by_extension(files), expected_result)
