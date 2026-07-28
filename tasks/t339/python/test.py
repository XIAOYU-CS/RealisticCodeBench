import unittest
import tempfile
import os

class TestGetFotoFiles(unittest.TestCase):
    def setUp(self):
        self.test_dir = tempfile.TemporaryDirectory()
        self.base_dir = self.test_dir.name

        self.subdir = os.path.join(self.base_dir, "subdir")
        os.makedirs(self.subdir)

        self.jpg_file = os.path.join(self.base_dir, "test.jpg")
        self.png_file = os.path.join(self.subdir, "image.PNG")
        self.txt_file = os.path.join(self.base_dir, "notes.txt")
        self.webp_file = os.path.join(self.subdir, "photo.webp")

        with open(self.jpg_file, 'w') as f:
            f.write("JPG content")
        with open(self.png_file, 'w') as f:
            f.write("PNG content")
        with open(self.txt_file, 'w') as f:
            f.write("Text content")
        with open(self.webp_file, 'w') as f:
            f.write("WebP content")

    def tearDown(self):
        self.test_dir.cleanup()

    def test_default_extensions(self):
        results = get_foto_files(directory=self.base_dir)
        self.assertEqual(len(results), 1)
        self.assertIn(os.path.abspath(self.jpg_file), results)

    def test_custom_extensions(self):
        results = get_foto_files(
            directory=self.base_dir,
            allowed_extensions=['.png', '.webp']
        )
        self.assertEqual(len(results), 2)
        self.assertIn(os.path.abspath(self.png_file), results)
        self.assertIn(os.path.abspath(self.webp_file), results)

    def test_case_insensitive(self):
        results = get_foto_files(
            directory=self.base_dir,
            allowed_extensions=['.png']
        )
        self.assertEqual(len(results), 1)
        self.assertIn(os.path.abspath(self.png_file), results)

    def test_nonexistent_directory(self):
        with self.assertRaises(Exception):
            get_foto_files(directory="/this/directory/should/not/exist")

    def test_non_directory_path(self):
        with self.assertRaises(Exception):
            get_foto_files(directory=self.jpg_file)