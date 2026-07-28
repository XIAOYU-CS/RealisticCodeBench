import unittest


class TestExtractSldTld(unittest.TestCase):
    def test_standard_fqdn(self):
        self.assertEqual(extract_sld_tld("www.example.com"), ("example", "com"))

    def test_standard_fqdn2(self):
        self.assertEqual(extract_sld_tld("www.example.xyz"), ("example", "xyz"))

    def test_fqdn_with_subdomains(self):
        self.assertEqual(extract_sld_tld("blog.subdomain.example.com"), ("example", "com"))

    def test_numeric_tld(self):
        self.assertEqual(extract_sld_tld("server.example.123"), ("example", "123"))

    def test_single_label_domain_raises(self):
        with self.assertRaises(ValueError):
            extract_sld_tld("localhost")
