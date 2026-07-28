import json
import os
import unittest


class TestConcatenateJsonArrays(unittest.TestCase):

    def setUp(self):
        self.test_dir = 'test_json'
        os.makedirs(self.test_dir, exist_ok=True)
        self.create_test_file('array1.json', [1, 2, 3])
        self.create_test_file('array2.json', ['a', 'b', 'c'])
        self.create_test_file('not_array.json', {'key': 'value'})
        self.create_test_file('empty.json', [])
        self.create_test_file('non_json.txt', "This is not a JSON file.")

    def tearDown(self):
        for filename in os.listdir(self.test_dir):
            os.remove(os.path.join(self.test_dir, filename))
        os.rmdir(self.test_dir)

    def create_test_file(self, filename, content):
        with open(os.path.join(self.test_dir, filename), 'w') as f:
            json.dump(content, f)

    def test_concatenate_valid_json_arrays(self):
        result = concatenate_json_arrays(self.test_dir)
        self.assertCountEqual(result, [1, 2, 3, 'a', 'b', 'c'])

    def test_ignore_non_array_json(self):
        result = concatenate_json_arrays(self.test_dir)
        self.assertNotIn('key', result)

    def test_ignore_non_json_files(self):
        result = concatenate_json_arrays(self.test_dir)
        self.assertNotIn("This is not a JSON file.", result)

    def test_handle_empty_arrays(self):
        result = concatenate_json_arrays(self.test_dir)
        self.assertNotIn([], result)

    def test_empty_directory(self):
        empty_dir = 'empty_test_json'
        os.makedirs(empty_dir, exist_ok=True)
        result = concatenate_json_arrays(empty_dir)
        self.assertEqual(result, [])
        os.rmdir(empty_dir)
