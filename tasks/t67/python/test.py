import unittest
from unittest.mock import mock_open, patch


class TestGetMinDistance(unittest.TestCase):

    def test_basic_functionality(self):
        mock_content = "hello world\napple banana apple\norange apple banana"
        with patch('builtins.open', mock_open(read_data=mock_content)):
            line_number, distance = get_min_seq_num_and_distance('dummy_file.txt', 'apple', 'banana')
            self.assertEqual((line_number, distance), (2, 1))


    def test_words_not_present(self):
        mock_content = "apple orange pear\norange pear apple"
        with patch('builtins.open', mock_open(read_data=mock_content)):
            line_number, distance = get_min_seq_num_and_distance('dummy_file.txt', 'apple', 'banana')
            self.assertEqual((line_number, distance), (None, float('inf')))

    def test_empty_file(self):
        with patch('builtins.open', mock_open(read_data='')):
            line_number, distance = get_min_seq_num_and_distance('dummy_file.txt', 'apple', 'banana')
            self.assertEqual((line_number, distance), (None, float('inf')))

    def test_multiple_lines_with_varying_distances(self):
        mock_content = "apple banana\napple orange orange banana\napple orange orange orange banana"
        with patch('builtins.open', mock_open(read_data=mock_content)):
            line_number, distance = get_min_seq_num_and_distance('dummy_file.txt', 'apple', 'banana')
            self.assertEqual((line_number, distance), (1, 1))

    def test_missing_file_returns_infinite_distance(self):
        with patch('builtins.open', side_effect=FileNotFoundError):
            line_number, distance = get_min_seq_num_and_distance('missing.txt', 'apple', 'banana')
            self.assertEqual((line_number, distance), (None, float('inf')))
