import unittest


class TestPascalTriangleRow(unittest.TestCase):

    def test_row_0(self):
        self.assertEqual(pascal_triangle_row(0), [1])

    def test_row_1(self):
        self.assertEqual(pascal_triangle_row(1), [1, 1])

    def test_row_2(self):
        self.assertEqual(pascal_triangle_row(2), [1, 2, 1])

    def test_row_3(self):
        self.assertEqual(pascal_triangle_row(3), [1, 3, 3, 1])

    def test_row_4(self):
        self.assertEqual(pascal_triangle_row(4), [1, 4, 6, 4, 1])

    def test_row_5(self):
        self.assertEqual(pascal_triangle_row(5), [1, 5, 10, 10, 5, 1])
