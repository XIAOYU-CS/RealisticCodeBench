import os
import shutil
import tempfile
import unittest


class TestEmptyDirectory(unittest.TestCase):
    def setUp(self):
        self.test_dir = tempfile.mkdtemp()
        os.mkdir(os.path.join(self.test_dir, 'subdir'))
        with open(os.path.join(self.test_dir, 'file1.txt'), 'w') as f:
            f.write("Hello")
        with open(os.path.join(self.test_dir, 'subdir', 'file2.txt'), 'w') as f:
            f.write("World")

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_empty_directory_success(self):
        empty_directory(self.test_dir)
        self.assertEqual(os.listdir(self.test_dir), [])



    def test_empty_directory_with_subdirectories(self):
        empty_directory(self.test_dir)
        self.assertFalse(os.listdir(self.test_dir))

    def test_empty_already_empty_directory(self):
        empty_directory(self.test_dir)
        empty_directory(self.test_dir)
        self.assertEqual(os.listdir(self.test_dir), [])

    def test_missing_directory_raises_value_error(self):
        with self.assertRaises(ValueError):
            empty_directory(os.path.join(self.test_dir, 'missing'))

    def test_file_path_raises_value_error(self):
        file_path = os.path.join(self.test_dir, 'file1.txt')
        with self.assertRaises(ValueError):
            empty_directory(file_path)
        self.assertTrue(os.path.exists(file_path))
