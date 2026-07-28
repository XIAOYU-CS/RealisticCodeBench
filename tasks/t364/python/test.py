import unittest


class TestEnhancedTextProcessor(unittest.TestCase):

    def test_basic_alnum_filtering(self):
        text = "Hello, World! 123"
        result = enhanced_text_processor(
            text=text,
            keep_alnum=True,
            case_transform="upper",
            replace_map=None
        )
        self.assertEqual(result, "HELLOWORLD123")

    def test_character_replacement(self):
        text = "Hello @World# 123"
        replace_map = {'@': 'at', '#': 'hash'}
        result = enhanced_text_processor(
            text=text,
            keep_alnum=True,
            case_transform="upper",
            replace_map=replace_map
        )
        self.assertEqual(result, "HELLOATWORLDHASH123")

    def test_case_transformation_lower(self):
        text = "Hello, World! 123"
        result = enhanced_text_processor(
            text=text,
            keep_alnum=True,
            case_transform="lower",
            replace_map=None
        )
        self.assertEqual(result, "helloworld123")

    def test_no_alnum_filtering(self):
        text = "Hello, World! 123"
        result = enhanced_text_processor(
            text=text,
            keep_alnum=False,
            case_transform="upper",
            replace_map=None
        )
        self.assertEqual(result, "HELLO, WORLD! 123")

    def test_complex_replacement_and_filtering(self):
        text = "Email: user@domain.com #123"
        replace_map = {'@': ' at ', '#': 'number '}
        result = enhanced_text_processor(
            text=text,
            keep_alnum=True,
            case_transform="upper",
            replace_map=replace_map
        )
        self.assertEqual(result, "EMAILUSERATDOMAINCOMNUMBER123")