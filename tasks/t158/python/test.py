import re
import unittest


class TestGenerateUUID(unittest.TestCase):

    def test_should_return_a_string(self):
        result = create_36_char_uuid()
        self.assertIsInstance(result, str)

    def test_should_return_a_string_of_length_36(self):
        result = create_36_char_uuid()
        self.assertEqual(len(result), 36)

    def test_should_generate_different_UUIDs_on_consecutive_calls(self):
        uuid1 = create_36_char_uuid()
        uuid2 = create_36_char_uuid()
        self.assertNotEqual(uuid1, uuid2)

    def test_should_create_36_char_uuids_that_include_uppercase(self):
        result = create_36_char_uuid()
        self.assertTrue(re.search(r'[A-Z]', result) is not None)

    def test_should_create_36_char_uuids_that_include_lowercase(self):
        result = create_36_char_uuid()
        self.assertTrue(re.search(r'[a-z]', result) is not None)

    def test_should_create_36_char_uuids_that_include_digits(self):
        result = create_36_char_uuid()
        self.assertTrue(re.search(r'[0-9]', result) is not None)
