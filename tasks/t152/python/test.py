import unittest
from unittest.mock import MagicMock


class TestGetCSSFromSheet(unittest.TestCase):
    def setUp(self):
        """Create a style element with some CSS rules for testing."""
        self.style_element = MagicMock()
        self.style_element.sheet = 'body { background-color: red; } p { color: blue; }'

    def tearDown(self):
        """Clean up after each test."""
        pass  # No need to clean up in the mock context

    def test_empty_stylesheet(self):
        """Empty Stylesheet: should return an empty string."""
        empty_style = MagicMock()
        empty_style.sheet = ''
        css_text = extract_css_from_stylesheet(empty_style.sheet)
        self.assertEqual(css_text, '')

    def test_invalid_input(self):
        """Invalid Input: should return an empty string for non-CSSStyleSheet input."""
        self.assertEqual(extract_css_from_stylesheet(None), '')
        self.assertEqual(extract_css_from_stylesheet({}), '')
        self.assertEqual(extract_css_from_stylesheet('not a stylesheet'), '')

    def test_cross_origin_restrictions(self):
        """Cross-Origin Restrictions: should handle restricted stylesheets gracefully."""
        restricted_sheet = MagicMock()
        restricted_sheet.sheet = None  # Simulating a restricted stylesheet

        # The function should not throw an error, we'll just check for the return value
        css_text = extract_css_from_stylesheet(restricted_sheet.sheet)
        self.assertEqual(css_text, '')

    def test_style_element_with_inline_css(self):
        """Style Element with Inline CSS: should return CSS from inline style element."""
        style_element = MagicMock()
        style_element.sheet = 'div { font-size: 16px; }'
        css_text = extract_css_from_stylesheet(style_element.sheet)
        self.assertEqual(css_text, 'div {font-size: 16px;}')

    def test_multiple_css_rules(self):
        """Multiple CSS Rules: should concatenate normalized rules."""
        css_text = extract_css_from_stylesheet(
            'body { background-color: red; } p { color: blue; }'
        )
        self.assertEqual(css_text, 'body {background-color: red;}p {color: blue;}')


if __name__ == '__main__':
    unittest.main()
