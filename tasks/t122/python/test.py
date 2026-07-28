import unittest


class TestConvertToRingFormat(unittest.TestCase):

    def test_no_holes(self):
        holes = []
        expected = [1] * 32
        result = convert_hole_positions_to_32bit_ring(holes)
        self.assertEqual(result, expected)

    def test_single_hole(self):
        holes = [5]
        expected = [1] * 32
        expected[5] = 0
        result = convert_hole_positions_to_32bit_ring(holes)
        self.assertEqual(result, expected)

    def test_multiple_holes(self):
        holes = [0, 2, 4, 8, 16]
        expected = [1] * 32
        for hole in holes:
            expected[hole] = 0
        result = convert_hole_positions_to_32bit_ring(holes)
        self.assertEqual(result, expected)

    def test_hole_out_of_bounds(self):
        holes = [-1, 32, 5, 10]
        expected = [1] * 32
        expected[5] = 0
        expected[10] = 0
        result = convert_hole_positions_to_32bit_ring(holes)
        self.assertEqual(result, expected)

    def test_all_holes(self):
        holes = list(range(32))
        expected = [0] * 32
        result = convert_hole_positions_to_32bit_ring(holes)
        self.assertEqual(result, expected)