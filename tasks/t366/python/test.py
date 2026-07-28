import unittest
import os
import tempfile
import shutil
from pathlib import Path

class TestEnhancedCd(unittest.TestCase):

    def setUp(self):
        self.original_cwd = os.getcwd()
        self.test_base_dir = tempfile.mkdtemp()
        self.dir1 = Path(self.test_base_dir) / "dir1"
        self.dir2 = Path(self.test_base_dir) / "dir2"
        self.dir1.mkdir()
        self.dir2.mkdir()
        os.chdir(self.test_base_dir)
        if hasattr(enhanced_cd, 'history'):
            enhanced_cd.history = []

    def tearDown(self):
        os.chdir(self.original_cwd)
        shutil.rmtree(self.test_base_dir, ignore_errors=True)
        if hasattr(enhanced_cd, 'history'):
            enhanced_cd.history = []

    def test_get_current_directory(self):
        success, message, new_dir = enhanced_cd(None)
        self.assertTrue(success)
        self.assertIn("Current directory:", message)
        self.assertEqual(new_dir, self.test_base_dir)
        self.assertEqual(new_dir, os.getcwd())

    def test_change_to_valid_directory(self):
        success, message, new_dir = enhanced_cd(str(self.dir1))
        self.assertTrue(success)
        self.assertIn("Changed to:", message)
        self.assertEqual(new_dir, str(self.dir1))
        self.assertEqual(os.getcwd(), str(self.dir1))

    def test_change_to_nonexistent_directory(self):
        current_dir = os.getcwd()
        success, message, new_dir = enhanced_cd("/non/existent/directory")
        self.assertFalse(success)
        self.assertIn("Error:", message)
        self.assertEqual(new_dir, current_dir)
        self.assertEqual(os.getcwd(), current_dir)

    def test_change_to_file_instead_of_directory(self):
        test_file = self.test_base_dir / Path("test_file.txt")
        test_file.touch()

        current_dir = os.getcwd()
        success, message, new_dir = enhanced_cd(str(test_file))
        self.assertFalse(success)
        self.assertIn("Error: Not a valid directory", message)
        self.assertEqual(new_dir, current_dir)
        self.assertEqual(os.getcwd(), current_dir)

    def test_history_functionality_and_dash_switching(self):
        enhanced_cd(str(self.dir1))
        enhanced_cd(str(self.dir2))

        self.assertTrue(hasattr(enhanced_cd, 'history'))
        self.assertGreater(len(enhanced_cd.history), 0)

        current_dir_before_dash = os.getcwd()
        success, message, new_dir = enhanced_cd("-")
        self.assertTrue(success)
        self.assertIn("Changed to:", message)
        # Should switch back to dir1 (previous directory)
        self.assertEqual(new_dir, str(self.dir1))
        self.assertEqual(os.getcwd(), str(self.dir1))

    def test_history_limit_enforcement(self):
        test_dirs = []
        for i in range(5):
            test_dir = Path(self.test_base_dir) / f"test_dir_{i}"
            test_dir.mkdir()
            test_dirs.append(test_dir)

        for i in range(15):
            enhanced_cd(str(test_dirs[i % 5]))

        self.assertTrue(hasattr(enhanced_cd, 'history'))
        self.assertLessEqual(len(enhanced_cd.history), 10)