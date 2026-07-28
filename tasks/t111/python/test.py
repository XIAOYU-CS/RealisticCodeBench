import subprocess
import unittest
from unittest.mock import patch, MagicMock


class TestGetWindowLocalIP(unittest.TestCase):

    @patch('subprocess.run')
    def test_local_ip_found(self, mock_run):
        mock_run.return_value = MagicMock(stdout='192.168.1.10\n')
        result = get_windows_local_ip()
        self.assertEqual(result, '192.168.1.10')

    @patch('subprocess.run')
    def test_no_local_ip_found(self, mock_run):
        mock_run.return_value = MagicMock(stdout='10.0.0.5\n')
        result = get_windows_local_ip()
        self.assertIsNone(result)

    @patch('subprocess.run')
    def test_multiple_ips_found(self, mock_run):
        mock_run.return_value = MagicMock(stdout='10.0.0.5\n'
                                                  '192.168.1.10\n')
        result = get_windows_local_ip()
        self.assertEqual(result, '192.168.1.10')

    @patch('subprocess.run')
    def test_invalid_command(self, mock_run):
        mock_run.side_effect = subprocess.CalledProcessError(1, 'ipconfig')
        result = get_windows_local_ip()
        self.assertIsNone(result)

    @patch('subprocess.run')
    def test_unexpected_error(self, mock_run):
        mock_run.side_effect = Exception("Unexpected error")
        result = get_windows_local_ip()
        self.assertIsNone(result)