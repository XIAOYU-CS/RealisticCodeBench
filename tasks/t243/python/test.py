import unittest


class TestFormatPostCount(unittest.TestCase):

    def test_return_one_post(self):
        self.assertEqual(format_post_count(1), "01 Post")

    def test_return_two_posts(self):
        self.assertEqual(format_post_count(2), "02 Posts")

    def test_return_ten_posts(self):
        self.assertEqual(format_post_count(10), "10 Posts")

    def test_return_ninety_nine_posts(self):
        self.assertEqual(format_post_count(99), "99 Posts")

    def test_return_five_posts(self):
        self.assertEqual(format_post_count(5), "05 Posts")
