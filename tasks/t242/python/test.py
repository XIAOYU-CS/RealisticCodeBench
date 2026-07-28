import unittest


class TestHideBankAccount(unittest.TestCase):
    def test_should_return_hidden_part_for_valid_account(self):
        self.assertEqual(mask_bank_account_number('12345678901234567'), '****4567')

    def test_should_return_hidden_part_for_another_valid_account(self):
        self.assertEqual(mask_bank_account_number('98765432109876543'), '****6543')

    def test_should_return_hidden_part_for_yet_another_valid_account(self):
        self.assertEqual(mask_bank_account_number('11111111111111100'), '****1100')

    def test_should_throw_error_for_shorter_account(self):
        with self.assertRaises(Exception):
            mask_bank_account_number('1234567890123456')

    def test_should_throw_error_for_longer_account(self):
        with self.assertRaises(Exception):
            mask_bank_account_number('123456789012345678')

    def test_should_throw_error_for_empty_account(self):
        with self.assertRaises(Exception):
            mask_bank_account_number('')
