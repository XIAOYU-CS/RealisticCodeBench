import unittest


class TestIsValidPortNumber(unittest.TestCase):

    def test_valid_port_number_middle(self):
        self.assertTrue(is_valid_port_number(8080))

    def test_lowest_valid_port_number(self):
        self.assertTrue(is_valid_port_number(1))

    def test_highest_valid_port_number(self):
        self.assertTrue(is_valid_port_number(65535))

    def test_below_valid_range(self):
        self.assertFalse(is_valid_port_number(0))

    def test_above_valid_range(self):
        self.assertFalse(is_valid_port_number(65536))
