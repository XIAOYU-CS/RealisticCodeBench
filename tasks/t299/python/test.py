import unittest

class TestCheckXORConstraints(unittest.TestCase):

    def test_exact_match_single_row(self):
        data = [[0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x16]]
        xor_groups = [[0, 3, 6], [1, 4, 7], [2, 5]]
        target_values = [0x6b, 0x76, 0x12]

        result = check_xor_constraints(data, xor_groups, target_values)
        self.assertEqual(result, [True])

    def test_no_match_single_row(self):
        data = [[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]]  # all zeros
        xor_groups = [[0, 3, 6], [1, 4, 7], [2, 5]]
        target_values = [0x6b, 0x76, 0x12]

        result = check_xor_constraints(data, xor_groups, target_values)
        self.assertEqual(result, [False])

    def test_multiple_rows_mixed_results(self):
        data = [
            [0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x36],
            [0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x00],
            [0xFF, 0xFF, 0x12, 0xFF, 0xFF, 0x00, 0xFF, 0xFF],
        ]
        xor_groups = [[0, 3, 6], [1, 4, 7], [2, 5]]
        target_values = [0x6b, 0x76, 0x12]

        result = check_xor_constraints(data, xor_groups, target_values)
        expected = [False, False, False]
        self.assertEqual(result, expected)

    def test_empty_group_skipped(self):
        data = [[1, 2, 3], [4, 5, 6]]
        xor_groups = [[0, 1], [], [2]]
        target_values = [3, 0xdead, 3]

        result = check_xor_constraints(data, xor_groups, target_values)

        expected = [True, False]
        self.assertEqual(result, expected)

    def test_single_column_group(self):
        data = [[10, 40], [30, 40]]
        xor_groups = [[0], [1]]
        target_values = [10, 40]
        expected = [True, False]
        result = check_xor_constraints(data, xor_groups, target_values)
        self.assertEqual(result, expected)