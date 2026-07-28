import unittest


class TestObj:
    def __init__(self, name, **kwargs):
        self.name = name
        for key, value in kwargs.items():
            setattr(self, key, value)


class TestAllEqualAttr(unittest.TestCase):

    def test_empty_list(self):
        result = check_all_same_attribute([], 'value')
        self.assertTrue(result)

    def test_all_same_values(self):
        obj1 = TestObj("obj1", value=10)
        obj2 = TestObj("obj2", value=10)
        obj3 = TestObj("obj3", value=10)
        result = check_all_same_attribute([obj1, obj2, obj3], 'value')
        self.assertTrue(result)

    def test_different_values(self):
        obj1 = TestObj("obj1", value=10)
        obj2 = TestObj("obj2", value=20)
        obj3 = TestObj("obj3", value=10)
        result = check_all_same_attribute([obj1, obj2, obj3], 'value')
        self.assertFalse(result)

    def test_missing_attribute_with_default(self):
        obj1 = TestObj("obj1", value=5)
        obj2 = TestObj("obj2")  # missing 'value' attribute
        obj3 = TestObj("obj3", value=5)
        result = check_all_same_attribute([obj1, obj2, obj3], 'value', default=5)
        self.assertTrue(result)

    def test_custom_comparator(self):
        obj1 = TestObj("obj1", value=10)
        obj2 = TestObj("obj2", value=12)
        obj3 = TestObj("obj3", value=8)
        def within_range(a, b):
            return abs(a - b) <= 5 if a is not None and b is not None else a == b

        result = check_all_same_attribute([obj1, obj2, obj3], 'value', comparator=within_range)
        self.assertTrue(result)