import unittest
import os
import tempfile
from pathlib import Path

class TestCwdUtils(unittest.TestCase):

    def setUp(self):
        self.original_cwd = os.getcwd()
        self.test_dir = tempfile.mkdtemp()
        os.chdir(self.test_dir)
        (Path(self.test_dir) / "file1.txt").touch()
        (Path(self.test_dir) / "file2.py").touch()
        (Path(self.test_dir) / "test_dir").mkdir()
        (Path(self.test_dir) / ".hidden_file").touch()
        (Path(self.test_dir) / ".hidden_dir").mkdir()

    def tearDown(self):
        os.chdir(self.original_cwd)
        import shutil
        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_get_current_directory(self):
        result = cwd_utils(action="get", format_type="string")
        self.assertIsInstance(result, str)
        self.assertEqual(result, os.getcwd())

        result_path = cwd_utils(action="get", format_type="pathlib")
        self.assertIsInstance(result_path, Path)
        self.assertEqual(str(result_path), os.getcwd())

    def test_get_directory_permissions(self):
        result = cwd_utils(action="permissions")
        self.assertIsInstance(result, dict)
        self.assertIn("readable", result)
        self.assertIn("writable", result)
        self.assertIn("executable", result)
        self.assertIn("mode", result)

        self.assertTrue(result["readable"])
        self.assertTrue(result["writable"])
        self.assertTrue(result["executable"])

    def test_list_directory_contents(self):
        result = cwd_utils(action="list", show_hidden=False)
        self.assertIsInstance(result, dict)
        self.assertIn("directories", result)
        self.assertIn("files", result)

        dir_names = [Path(d).name for d in result["directories"]]
        file_names = [Path(f).name for f in result["files"]]

        self.assertIn("test_dir", dir_names)
        self.assertNotIn(".hidden_dir", dir_names)
        self.assertIn("file1.txt", file_names)
        self.assertIn("file2.py", file_names)
        self.assertNotIn(".hidden_file", file_names)

    def test_list_directory_contents_with_hidden(self):
        result = cwd_utils(action="list", show_hidden=True)
        self.assertIsInstance(result, dict)

        self.assertIn("test_dir", result["directories"])
        self.assertIn(".hidden_dir", result["directories"])
        self.assertIn("file1.txt", result["files"])
        self.assertIn("file2.py", result["files"])
        self.assertIn(".hidden_file", result["files"])

    def test_change_directory(self):
        sub_dir = Path(self.test_dir) / "sub_directory"
        sub_dir.mkdir()

        result = cwd_utils(action="change", new_dir=str(sub_dir))
        self.assertTrue(result)
        self.assertEqual(os.getcwd(), str(sub_dir))

        result = cwd_utils(action="change", new_dir="/non/existent/directory")
        self.assertIsNone(result)