import unittest
import numpy as np
import tempfile
from pathlib import Path


class TestReadArrayFile(unittest.TestCase):

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()
        self.temp_path = Path(self.temp_dir)

    def tearDown(self):
        import shutil
        shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_read_npy_file_with_default_target_dims(self):
        test_array = np.random.rand(3, 4, 5)
        npy_file = self.temp_path / "test.npy"
        np.save(npy_file, test_array)
        result = read_array_file(npy_file)
        self.assertIsInstance(result, np.ndarray)
        np.testing.assert_array_equal(result.shape, [3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1])
        np.testing.assert_array_almost_equal(result[..., 0, 0, 0, 0, 0, 0, 0, 0, 0], test_array)

    def test_read_npy_file_preserve_original_dims(self):
        test_array = np.random.rand(2, 3, 4)
        npy_file = self.temp_path / "test_orig.npy"
        np.save(npy_file, test_array)
        result = read_array_file(npy_file, target_dims=None)
        self.assertIsInstance(result, np.ndarray)
        np.testing.assert_array_equal(result.shape, [2, 3, 4])
        np.testing.assert_array_equal(result, test_array)

    def test_read_cfl_file_with_header(self):
        test_array = np.array([[[1 + 2j, 3 + 4j], [5 + 6j, 7 + 8j]],
                               [[9 + 10j, 11 + 12j], [13 + 14j, 15 + 16j]]], dtype=np.complex64)

        cfl_file = self.temp_path / "test_data.cfl"
        with open(cfl_file, 'wb') as f:
            test_array.flatten(order='F').tofile(f)
        hdr_file = self.temp_path / "test_data.hdr"
        with open(hdr_file, 'w') as f:
            f.write("# Dimensions\n")
            f.write("2 2 2\n")
        result = read_array_file(cfl_file, target_dims=5)
        self.assertIsInstance(result, np.ndarray)
        np.testing.assert_array_equal(result.shape, [2, 2, 2, 1, 1])
        np.testing.assert_array_equal(result[..., 0, 0], test_array)

    def test_read_cfl_file_without_extension(self):
        test_array = np.array([[1.0, 2.0], [3.0, 4.0]], dtype=np.complex64)  # 2x2
        cfl_file = self.temp_path / "test_no_ext.cfl"
        with open(cfl_file, 'wb') as f:
            test_array.flatten(order='F').tofile(f)
        hdr_file = self.temp_path / "test_no_ext.hdr"
        with open(hdr_file, 'w') as f:
            f.write("# Header\n")
            f.write("2 2\n")
        result = read_array_file(str(cfl_file.with_suffix('')), target_dims=4)
        self.assertIsInstance(result, np.ndarray)
        np.testing.assert_array_equal(result.shape, [2, 2, 1, 1])
        np.testing.assert_array_equal(result[..., 0, 0], test_array)

    def test_invalid_file_format_raises_error(self):
        invalid_file = self.temp_path / "test_invalid.txt"
        with open(invalid_file, 'w') as f:
            f.write("This is not a valid array file")

        with self.assertRaises(ValueError) as context:
            read_array_file(invalid_file)

        self.assertIn("Only .npy and .cfl format files are supported", str(context.exception))

    def test_missing_hdr_file_raises_error(self):
        cfl_file = self.temp_path / "missing_hdr.cfl"
        with open(cfl_file, 'wb') as f:
            f.write(b"dummy data")

        with self.assertRaises(Exception) as context:
            read_array_file(cfl_file)