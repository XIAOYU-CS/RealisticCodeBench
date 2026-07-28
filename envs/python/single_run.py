import re
from typing import List

def extract_phone_numbers(
    s: str,
    clean_format: bool = False,
    include_international: bool = True
) -> List[str]:
    """
    Extracts all matching phone numbers from a string, with optional cleaned formatting.

    Supported formats include:
    - International: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678
    - Domestic: 555-555-1234, 555 555 1234, 5555551234, (555) 555-1234
    - Mixed: (555)555 1234, 555.555.1234

    Args:
        s: Input string to search for phone numbers.
        clean_format: If True, remove all separators (default: False).
        include_international: If True, include international numbers (default: True).

    Returns:
        A list of unique matched phone numbers. Returns an empty list if none found.
    """

    # Domestic phone number pattern (US-style)
    domestic_pattern = r"(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}"

    if include_international:
        # International phone number pattern
        # Matches +[1-3 digits][optional separator][domestic format or 12-digit format]
        international_pattern = r"\+\d{1,3}[-.\s]?(?:\d{1,4}[-.\s]?){1,4}\d{1,4}"
        # Combine both patterns
        pattern = f"({international_pattern})|({domestic_pattern})"
    else:
        pattern = domestic_pattern

    # Find all matches
    matches = re.findall(pattern, s)

    # Flatten matches (because of groups, findall returns tuples)
    phone_numbers = []
    for match in matches:
        # Match is a tuple when there are groups; extract non-empty string
        if isinstance(match, tuple):
            number = next((m for m in match if m), "")
        else:
            number = match
        if number:
            phone_numbers.append(number)

    # Remove duplicates
    unique_numbers = list(set(phone_numbers))

    # Clean format if requested (remove all separators)
    if clean_format:
        return [re.sub(r"[-. ()+]", "", num) for num in unique_numbers]

    return unique_numbers
import unittest
class TestExtractPhoneNumbers(unittest.TestCase):

    def test_domestic_phone_numbers(self):
        """Test extraction of domestic US phone number formats"""
        text = "Call me at 555-123-4567 or (555) 987-6543. Also try 1234567890."
        expected = ['555-123-4567', '(555) 987-6543', '1234567890']
        result = extract_phone_numbers(text, include_international=False)
        self.assertEqual(len(result), 3)
        for num in expected:
            self.assertIn(num, result)

    def test_international_phone_numbers(self):
        """Test extraction of international phone number formats"""
        text = "International numbers: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678"
        expected = ['+1-800-555-1234', '+44 20 7946 0853', '+86 138 1234 5678']
        result = extract_phone_numbers(text)
        self.assertEqual(len(result), 3)
        for num in expected:
            self.assertIn(num, result)

    def test_mixed_phone_numbers(self):
        """Test extraction of both domestic and international numbers from mixed text"""
        text = "Contact: +1-800-555-1234, local: (555) 123-4567, UK: +44 20 7946 0853"
        expected = ['+1-800-555-1234', '(555) 123-4567', '+44 20 7946 0853']
        result = extract_phone_numbers(text)
        self.assertEqual(len(result), 3)
        for num in expected:
            self.assertIn(num, result)

    def test_clean_format_option(self):
        """Test the clean_format option removes all separators"""
        text = "Call +1-800-555-1234 or (555) 123-4567"
        expected = ['18005551234', '5551234567']
        result = extract_phone_numbers(text, clean_format=True)
        self.assertEqual(len(result), 2)
        for num in expected:
            self.assertIn(num, result)

    def test_duplicate_removal(self):
        """Test that duplicate phone numbers are removed"""
        text = "Same number: 555-123-4567, 555-123-4567, and +1-800-555-1234, +1-800-555-1234"
        result = extract_phone_numbers(text)
        # Should only have 2 unique numbers
        self.assertEqual(len(result), 2)
        self.assertIn('555-123-4567', result)
        self.assertIn('+1-800-555-1234', result)
if __name__ == '__main__':
    unittest.main()