import unittest
import asyncio
import tempfile
from pathlib import Path


class TestCalculateDirectorySize(unittest.TestCase):

    def setUp(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)

    def tearDown(self):
        self.loop.close()

    def async_run(self, coro):
        return self.loop.run_until_complete(coro)

    def test_empty_directory(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            result = self.async_run(calculate_directory_size(temp_dir))
            self.assertEqual(result, 0)

    def test_directory_with_files(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            file1_path = Path(temp_dir) / "file1.txt"
            file1_path.write_text("Hello")

            file2_path = Path(temp_dir) / "file2.txt"
            file2_path.write_text("World!")

            expected_size = 5 + 6
            result = self.async_run(calculate_directory_size(temp_dir))
            self.assertEqual(result, expected_size)

    def test_directory_with_subdirectories(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            subdir1 = Path(temp_dir) / "subdir1"
            subdir1.mkdir()

            subdir2 = Path(temp_dir) / "subdir2"
            subdir2.mkdir()

            (Path(temp_dir) / "main_file.txt").write_text("main")

            (subdir1 / "sub1_file.txt").write_text("sub1")
            (subdir2 / "sub2_file.txt").write_text("sub2_file_content")

            expected_size = 4 + 4 + 17
            result = self.async_run(calculate_directory_size(temp_dir))
            self.assertEqual(result, expected_size)

    def test_nonexistent_directory(self):
        nonexistent_path = "/nonexistent/directory/path"
        with self.assertRaises(Exception):
            self.async_run(calculate_directory_size(nonexistent_path))

    def test_not_a_directory(self):
        with tempfile.NamedTemporaryFile() as temp_file:
            with self.assertRaises(Exception):
                self.async_run(calculate_directory_size(temp_file.name))