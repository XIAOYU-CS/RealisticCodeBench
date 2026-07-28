import unittest


class TestDeepMergeObjects(unittest.TestCase):

    def test_handles_null_values_in_obj2(self):
        obj1 = {'a': 1, 'b': 2}
        obj2 = None
        result = recursive_object_merge(obj1, obj2)
        self.assertEqual(result, obj1)  # Should return obj1

    def test_empty_obj1_preserves_obj2_values(self):
        obj1 = {}
        obj2 = {'a': 1, 'b': {'c': 2}}
        result = recursive_object_merge(obj1, obj2)
        self.assertEqual(result, obj2)

    def test_merges_deeply_nested_objects(self):
        obj1 = {'a': {'b': {'c': 1}}, 'd': 2}
        obj2 = {'a': {'b': {'d': 3}}, 'e': 4}
        result = recursive_object_merge(obj1, obj2)
        self.assertEqual(result, {
            'a': {
                'b': {
                    'c': 1,
                    'd': 3
                }
            },
            'd': 2,
            'e': 4
        })

    def test_uses_obj1_values_when_property_types_conflict(self):
        obj1 = {'a': 1, 'b': None, 'c': {'nested': True}}
        obj2 = {'a': {'old': True}, 'b': {'old': True}, 'c': 3, 'd': 4}
        result = recursive_object_merge(obj1, obj2)
        self.assertEqual(result, {'a': 1, 'b': None, 'c': {'nested': True}, 'd': 4})

    def test_does_not_merge_arrays_but_takes_them_from_obj1(self):
        obj1 = {'a': [1, 2, 3]}
        obj2 = {'a': [4, 5]}
        result = recursive_object_merge(obj1, obj2)
        self.assertEqual(result, {'a': [1, 2, 3]})  # Should keep array from obj1
