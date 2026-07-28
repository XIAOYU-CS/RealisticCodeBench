import unittest


class TestCheckEmail(unittest.TestCase):

    def test_basic_email_detection(self):
        # Test with valid emails
        self.assertTrue(check_email("Contact us at support@example.com"))
        self.assertTrue(check_email("Send email to user@domain.org"))

        # Test without emails
        self.assertFalse(check_email("No emails here!"))
        self.assertFalse(check_email(""))

    def test_return_matches_functionality(self):
        text = "Emails: support@example.com and admin@site.org"
        expected = ['support@example.com', 'admin@site.org']
        result = check_email(text, return_matches=True)
        self.assertEqual(result, expected)

        # Test with no matches
        result_empty = check_email("No emails here!", return_matches=True)
        self.assertEqual(result_empty, [])

    def test_unique_flag_deduplication(self):
        text = "Email user@example.com, then user@example.com again, and admin@site.org, user@example.com"
        expected = ['user@example.com', 'admin@site.org']
        result = check_email(text, return_matches=True, unique=True)
        self.assertEqual(result, expected)

    def test_strict_mode_handling(self):
        text_with_ip = "Email: user@192.168.1.1"

        # Strict mode should reject IP as domain
        self.assertFalse(check_email(text_with_ip, strict=True))

        # Non-strict mode should accept IP as domain
        self.assertTrue(check_email(text_with_ip, strict=False))

    def test_ignore_html_functionality(self):
        text = "Normal: user@example.com <a href='mailto:admin@site.org'>admin@site.org</a>"

        # Without ignore_html, should find both emails
        result_all = check_email(text, return_matches=True)
        self.assertIn('user@example.com', result_all)
        self.assertIn('admin@site.org', result_all)

    def test_type_error_handling(self):
        with self.assertRaises(Exception):
            check_email(123)

        with self.assertRaises(Exception):
            check_email(None)

        with self.assertRaises(Exception):
            check_email(['not', 'a', 'string'])