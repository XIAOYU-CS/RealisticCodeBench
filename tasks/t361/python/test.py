import unittest
import re


class TestParseDynamicId(unittest.TestCase):
    def test_extract_dynamic_value_with_default_prefix_and_suffix(self):
        result = parse_dynamic_id('{userId}_profile_page')
        expected = {'custom_id': 'profile_page', 'dynamic_value': 'userId'}
        self.assertEqual(result, expected)

    def test_work_with_custom_prefix_and_suffix(self):
        result = parse_dynamic_id('[productId]_details_view', False, {'prefix': '[', 'suffix': ']_'})
        expected = {'custom_id': 'details_view', 'dynamic_value': 'productId'}
        self.assertEqual(result, expected)

    def test_return_full_value_when_no_dynamic_value_found(self):
        result = parse_dynamic_id('static_page_name')
        expected = {'custom_id': 'static_page_name'}
        self.assertEqual(result, expected)

    def test_work_with_custom_regex(self):
        custom_regex = re.compile(r'#(.+?)#')
        result = parse_dynamic_id('#sessionId#dashboard', False, {'regex': custom_regex})
        expected = {'custom_id': 'dashboard', 'dynamic_value': 'sessionId'}
        self.assertEqual(result, expected)

    def test_include_dynamic_value_when_required_even_if_not_found(self):
        result = parse_dynamic_id('static_content', True)
        expected = {'custom_id': 'static_content', 'dynamic_value': None}
        self.assertEqual(result, expected)