import unittest


class TestTransformDictListsToListDicts(unittest.TestCase):

    def test_basic_transformation(self):
        input_dict = {
            'name': ['Alice', 'Bob', 'Charlie'],
            'age': [25, 30, 35],
            'city': ['New York', 'London', 'Tokyo']
        }
        expected = [
            {'name': 'Alice', 'age': 25, 'city': 'New York'},
            {'name': 'Bob', 'age': 30, 'city': 'London'},
            {'name': 'Charlie', 'age': 35, 'city': 'Tokyo'}
        ]
        result = transform_dict_lists_to_list_dicts(input_dict)
        self.assertEqual(result, expected)

    def test_empty_dictionary(self):
        input_dict = {}
        expected = []
        result = transform_dict_lists_to_list_dicts(input_dict)
        self.assertEqual(result, expected)

    def test_single_key_dictionary(self):
        input_dict = {'scores': [90, 85, 92, 88]}
        expected = [
            {'scores': 90},
            {'scores': 85},
            {'scores': 92},
            {'scores': 88}
        ]
        result = transform_dict_lists_to_list_dicts(input_dict)
        self.assertEqual(result, expected)

    def test_different_length_lists_raises_value_error(self):
        input_dict = {
            'a': [1, 2, 3],
            'b': [4, 5]
        }
        with self.assertRaises(ValueError) as context:
            transform_dict_lists_to_list_dicts(input_dict)

        self.assertIn("All lists in the dictionary must have the same length", str(context.exception))

    def test_empty_lists_handling(self):
        input_dict = {
            'x': [],
            'y': [],
            'z': []
        }
        expected = []
        result = transform_dict_lists_to_list_dicts(input_dict)
        self.assertEqual(result, expected)