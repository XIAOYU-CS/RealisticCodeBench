import unittest

class TestIsCompliantIP(unittest.TestCase):
    def test_private_ip(self):
        # Test that private IPs return True
        self.assertTrue(is_compliant_ip('192.168.1.1'))

    def test_public_ip(self):
        # Test that public IPs return False
        self.assertFalse(is_compliant_ip('8.8.8.8'))

    def test_invalid_ip(self):
        self.assertFalse(is_compliant_ip('999.999.999.999'))

    def test_10_network_private_ips(self):
        self.assertTrue(is_compliant_ip('10.0.0.1'))
        self.assertTrue(is_compliant_ip('10.255.255.254'))

    def test_172_16_to_172_31_private_ips(self):
        self.assertTrue(is_compliant_ip('172.16.0.1'))
        self.assertTrue(is_compliant_ip('172.31.255.255'))
        self.assertFalse(is_compliant_ip('172.15.255.255'))
        self.assertFalse(is_compliant_ip('172.32.0.0'))

    def test_special_non_compliant_ips(self):
        self.assertFalse(is_compliant_ip('127.0.0.1'))
        self.assertFalse(is_compliant_ip('169.254.1.1'))
        self.assertFalse(is_compliant_ip('0.0.0.0'))
        self.assertFalse(is_compliant_ip('224.0.0.1'))

    def test_malformed_ip_strings(self):
        self.assertFalse(is_compliant_ip('192.168.1'))
        self.assertFalse(is_compliant_ip('192.168.1.1.1'))
        self.assertFalse(is_compliant_ip('192.168.-1.1'))
        self.assertFalse(is_compliant_ip('192.168.01.1'))
        self.assertFalse(is_compliant_ip(''))
        self.assertFalse(is_compliant_ip('192.168.1.'))
        self.assertFalse(is_compliant_ip('abc.def.ghi.jkl'))
