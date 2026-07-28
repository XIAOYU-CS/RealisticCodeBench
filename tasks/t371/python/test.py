import unittest
import os
import tempfile
import shutil

class TestCopyFile(unittest.TestCase):

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()

        self.source_file = os.path.join(self.temp_dir, "source.txt")
        self.dest_file = os.path.join(self.temp_dir, "dest.txt")
        self.source_content = "Hello, World! This is a test file for copying."

        with open(self.source_file, "w") as f:
            f.write(self.source_content)

    def tearDown(self):
        if os.path.exists(self.temp_dir):
            shutil.rmtree(self.temp_dir)

    def test_copy_file_success_without_overwrite(self):
        success, message = copy_file(self.source_file, self.dest_file)

        self.assertTrue(success)
        self.assertEqual(message, "[file copied successfully]")
        self.assertTrue(os.path.exists(self.dest_file))

        with open(self.dest_file, "r") as f:
            copied_content = f.read()
        self.assertEqual(copied_content, self.source_content)

        self.assertEqual(os.path.getsize(self.source_file), os.path.getsize(self.dest_file))

    def test_copy_file_with_overwrite(self):
        with open(self.dest_file, "w") as f:
            f.write("Original content")

        success, message = copy_file(self.source_file, self.dest_file, overwrite=True)

        self.assertTrue(success)
        self.assertEqual(message, "[file copied successfully]")
        self.assertTrue(os.path.exists(self.dest_file))

        with open(self.dest_file, "r") as f:
            copied_content = f.read()
        self.assertEqual(copied_content, self.source_content)

    def test_copy_file_destination_exists_no_overwrite(self):
        with open(self.dest_file, "w") as f:
            f.write("Existing content")

        success, message = copy_file(self.source_file, self.dest_file, overwrite=False)

        self.assertFalse(success)
        self.assertEqual(message, "[destination exists, not overwritten]")

        with open(self.dest_file, "r") as f:
            dest_content = f.read()

    def test_copy_file_invalid_source_path(self):
        invalid_source = "/non/existent/source/file.txt"
        success, message = copy_file(invalid_source, self.dest_file)

        self.assertFalse(success)

    def test_copy_file_invalid_arguments(self):
        success, message = copy_file("", self.dest_file)
        self.assertFalse(success)

        success, message = copy_file(self.source_file, "")
        self.assertFalse(success)

        success, message = copy_file(None, self.dest_file)
        self.assertFalse(success)
