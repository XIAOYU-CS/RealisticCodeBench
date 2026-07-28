import unittest


class TestFindShiftJISNotGBK(unittest.TestCase):

    def setUp(self):
        self.shiftjis_not_gbk = find_shiftjis_not_gbk()

    def test_known_shiftjis_character_not_in_gbk(self):
        known_shiftjis_only = 'ヱ'
        self.assertNotIn(known_shiftjis_only, self.shiftjis_not_gbk)

    def test_character_unique_to_shiftjis(self):
        shiftjis_only = '・'
        self.assertIn(shiftjis_only, self.shiftjis_not_gbk)

    def test_character_in_both_encodings(self):
        common_character = '水'
        self.assertNotIn(common_character, self.shiftjis_not_gbk)

    def test_character_in_neither_encoding(self):
        neither_encoding_char = '\U0001F4A9'
        self.assertNotIn(neither_encoding_char, self.shiftjis_not_gbk)

    def test_bounds_of_bmp(self):
        edge_of_bmp = '\uffff'
        if edge_of_bmp in self.shiftjis_not_gbk:
            self.assertIn(edge_of_bmp, self.shiftjis_not_gbk)
        else:
            self.assertNotIn(edge_of_bmp, self.shiftjis_not_gbk)
