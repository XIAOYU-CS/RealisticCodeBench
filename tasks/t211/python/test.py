import unittest


class TestConvertToMathSansItalic(unittest.TestCase):
    def test_empty_string(self):
        self.assertEqual(convertToMathSansItalic(''), '')

    def test_uppercase_and_lowercase_conversion(self):
        self.assertEqual(convertToMathSansItalic('HelloWorld'), '𝑯𝒆𝒍𝒍𝒐𝑾𝒐𝒓𝒍𝒅')

    def test_unchanged_characters(self):
        self.assertEqual(convertToMathSansItalic('12345!@#'), '𝟣𝟤𝟥𝟦𝟧!@#')

    def test_mix_of_convertible_and_non_convertible_characters(self):
        self.assertEqual(convertToMathSansItalic('Math123!'), '𝑴𝒂𝒕𝒉𝟣𝟤𝟥!')

    def test_boundary_characters(self):
        self.assertEqual(convertToMathSansItalic('A0z9'), '𝑨𝟢𝒛𝟫')


if __name__ == '__main__':
    unittest.main()
