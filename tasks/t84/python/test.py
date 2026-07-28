import unittest


class TestSplitIntoSentences(unittest.TestCase):

    def test_basic_splitting(self):
        text = "Hello world! How are you? I am fine."
        expected = ["Hello world!", "How are you?", "I am fine."]
        result = split_text_into_clean_sentences(text)
        self.assertEqual(result, expected)

    def test_complex_punctuation(self):
        text = 'He said, This is amazing! Then he left.'
        expected = ['He said, This is amazing!', "Then he left."]
        result = split_text_into_clean_sentences(text)
        self.assertEqual(result, expected)

    def test_with_no_punctuation(self):
        text = "Hello world how are you"
        expected = ["Hello world how are you"]
        result = split_text_into_clean_sentences(text)
        self.assertEqual(result, expected)

    def test_empty_string(self):
        text = ""
        expected = []
        result = split_text_into_clean_sentences(text)
        self.assertEqual(result, expected)

    def test_invalid_input(self):
        with self.assertRaises(ValueError):
            split_text_into_clean_sentences(None)
