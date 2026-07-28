import unittest
import tempfile
import shutil
import os

class TestCommandLS(unittest.TestCase):

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()

        self.file1 = os.path.join(self.temp_dir, "aaa.txt")
        self.file2 = os.path.join(self.temp_dir, "zzz.txt")
        self.dir1 = os.path.join(self.temp_dir, "bbb_dir")

        with open(self.file1, "w") as f:
            f.write("A" * 100)  # 100 bytes
        with open(self.file2, "w") as f:
            f.write("B" * 50)  # 50 bytes
        os.makedirs(self.dir1)

    def tearDown(self):
        if os.path.exists(self.temp_dir):
            shutil.rmtree(self.temp_dir)

    def test_list_current_directory(self):
        success, result = command_ls()
        self.assertTrue(success)
        self.assertIn("\n", result)  

    def test_list_specific_directory_sorted_by_name(self):
        success, result = command_ls(directory=self.temp_dir, sort_by='name')
        self.assertTrue(success)
        self.assertIn("aaa.txt", result)
        self.assertIn("zzz.txt", result)
        self.assertIn("bbb_dir", result)

        lines = [line for line in result.strip().split('\n') if line.strip()]
        if lines:
            names = [line.split()[-1] for line in lines]
            self.assertEqual(names, sorted(names, key=str.lower))
    def test_list_directory_sorted_by_size(self):
        success, result = command_ls(directory=self.temp_dir, sort_by='size')
        self.assertTrue(success)

        self.assertIn("aaa.txt", result)
        self.assertIn("zzz.txt", result)
        self.assertIn("bbb_dir", result)

    def test_list_directory_reverse_order(self):
        success, result_asc = command_ls(directory=self.temp_dir, sort_by='name', reverse=False)
        success2, result_desc = command_ls(directory=self.temp_dir, sort_by='name', reverse=True)
        self.assertTrue(success)
        self.assertTrue(success2)
        lines_asc = [line for line in result_asc.strip().split('\n') if line.strip()]
        lines_desc = [line for line in result_desc.strip().split('\n') if line.strip()]
        if lines_asc and lines_desc:
            names_asc = [line.split()[-1] for line in lines_asc]
            names_desc = [line.split()[-1] for line in lines_desc]
            self.assertEqual(names_asc, list(reversed(names_desc)))

    def test_invalid_directory_path(self):
        success, result = command_ls(directory="/non/existent/directory/path")
        self.assertFalse(success)  # Should return False for invalid directory

    def test_invalid_sort_option(self):
        success, result = command_ls(directory=self.temp_dir, sort_by='invalid_option')
        self.assertFalse(success)
