import unittest
import os
import shutil
from io import open


class TestFixEncoding(unittest.TestCase):
    def setUp(self):
        self.test_dir = 'test_files'
        os.makedirs(self.test_dir, exist_ok=True)
        self.input_file_path = os.path.join(self.test_dir, 'test_input.txt')
        self.output_file_path = os.path.join(self.test_dir, 'test_output.txt')

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def write_to_file(self, file_path, text, encoding):
        with open(file_path, 'w', encoding=encoding) as f:
            f.write(text)

    def test_basic_conversion(self):
        self.write_to_file(self.input_file_path, 'これはテストです', 'cp932')
        result = convert_encoding(self.input_file_path, self.output_file_path)
        self.assertTrue(result)
        with open(self.output_file_path, 'r', encoding='utf_16') as f:
            self.assertEqual(f.read(), 'これはテストです')

    def test_no_conversion_needed(self):
        self.write_to_file(self.input_file_path, 'No conversion needed', 'utf_16')
        result = convert_encoding(self.input_file_path, self.output_file_path, 'utf_16')
        self.assertTrue(result)

    def test_output_already_converted(self):
        self.write_to_file(self.input_file_path, 'Already utf_16', 'utf_16')
        result = convert_encoding(self.input_file_path, self.output_file_path, 'cp932', 'utf_16')
        self.assertTrue(result)

    def test_utf8_to_utf16(self):
        text = 'これはUTF-8からUTF-16へのテストです。'
        self.write_to_file(self.input_file_path, text, 'utf-8')
        result = convert_encoding(self.input_file_path, self.output_file_path, original_encoding='utf-8', target_encoding='utf_16')
        self.assertTrue(result)
        with open(self.output_file_path, 'r', encoding='utf_16') as f:
            self.assertEqual(f.read(), text)

    def test_shiftjis_to_utf8(self):
        text = 'シフトJISからUTF-8へ変換'
        self.write_to_file(self.input_file_path, text, 'cp932')
        result = convert_encoding(self.input_file_path, self.output_file_path, original_encoding='cp932', target_encoding='utf-8')
        self.assertTrue(result)
        with open(self.output_file_path, 'r', encoding='utf-8') as f:
            self.assertEqual(f.read(), text)

    def test_utf16_to_cp932(self):
        text = 'UTF-16からcp932へ戻すテスト'
        self.write_to_file(self.input_file_path, text, 'utf_16')
        result = convert_encoding(self.input_file_path, self.output_file_path, original_encoding='utf_16', target_encoding='cp932')
        self.assertTrue(result)
        with open(self.output_file_path, 'r', encoding='cp932') as f:
            self.assertEqual(f.read(), text)