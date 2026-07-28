import unittest


class TestConvertToShortFormat(unittest.TestCase):

    def test_basic_case(self):
        self.assertEqual(convert_to_short_format("f1_p1_g1_b1_c1"), "fpgbc")

    def test_multiple_segments(self):
        self.assertEqual(convert_to_short_format("a2_b3_c4"), "abc")

    def test_non_alpha_numeric(self):
        self.assertEqual(convert_to_short_format("hello_world_test"), "hwt")

    def test_single_segment(self):
        self.assertEqual(convert_to_short_format("single"), "s")

    def test_segments_starting_with_symbols_and_digits(self):
        self.assertEqual(convert_to_short_format("$cost_#tag_9lives"), "$#9")
