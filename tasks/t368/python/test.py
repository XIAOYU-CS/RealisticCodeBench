import unittest
from unittest import mock
import subprocess


class TestCommandShellSafe(unittest.TestCase):

    @mock.patch('subprocess.run')
    def test_valid_command_success(self, mock_run):
        mock_run.return_value = subprocess.CompletedProcess(
            args=['cmd.exe', '/c', 'echo', 'hello'],
            returncode=0,
            stdout='hello\r\n',
            stderr=''
        )

        result = command_shell_safe(['echo', 'hello'])

        self.assertEqual(result['status'], 'success')
        self.assertIn('hello', result['result'])
        mock_run.assert_called()

    @mock.patch('subprocess.run')
    def test_invalid_command_failure(self, mock_run):
        mock_run.return_value = subprocess.CompletedProcess(
            args=['cmd.exe', '/c', 'invalid_command'],
            returncode=1,
            stdout='',
            stderr='\'invalid_command\' is not recognized as an internal or external command.\r\n'
        )

        result = command_shell_safe(['invalid_command'])

        self.assertEqual(result['status'], 'error')
        self.assertIn('execution failed', result['result'])
        self.assertIn('Exit code: 1', result['result'])
        self.assertIn('not recognized', result['result'])

    def test_empty_arguments(self):
        result = command_shell_safe([])

        self.assertEqual(result['status'], 'error')
        self.assertEqual(result['result'], '[invalid argument]')

        result = command_shell_safe(None)
        self.assertEqual(result['status'], 'error')
        self.assertEqual(result['result'], '[invalid argument]')

    @mock.patch('subprocess.run', side_effect=subprocess.TimeoutExpired(cmd=['cmd.exe'], timeout=5))
    def test_command_timeout(self, mock_run):
        result = command_shell_safe(['ping', '127.0.0.1', '-t'], timeout=5)

        self.assertEqual(result['status'], 'error')
        self.assertEqual(result['result'], '[error] Command timed out.')
        mock_run.assert_called()

    @mock.patch('sys.platform', 'linux')
    @mock.patch('subprocess.run')
    def test_cross_platform_linux_simulation(self, mock_run):
        mock_run.return_value = subprocess.CompletedProcess(
            args=['sh', '-c', 'ls /tmp'],
            returncode=0,
            stdout='/tmp/file1\n/tmp/file2\n',
            stderr=''
        )

        result = command_shell_safe(['ls', '/tmp'])

        args, kwargs = mock_run.call_args
        called_cmd = args[0]
        self.assertEqual(called_cmd[0], 'sh')
        self.assertEqual(called_cmd[1], '-c')
        self.assertIn('ls /tmp', called_cmd[2])

        self.assertEqual(result['status'], 'success')
        self.assertIn('file1', result['result'])
        self.assertIn('file2', result['result'])