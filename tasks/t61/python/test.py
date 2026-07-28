import unittest


class TestMoveEmojisToEnd(unittest.TestCase):

    def test_no_emojis(self):
        input_text = "This is a test."
        expected_output = "This is a test."
        self.assertEqual(shift_emojis_to_text_end(input_text), expected_output)

    def test_all_emojis(self):
        input_text = "😀😃😄😁"
        expected_output = "😀😃😄😁"
        self.assertEqual(shift_emojis_to_text_end(input_text), expected_output)

    def test_emojis_at_start(self):
        input_text = "😀😃Hello world!"
        expected_output = "Hello world!😀😃"
        self.assertEqual(shift_emojis_to_text_end(input_text), expected_output)

    def test_emojis_at_end(self):
        input_text = "Hello world!😀😃"
        expected_output = "Hello world!😀😃"
        self.assertEqual(shift_emojis_to_text_end(input_text), expected_output)

    def test_emojis_in_middle(self):
        input_text = "Hello 😀world😃!"
        expected_output = "Hello world!😀😃"
        self.assertEqual(shift_emojis_to_text_end(input_text), expected_output)

    def test_mixed_characters(self):
        input_text = "Hi! 😀 How are you? 😃"
        expected_output = "Hi!  How are you? 😀😃"
        self.assertEqual(shift_emojis_to_text_end(input_text), expected_output)
