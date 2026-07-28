import unittest


class TestStrongPassword(unittest.TestCase):
    def test_valid_password(self):
        self.assertTrue(is_strong_password("StrongPass1"))

    def test_missing_lowercase(self):
        self.assertFalse(is_strong_password("STRONGPASS1"))

    def test_missing_uppercase(self):
        self.assertFalse(is_strong_password("strongpass1"))

    def test_missing_number(self):
        self.assertFalse(is_strong_password("StrongPassword"))

    def test_too_short(self):
        self.assertFalse(is_strong_password("Short1"))

    def test_valid_with_special_characters(self):
        self.assertTrue(is_strong_password("Strong!Password1"))