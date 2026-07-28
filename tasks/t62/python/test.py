import unittest
from unittest.mock import mock_open, patch


class TestReadLog(unittest.TestCase):

    def test_read_correct_data(self):
        mock_file_content = '{"test_acc1": 88.5, "train_loss": 0.75}\n' \
                            '{"test_acc1": 89.0, "train_loss": 0.70}'
        with patch('builtins.open', mock_open(read_data=mock_file_content)):
            train_loss, test_acc1 = read_log("dummy_path.json")
            self.assertEqual(train_loss, [0.75, 0.70])
            self.assertEqual(test_acc1, [88.5, 89.0])

    def test_read_correct_data_single(self):
        mock_file_content = '{"test_acc1": 88.5, "train_loss": 0.75}'
        with patch('builtins.open', mock_open(read_data=mock_file_content)):
            train_loss, test_acc1 = read_log("dummy_path.json")
            self.assertEqual(train_loss, [0.75])
            self.assertEqual(test_acc1, [88.5])
    def test_empty_file(self):
        with patch('builtins.open', mock_open(read_data="")):
            train_loss, test_acc1 = read_log("empty_file.json")
            self.assertEqual(train_loss, [])
            self.assertEqual(test_acc1, [])

    def test_partial_data_entries(self):
        mock_file_content = '{"test_acc1": 88.5, "train_loss": 0.75}\n' \
                            '{"test_acc1": 90.0,"train_loss": 0.75,"f1":0.91}'
        with patch('builtins.open', mock_open(read_data=mock_file_content)):
            train_loss, test_acc1 = read_log("partial_data_file.json")
            self.assertEqual(train_loss, [0.75, 0.75])
            self.assertEqual(test_acc1, [88.5, 90.0])

    def test_missing_metric_entries(self):
        mock_file_content = '{"train_loss": 0.55}\n' \
                            '{"test_acc1": 91.25}\n' \
                            '{"epoch": 3}'
        with patch('builtins.open', mock_open(read_data=mock_file_content)):
            train_loss, test_acc1 = read_log("missing_metric_file.json")
            self.assertEqual(train_loss, [0.55])
            self.assertEqual(test_acc1, [91.25])
