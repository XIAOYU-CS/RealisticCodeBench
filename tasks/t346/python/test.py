import unittest

class TestBuildTableTask(unittest.TestCase):

    def test_basic_functionality(self):
        pos1_chunk = [
            [0, 1],
            [2, 3]
        ]
        initial_value = 2
        flags = [0, 1, 0, 1]
        basis = [3, 5, 7, 11]
        inv_basis = [4, 9, 8, 3]
        modulus = 11


        result = build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus)
        self.assertEqual(result, {10: [0, 1], 9: [2, 3]})

    def test_single_chunk_with_one_index(self):
        pos1_chunk = [[0]]
        initial_value = 1
        flags = [0]
        basis = [5]
        inv_basis = [3]
        modulus = 7

        result = build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus)
        self.assertEqual(result, {5: [0]})

    def test_empty_pos1_chunk(self):
        pos1_chunk = []
        initial_value = 10
        flags = [1, 0]
        basis = [2, 3]
        inv_basis = [5, 4]
        modulus = 11

        result = build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus)
        self.assertEqual(result, {})

    def test_invalid_index_type(self):
        pos1_chunk = [[0, "1"]]
        initial_value = 1
        flags = [0, 1]
        basis = [2, 3]
        inv_basis = [5, 4]
        modulus = 7

        with self.assertRaises(Exception) as context:
            build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus)

    def test_index_out_of_range(self):
        pos1_chunk = [[3]]
        initial_value = 1
        flags = [0, 1]
        basis = [2, 3]
        inv_basis = [5, 4]
        modulus = 7

        with self.assertRaises(Exception) as context:
            build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus)