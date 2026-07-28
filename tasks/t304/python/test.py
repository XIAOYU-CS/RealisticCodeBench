import unittest
import re

class TestParseEmail(unittest.TestCase):
    def test_valid_standard_email(self):
        email = "user@example.com"
        result = parse_email(email)
        self.assertEqual(result, {
            "account": "user",
            "platform": "@example.com",
            "full_email": "user@example.com"
        })

    def test_valid_email_with_special_chars(self):
        email = "user.name+tag@sub.domain.co.uk"
        result = parse_email(email)
        self.assertEqual(result, {
            "account": "user.name+tag",
            "platform": "@sub.domain.co.uk",
            "full_email": "user.name+tag@sub.domain.co.uk"
        })

    def test_invalid_email_missing_at(self):
        email = "userexample.com"
        result = parse_email(email)
        self.assertIsNone(result)

    def test_invalid_email_no_domain(self):
        email = "user@"
        result = parse_email(email)
        self.assertIsNone(result)

    def test_non_string_input(self):
        self.assertIsNone(parse_email(12345))
        self.assertIsNone(parse_email(None))
        self.assertIsNone(parse_email(["email@example.com"]))