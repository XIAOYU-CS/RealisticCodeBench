import unittest
import os
import struct
import tempfile


class TestReadBinaryFrames(unittest.TestCase):

    def setUp(self):
        self.temp_file = tempfile.NamedTemporaryFile(delete=False)
        self.file_path = self.temp_file.name
        self.temp_file.close()

    def tearDown(self):
        if os.path.exists(self.file_path):
            os.remove(self.file_path)

    def test_normal_case_with_integers(self):
        with open(self.file_path, 'wb') as f:
            f.write(struct.pack('<II', 10, 20))
            f.write(struct.pack('<II', 30, 40))
            f.write(struct.pack('<II', 50, 60))

        frames = read_binary_frames(self.file_path, (2, '<I'))

        self.assertEqual(len(frames), 3)
        self.assertEqual(frames[0], [10, 20])
        self.assertEqual(frames[1], [30, 40])
        self.assertEqual(frames[2], [50, 60])

    def test_normal_case_with_floats(self):

        with open(self.file_path, 'wb') as f:
            f.write(struct.pack('>fff', 1.1, 2.2, 3.3))
            f.write(struct.pack('>fff', 4.4, 5.5, 6.6))

        frames = read_binary_frames(self.file_path, (3, '>f'))

        self.assertEqual(len(frames), 2)
        self.assertAlmostEqual(frames[0][0], 1.1, places=6)
        self.assertAlmostEqual(frames[1][2], 6.6, places=6)

    def test_incomplete_frame_handling(self):
        with open(self.file_path, 'wb') as f:
            f.write(struct.pack('<ff', 1.0, 2.0))
            f.write(struct.pack('<f', 3.0))

        frames = read_binary_frames(self.file_path, (2, '<f'), ignore_incomplete=False)
        self.assertEqual(len(frames), 1)
        self.assertAlmostEqual(frames[0][0], 1.0)

        frames_ignored = read_binary_frames(self.file_path, (2, '<f'), ignore_incomplete=True)
        self.assertEqual(len(frames_ignored), 1)

    def test_invalid_parameters(self):
        with self.assertRaises(Exception) as ctx:
            read_binary_frames(self.file_path, (-1, '<I'))

        with self.assertRaises(Exception) as ctx:
            read_binary_frames(self.file_path, (2, 'invalid'))

    def test_file_not_found(self):
        os.remove(self.file_path)

        with self.assertRaises(Exception) as ctx:
            read_binary_frames(self.file_path, (2, '<I'))