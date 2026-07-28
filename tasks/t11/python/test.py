import unittest
class TestExtractPhoneNumbers(unittest.TestCase):

    def test_domestic_phone_numbers(self):
        text = "Call me at 555-123-4567 or (555) 987-6543. Also try 1234567890."
        expected = ['555-123-4567', '(555) 987-6543', '1234567890']
        result = extract_phone_numbers(text, include_international=False)
        self.assertEqual(len(result), 3)
        for num in expected:
            self.assertIn(num, result)

    def test_international_phone_numbers(self):
        text = "International numbers: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678"
        expected = ['+1-800-555-1234', '+44 20 7946 0853', '+86 138 1234 5678']
        result = extract_phone_numbers(text)
        self.assertEqual(len(result), 3)
        for num in expected:
            self.assertIn(num, result)

    def test_mixed_phone_numbers(self):
        text = "Contact: +1-800-555-1234, local: (555) 123-4567, UK: +44 20 7946 0853"
        expected = ['+1-800-555-1234', '(555) 123-4567', '+44 20 7946 0853']
        result = extract_phone_numbers(text)
        self.assertEqual(len(result), 3)
        for num in expected:
            self.assertIn(num, result)

    def test_clean_format_option(self):
        text = "Call +1-800-555-1234 or (555) 123-4567"
        expected = ['18005551234', '5551234567']
        result = extract_phone_numbers(text, clean_format=True)
        self.assertEqual(len(result), 2)
        for num in expected:
            self.assertIn(num, result)

    def test_duplicate_removal(self):
        text = "Same number: 555-123-4567, 555-123-4567, and +1-800-555-1234, +1-800-555-1234"
        result = extract_phone_numbers(text)
        # Should only have 2 unique numbers
        self.assertEqual(len(result), 2)
        self.assertIn('555-123-4567', result)
        self.assertIn('+1-800-555-1234', result)