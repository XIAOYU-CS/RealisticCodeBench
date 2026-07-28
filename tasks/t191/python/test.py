import unittest


class TestShuffleString(unittest.TestCase):

    def test_same_length(self):
        input_string = "abcdef"
        result = shuffle_string_characters(input_string)
        self.assertEqual(len(result), len(input_string))

    def test_shuffle_characters(self):
        input_string = "hello"
        result = shuffle_string_characters(input_string)
        self.assertNotEqual(result, input_string)

    def test_empty_string(self):
        input_string = ""
        result = shuffle_string_characters(input_string)
        self.assertEqual(result, "")

    def test_single_character(self):
        input_string = "a"
        result = shuffle_string_characters(input_string)
        self.assertEqual(result, "a")

    def test_identical_characters(self):
        input_string = "aaaaa"
        result = shuffle_string_characters(input_string)
        self.assertEqual(result, "aaaaa")

    def test_long_string(self):
        input_string = "abcdefghijklmnopqrstuvwxyz"
        result = shuffle_string_characters(input_string)
        self.assertNotEqual(result, input_string)
        self.assertEqual(len(result), len(input_string))

    def test_same_string_characters(self):
        input_string = "111111"
        result = shuffle_string_characters(input_string)
        self.assertEqual(result, "111111")

    def test_special_characters(self):
        input_string = "a!@#$%^&*()_+"
        result = shuffle_string_characters(input_string)
        self.assertEqual(len(result), len(input_string))
        self.assertNotEqual(result, input_string)
