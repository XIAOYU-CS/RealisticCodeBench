import unittest
class TestSplitHtmlContent(unittest.TestCase):

    def test_basic_html_splitting(self):
        html = "<p>Hello</p>World<ul><li>Item1</li></ul>"
        result = split_html_content(html)
        expected = ["<p>Hello</p>", "World", "<ul><li>Item1</li></ul>"]
        self.assertEqual(result, expected)

    def test_custom_target_tags(self):
        html = "<div>Content</div><span>Text</span>End"
        result = split_html_content(html, target_tags=['div', 'span'])
        expected = ["<div>Content</div>", "<span>Text</span>", "End"]
        self.assertEqual(result, expected)

    def test_preserve_whitespace_mode(self):
        html = "  Start  <p>  Content  </p>  End  "
        result = split_html_content(html, preserve_whitespace=True)
        expected = ["  Start  ", "<p>  Content  </p>", "  End  "]
        self.assertEqual(result, expected)

    def test_strip_whitespace_mode(self):
        html = "  Start  <p>  Content  </p>  End  "
        result = split_html_content(html, preserve_whitespace=False)
        expected = ["Start", "<p>  Content  </p>", "End"]
        self.assertEqual(result, expected)

    def test_tags_with_attributes(self):
        html = 'Text<div class="container" id="main">Content</div>End'
        result = split_html_content(html, target_tags=['div'])
        expected = ["Text", '<div class="container" id="main">Content</div>', "End"]
        self.assertEqual(result, expected)

    def test_no_matching_tags(self):
        html = "Just plain text without any target tags"
        result = split_html_content(html, target_tags=['div', 'span'])
        expected = ["Just plain text without any target tags"]
        self.assertEqual(result, expected)