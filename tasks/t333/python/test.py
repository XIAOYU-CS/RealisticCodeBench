import unittest
from typing import List, Tuple, Dict, Any


class TestNGramModelProb(unittest.TestCase):

    def test_unigram_probability(self):
        context = []
        word = 'hello'
        result = prob(context, word)
        self.assertEqual(result, 0.5)

    def test_bigram_probability(self):
        context = ['hello']
        word = 'world'
        result = prob(context, word)
        self.assertEqual(result, 0.8)

    def test_trigram_probability(self):
        context = ['hello', 'world']
        word = 'test'
        result = prob(context, word)
        self.assertEqual(result, 0.75)

    def test_zero_probability_unknown_word(self):
        context = ['hello']
        word = 'unknown'
        result = prob(context, word)
        self.assertEqual(result, 0.0)

    def test_zero_probability_unknown_context(self):
        context = ['unknown']
        word = 'world'
        result = prob(context, word)
        self.assertEqual(result, 0.0)