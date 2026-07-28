import unittest


class TestSafeFormat(unittest.TestCase):

    def test_full_replacement(self):
        template = "Hello, {name}! Welcome to {place}."
        result = format_template_safely(template, name="Alice", place="Wonderland")
        expected = "Hello, Alice! Welcome to Wonderland."
        self.assertEqual(result, expected)

    def test_partial_replacement(self):
        template = "Hello, {name}! Welcome to {place}."
        result = format_template_safely(template, name="Alice")
        expected = "Hello, Alice! Welcome to {place}."
        self.assertEqual(result, expected)

    def test_no_replacement(self):
        template = "Hello, world!"
        result = format_template_safely(template)
        expected = "Hello, world!"
        self.assertEqual(result, expected)

    def test_missing_placeholder(self):
        template = "My name is {name}, and I live in {city}."
        result = format_template_safely(template, name="Alice")
        expected = "My name is Alice, and I live in {city}."
        self.assertEqual(result, expected)

    def test_numeric_values(self):
        template = "Your score is {score} out of {total}."
        result = format_template_safely(template, score=85, total=100)
        expected = "Your score is 85 out of 100."
        self.assertEqual(result, expected)
