import unittest
class TestFindPlaceholders(unittest.TestCase):

    def test_basic_placeholders(self):
        text = "Hello {{ user.name }}, welcome to {{ site-url }} and {{ user_id }}!"
        expected = ['user.name', 'site-url', 'user_id']
        result = find_placeholders(text)
        self.assertEqual(result, expected)

    def test_return_full_format(self):
        text = "Hello {{ user.name }}, welcome to {{ site-url }}!"
        expected = ['{{ user.name }}', '{{ site-url }}']
        result = find_placeholders(text, return_full=True)
        self.assertEqual(result, expected)

    def test_unique_flag(self):
        text = "Hello {{ user }}, welcome {{ user }}! Your {{ role }} is {{ role }}."
        expected = ['user', 'role']
        result = find_placeholders(text, unique=True)
        self.assertEqual(result, expected)

    def test_allow_empty_placeholders(self):
        text = "Valid: {{ user }}, Empty: {{   }}, Also empty: {{}}"
        # Without allow_empty
        result1 = find_placeholders(text)
        self.assertEqual(result1, ['user'])

        # With allow_empty
        result2 = find_placeholders(text, allow_empty=True)
        self.assertEqual(result2, ['user', '', ''])

    def test_type_error_handling(self):
        with self.assertRaises(TypeError):
            find_placeholders(123)

        with self.assertRaises(TypeError):
            find_placeholders(None)

        with self.assertRaises(TypeError):
            find_placeholders(['not', 'a', 'string'])