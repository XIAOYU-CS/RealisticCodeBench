import unittest

class TestCalculatePhraseProbability(unittest.TestCase):

    def test_basic_phrase_match(self):
        text = "the cat sat on the mat"
        phrase = "the cat"
        result = calculate_phrase_probability(text, phrase)
        self.assertEqual(result, 0.2)

    def test_no_match(self):
        text = "the cat sat on the mat"
        phrase = "dog house"
        result = calculate_phrase_probability(text, phrase)
        self.assertEqual(result, 0.0)

    def test_case_insensitive_match(self):
        text = "The Cat Sat On The Mat"
        phrase = "the cat"
        result = calculate_phrase_probability(text, phrase)
        self.assertEqual(result, 0.2)

    def test_case_sensitive_match(self):
        text = "The Cat Sat On The Mat"
        phrase = "the cat"
        result = calculate_phrase_probability(text, phrase, case_sensitive=True)
        self.assertEqual(result, 0.0)

    def test_empty_inputs(self):
        result1 = calculate_phrase_probability("", "test phrase")
        self.assertEqual(result1, 0.0)
        result2 = calculate_phrase_probability("test text", "")
        self.assertEqual(result2, 0.0)
        result3 = calculate_phrase_probability("", "")
        self.assertEqual(result3, 0.0)

    def test_text_shorter_than_phrase(self):
        text = "short text"
        phrase = "this is a very long phrase"
        result = calculate_phrase_probability(text, phrase)
        self.assertEqual(result, 0.0)