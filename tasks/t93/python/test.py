import os
import tempfile
import unittest


class TestCheckSequences(unittest.TestCase):
    def write_sequences(self, *lines):
        fd, filename = tempfile.mkstemp(suffix=".dat")
        os.close(fd)
        with open(filename, "w") as file:
            if lines:
                file.write("\n".join(lines) + "\n")
        self.addCleanup(lambda: os.path.exists(filename) and os.remove(filename))
        return filename

    def assert_results(self, lines, expected):
        self.assertEqual(check_sequences(self.write_sequences(*lines)), expected)

    def test_classifies_mixed_arithmetic_sequences(self):
        self.assert_results([
            "2,4,6,8",
            "1,3,5,7",
            "10,20,30",
            "1,2,4,8",
            "5,10,15,20",
        ], {
            (2, 4, 6, 8): True,
            (1, 3, 5, 7): True,
            (10, 20, 30): True,
            (1, 2, 4, 8): False,
            (5, 10, 15, 20): True,
        })

    def test_two_value_sequences_are_valid_and_single_value_is_not(self):
        self.assert_results(["42,99", "7"], {
            (42, 99): True,
            (7,): False,
        })

    def test_handles_zero_and_negative_differences(self):
        self.assert_results(["4,4,4,4", "9,6,3,0,-3", "0,-1,-3"], {
            (4, 4, 4, 4): True,
            (9, 6, 3, 0, -3): True,
            (0, -1, -3): False,
        })

    def test_empty_file_returns_empty_result(self):
        self.assert_results([], {})

    def test_detects_late_difference_change(self):
        self.assert_results(["3,6,9,12,16", "100,90,80,70,60"], {
            (3, 6, 9, 12, 16): False,
            (100, 90, 80, 70, 60): True,
        })
