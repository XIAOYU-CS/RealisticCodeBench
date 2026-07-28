import unittest


class TestGetAllAlphabets(unittest.TestCase):

    def test_return_length(self):
        result = generate_alphabet_array()
        self.assertEqual(len(result), 52)

    def test_lowercase_alphabets(self):
        result = generate_alphabet_array()
        lowercase_alphabets = result[:26]
        self.assertEqual(lowercase_alphabets, [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ])

    def test_uppercase_alphabets(self):
        result = generate_alphabet_array()
        uppercase_alphabets = result[26:]
        self.assertEqual(uppercase_alphabets, [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ])

    def test_first_element(self):
        result = generate_alphabet_array()
        self.assertEqual(result[0], 'a')

    def test_last_element(self):
        result = generate_alphabet_array()
        self.assertEqual(result[-1], 'Z')
