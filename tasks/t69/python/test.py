import unittest
class TestCheckMethodArgTypes(unittest.TestCase):

    def test_correct_types_pass_validation(self):
        def sample_method(a: int, b: str, c: float):
            pass

        try:
            check_method_arg_types(sample_method, 1, "hello", 3.14)
        except ValueError:
            self.fail("check_method_arg_types raised ValueError unexpectedly!")

    def test_incorrect_type_raises_value_error(self):
        def sample_method(a: int, b: str):
            pass

        with self.assertRaises(Exception) as context:
            check_method_arg_types(sample_method, "not_an_int", "hello")

    def test_exclude_parameter_skips_type_check(self):

        def sample_method(a: int, b: str):
            pass

        with self.assertRaises(Exception):
            check_method_arg_types(sample_method, "not_an_int", "hello")
        try:
            check_method_arg_types(sample_method, "not_an_int", "hello", exclude=['a'])
        except ValueError:
            self.fail("check_method_arg_types raised ValueError unexpectedly with exclude!")

    def test_default_parameters_handled_correctly(self):
        def sample_method(a: int, b: str = "default", c: float = 1.0):
            pass
        try:
            check_method_arg_types(sample_method, 42)
        except ValueError:
            self.fail("check_method_arg_types failed with default parameters!")
        with self.assertRaises(Exception) as context:
            check_method_arg_types(sample_method, "not_int")

    def test_exclude_list_is_not_mutated(self):
        def sample_method(a: int, b: str):
            pass

        exclude = ['a']
        check_method_arg_types(sample_method, "not_an_int", "hello", exclude=exclude)
        self.assertEqual(exclude, ['a'])
