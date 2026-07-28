import unittest
import os
import tempfile
import shutil


class TestMvFunction(unittest.TestCase):

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()
        self.source_dir = os.path.join(self.temp_dir, "source")
        self.dest_dir = os.path.join(self.temp_dir, "dest")
        self.single_file = os.path.join(self.temp_dir, "test_file.txt")
        self.single_dest = os.path.join(self.temp_dir, "new_file.txt")

        os.makedirs(self.source_dir)
        os.makedirs(self.dest_dir)

        with open(self.single_file, 'w') as f:
            f.write("test content")

        with open(os.path.join(self.source_dir, "file1.txt"), 'w') as f:
            f.write("content1")
        with open(os.path.join(self.source_dir, "file2.txt"), 'w') as f:
            f.write("content2")

    def tearDown(self):
        if os.path.exists(self.temp_dir):
            shutil.rmtree(self.temp_dir)

    def test_single_file_move_success(self):
        success, fail = mv(self.single_file, self.single_dest)

        self.assertEqual(len(success), 1)
        self.assertEqual(len(fail), 0)
        self.assertEqual(success[0], self.single_file)
        self.assertTrue(os.path.exists(self.single_dest))
        self.assertFalse(os.path.exists(self.single_file))

    def test_multiple_files_move_success(self):
        source_files = [
            os.path.join(self.source_dir, "file1.txt"),
            os.path.join(self.source_dir, "file2.txt")
        ]

        success, fail = mv(source_files, self.dest_dir)

        self.assertEqual(len(success), 2)
        self.assertEqual(len(fail), 0)
        self.assertIn(source_files[0], success)
        self.assertIn(source_files[1], success)

        self.assertTrue(os.path.exists(os.path.join(self.dest_dir, "file1.txt")))
        self.assertTrue(os.path.exists(os.path.join(self.dest_dir, "file2.txt")))
        self.assertFalse(os.path.exists(source_files[0]))
        self.assertFalse(os.path.exists(source_files[1]))

    def test_move_with_overwrite_true(self):
        dest_file = os.path.join(self.dest_dir, "file1.txt")
        with open(dest_file, 'w') as f:
            f.write("old content")

        source_file = os.path.join(self.source_dir, "file1.txt")

        success, fail = mv(source_file, dest_file, overwrite=True)

        self.assertEqual(len(success), 1)
        self.assertEqual(len(fail), 0)
        self.assertTrue(os.path.exists(dest_file))
        self.assertFalse(os.path.exists(source_file))

        with open(dest_file, 'r') as f:
            content = f.read()
        self.assertEqual(content, "content1")

    def test_move_fail_due_to_existing_destination_no_overwrite(self):
        dest_file = os.path.join(self.dest_dir, "file1.txt")
        with open(dest_file, 'w') as f:
            f.write("existing content")

        source_file = os.path.join(self.source_dir, "file1.txt")

        success, fail = mv(source_file, dest_file, overwrite=False)

        self.assertEqual(len(success), 0)
        self.assertEqual(len(fail), 1)
        self.assertEqual(fail[0][0], source_file)
        self.assertIn("Destination already exists", fail[0][1])

        self.assertTrue(os.path.exists(source_file))
        self.assertTrue(os.path.exists(dest_file))

    def test_move_nonexistent_source(self):
        nonexistent_file = os.path.join(self.temp_dir, "nonexistent.txt")
        dest_file = os.path.join(self.dest_dir, "new_file.txt")

        success, fail = mv(nonexistent_file, dest_file)

        self.assertEqual(len(success), 0)
        self.assertEqual(len(fail), 1)
        self.assertEqual(fail[0][0], nonexistent_file)
        self.assertIn("Source path does not exist", fail[0][1])
        self.assertFalse(os.path.exists(dest_file))