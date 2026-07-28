import unittest
import os
import tempfile


class TestResolvePath(unittest.TestCase):

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()
        self.test_file = os.path.join(self.temp_dir, "test.txt")
        with open(self.test_file, "w") as f:
            f.write("test content")

    def tearDown(self):
        if os.path.exists(self.temp_dir):
            import shutil
            shutil.rmtree(self.temp_dir)

    def test_absolute_path_resolution(self):
        if os.name == 'nt':
            result = resolve_path("C:\\Windows\\System32", normalize=False)
            self.assertEqual(result, "C:\\Windows\\System32")
        else:
            result = resolve_path("/etc", normalize=False)
            self.assertEqual(result, "/etc")

        test_path = "/non/existent/absolute/path"
        result = resolve_path(test_path, normalize=False, allow_non_existent=True)
        if os.name == 'nt':
            self.assertIsNotNone(result)
            self.assertTrue(result.endswith("non\\existent\\absolute\\path".replace("/", "\\")))
        else:
            self.assertEqual(result, test_path)

    def test_relative_path_with_base_dir(self):
        base_dir = self.temp_dir
        result = resolve_path("test.txt", base_dir=base_dir)
        expected = os.path.normpath(os.path.join(os.path.abspath(base_dir), "test.txt"))
        self.assertEqual(result, expected)

        subdir = os.path.join(base_dir, "subdir")
        os.makedirs(subdir, exist_ok=True)
        result = resolve_path("../test.txt", base_dir=subdir)
        expected = os.path.normpath(os.path.join(os.path.abspath(base_dir), "test.txt"))
        self.assertEqual(result, expected)

    def test_user_home_expansion(self):
        home_dir = os.path.expanduser("~")
        if home_dir and os.path.exists(home_dir):
            result = resolve_path("~/Documents", normalize=False, allow_non_existent=True)
            if result:  # Only test if home directory resolution works
                self.assertTrue("Documents" in result or result.endswith("Documents"))

    def test_path_normalization(self):
        base_dir = self.temp_dir
        result = resolve_path("./subdir/../test.txt", base_dir=base_dir)
        expected = os.path.normpath(os.path.join(os.path.abspath(base_dir), "test.txt"))
        self.assertEqual(result, expected)

    def test_existence_checking(self):
        base_dir = self.temp_dir

        result = resolve_path("test.txt", base_dir=base_dir, check_exists=True)
        self.assertIsNotNone(result)
        if result:
            self.assertTrue(os.path.exists(result))

        result = resolve_path("nonexistent.txt", base_dir=base_dir, check_exists=True)
        self.assertIsNone(result)

        result = resolve_path("nonexistent.txt", base_dir=base_dir, check_exists=False, allow_non_existent=True)
        self.assertIsNotNone(result)

        result = resolve_path("nonexistent.txt", base_dir=base_dir, check_exists=False, allow_non_existent=False)
        self.assertIsNone(result)