import unittest


class TestSortDictsByFields(unittest.TestCase):

    def setUp(self):
        self.test_data = [
            {'name': 'Alice', 'age': 30, 'salary': 50000},
            {'name': 'Bob', 'age': 25, 'salary': 60000},
            {'name': 'Charlie', 'age': 35, 'salary': 45000},
            {'name': 'David', 'age': 30, 'salary': 55000},
            {'name': 'Eve', 'age': 28}
        ]

    def test_sort_single_field_ascending(self):
        result = sort_dicts_by_fields(
            self.test_data,
            [('age', True)],
            missing_strategy='default',
            default_value=0
        )
        ages = [item['age'] for item in result]
        self.assertEqual(ages, [25, 28, 30, 30, 35])
        eve_record = next(item for item in result if item['name'] == 'Eve')
        self.assertEqual(eve_record['age'], 28)

    def test_sort_single_field_descending(self):
        result = sort_dicts_by_fields(
            [{'name': 'A', 'salary': 100}, {'name': 'B', 'salary': 200}, {'name': 'C'}],
            [('salary', False)],
            missing_strategy='default',
            default_value=0
        )
        names = [item['name'] for item in result]
        self.assertEqual(names, ['B', 'A', 'C'])

    def test_sort_multiple_fields(self):
        result = sort_dicts_by_fields(
            self.test_data,
            [('age', True)],
            missing_strategy='default',
            default_value=0
        )
        names_in_order = [item['name'] for item in result]
        self.assertEqual(names_in_order, ['Bob', 'Eve', 'Alice', 'David', 'Charlie'])

    def test_missing_strategy_first(self):
        result = sort_dicts_by_fields(
            self.test_data,
            [('salary', True)],
            missing_strategy='first'
        )
        self.assertEqual(result[0]['name'], 'Eve')

    def test_missing_strategy_last(self):
        result = sort_dicts_by_fields(
            self.test_data,
            [('salary', True)],
            missing_strategy='last'
        )
        self.assertEqual(result[-1]['name'], 'Eve')

    def test_empty_list(self):
        result = sort_dicts_by_fields(
            [],
            [('age', True)],
            missing_strategy='default'
        )
        self.assertEqual(result, [])

    def test_string_fields_ascending(self):
        result = sort_dicts_by_fields(
            self.test_data,
            [('name', True)],
            missing_strategy='default'
        )
        names = [item['name'] for item in result]
        self.assertEqual(names, sorted(['Alice', 'Bob', 'Charlie', 'David', 'Eve']))
