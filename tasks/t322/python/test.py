import unittest
from unittest.mock import patch, MagicMock
import sys

sys.modules['gdb'] = MagicMock()
import gdb

class TestInvokeFunction(unittest.TestCase):

    def setUp(self):
        """测试前准备"""
        gdb.execute.reset_mock()
        gdb.parse_and_eval.reset_mock()
        gdb.GdbError = type('GdbError', (Exception,), {})

        class TestGdbCommand:
            def invoke(self, arg, from_tty):
                import shlex

                args = shlex.split(arg)
                if len(args) < 1:
                    raise gdb.GdbError("Invalid arguments: Requires start_address [count] [step]")

                try:
                    start_addr = int(gdb.parse_and_eval(args[0]))
                    count = int(args[1]) if len(args) > 1 else 53
                    step = int(args[2]) if len(args) > 2 else 8
                except (ValueError, IndexError) as e:
                    raise gdb.GdbError(f"Failed to parse arguments: {str(e)}")

                if step not in (4, 8):
                    raise gdb.GdbError(f"Unsupported step size {step}. Use 4 (32-bit) or 8 (64-bit)")

                if count <= 0:
                    raise gdb.GdbError(f"Invalid count {count}: must be positive")

                x_format = 'w' if step == 4 else 'g'
                x_cmd = f"x/{x_format}x"

                results = {
                    "success": [],
                    "failed": []
                }

                for i in range(0, count * step, step):
                    current_addr = start_addr + i
                    try:
                        mem_result = gdb.execute(f"{x_cmd} {hex(current_addr)}", to_string=True)
                        if ":" not in mem_result:
                            raise ValueError(f"Unexpected memory output format: {mem_result}")

                        target_hex = mem_result.split(":")[1].split()[0].strip()
                        target_addr = int(target_hex, 16)

                        break_result = gdb.execute(f"break *{hex(target_addr)}", to_string=True)
                        if "Breakpoint" not in break_result:
                            raise RuntimeError(f"Breakpoint command failed: {break_result}")

                        bp_num = int(break_result.split()[1].strip(":"))
                        results["success"].append((hex(target_addr), bp_num))

                    except Exception as e:
                        error_msg = f"{str(e)}"
                        results["failed"].append((hex(current_addr), error_msg))

                return results

        self.test_command = TestGdbCommand()

    def test_successful_breakpoint_creation_64bit(self):
        gdb.parse_and_eval.return_value = 0x1000
        gdb.execute.side_effect = [
            "0x1000: 0x2000",
            "Breakpoint 1 at 0x2000",
        ]

        result = self.test_command.invoke("0x1000 1 8", from_tty=False)

        self.assertEqual(len(result["success"]), 1)
        self.assertEqual(len(result["failed"]), 0)
        self.assertEqual(result["success"][0], ("0x2000", 1))

        gdb.parse_and_eval.assert_called_once_with("0x1000")
        expected_calls = [
            unittest.mock.call("x/gx 0x1000", to_string=True),
            unittest.mock.call("break *0x2000", to_string=True)
        ]
        gdb.execute.assert_has_calls(expected_calls)

    def test_successful_breakpoint_creation_32bit(self):
        gdb.parse_and_eval.return_value = 0x1000
        gdb.execute.side_effect = [
            "0x1000: 0x2000",
            "Breakpoint 2 at 0x2000",
        ]

        result = self.test_command.invoke("0x1000 1 4", from_tty=False)

        self.assertEqual(len(result["success"]), 1)
        self.assertEqual(len(result["failed"]), 0)
        self.assertEqual(result["success"][0], ("0x2000", 2))

        expected_calls = [
            unittest.mock.call("x/wx 0x1000", to_string=True),
            unittest.mock.call("break *0x2000", to_string=True)
        ]
        gdb.execute.assert_has_calls(expected_calls)

    def test_unsupported_step_size(self):
        with self.assertRaises(gdb.GdbError) as context:
            self.test_command.invoke("0x1000 1 6", from_tty=False)

        self.assertEqual(
            str(context.exception),
            "Unsupported step size 6. Use 4 (32-bit) or 8 (64-bit)"
        )

    def test_memory_read_failure(self):
        gdb.parse_and_eval.return_value = 0x1000
        gdb.execute.side_effect = [
            "Invalid format",
        ]

        result = self.test_command.invoke("0x1000 1 8", from_tty=False)

        self.assertEqual(len(result["success"]), 0)
        self.assertEqual(len(result["failed"]), 1)
        self.assertIn("Unexpected memory output format", result["failed"][0][1])

    def test_breakpoint_creation_failure(self):
        gdb.parse_and_eval.return_value = 0x1000
        gdb.execute.side_effect = [
            "0x1000: 0x2000",
            "Error setting breakpoint",
        ]

        result = self.test_command.invoke("0x1000 1 8", from_tty=False)

        self.assertEqual(len(result["success"]), 0)
        self.assertEqual(len(result["failed"]), 1)
        self.assertIn("Breakpoint command failed", result["failed"][0][1])
        self.assertEqual(result["failed"][0][0], "0x1000")