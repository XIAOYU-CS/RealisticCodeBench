import unittest
import sys
from io import StringIO


class TestGetColumnDetails(unittest.TestCase):

    def setUp(self):
        # Suppress print output during tests
        self.held, sys.stdout = sys.stdout, StringIO()

    def tearDown(self):
        sys.stdout = self.held

    def test_should_parse_basic_csv_with_no_quotes(self):
        csv = """Name,Age,City
Alice,25,New York
Bob,30,Los Angeles"""

        result = get_column_details(csv)

        self.assertEqual(len(result), 3)
        self.assertDictEqual({
            'columnName': 'Name',
            'dataType': 'string',
            'sampleValues': ['Alice', 'Bob'],
            'totalCount': 2,
            'emptyCount': 0,
            'nonEmptyCount': 2
        }, {k: result[0][k] for k in
            ['columnName', 'dataType', 'sampleValues', 'totalCount', 'emptyCount', 'nonEmptyCount']})

        self.assertDictEqual({
            'columnName': 'Age',
            'dataType': 'number',
            'sampleValues': ['25', '30'],
            'totalCount': 2,
            'emptyCount': 0,
            'nonEmptyCount': 2
        }, {k: result[1][k] for k in
            ['columnName', 'dataType', 'sampleValues', 'totalCount', 'emptyCount', 'nonEmptyCount']})

        self.assertEqual(result[2]['columnName'], 'City')
        self.assertEqual(result[2]['dataType'], 'string')

    def test_should_handle_quoted_fields_containing_commas(self):
        csv = '''Name,Title
"Alice, Jr.",Engineer
Bob,"Senior, Manager"'''

        result = get_column_details(csv)

        self.assertEqual(result[0]['sampleValues'], ['Alice, Jr.', 'Bob'])
        self.assertEqual(result[1]['sampleValues'], ['Engineer', 'Senior, Manager'])

    def test_should_infer_number_type_for_numeric_columns(self):
        csv = '''Id,Score
1,95.5
2,87
3,100'''

        result = get_column_details(csv)

        self.assertEqual(result[0]['dataType'], 'number')
        self.assertEqual(result[1]['dataType'], 'number')

    def test_should_infer_boolean_type_for_true_false_columns(self):
        csv = '''Name,Active,Verified
Alice,true,TRUE
Bob,false,FALSE'''

        result = get_column_details(csv)

        self.assertEqual(result[1]['dataType'], 'boolean')
        self.assertEqual(result[2]['dataType'], 'boolean')

    def test_should_mark_column_as_mixed_if_contains_both_numbers_and_strings(self):
        csv = '''Value
123
abc
456'''

        result = get_column_details(csv)

        self.assertEqual(result[0]['dataType'], 'mixed')

    def test_should_handle_empty_cells_and_count_them(self):
        csv = '''Name,Age
Alice,
,30
Bob,25'''

        result = get_column_details(csv)

        self.assertEqual(result[0]['columnName'], 'Name')
        self.assertEqual(result[0]['emptyCount'], 1)
        self.assertEqual(result[0]['nonEmptyCount'], 2)

        self.assertEqual(result[1]['columnName'], 'Age')
        self.assertEqual(result[1]['emptyCount'], 1)
        self.assertEqual(result[1]['nonEmptyCount'], 2)

    def test_should_handle_rows_with_fewer_columns(self):
        csv = '''A,B,C
1,2,3
4,5
6,7,8'''

        result = get_column_details(csv)

        self.assertEqual(len(result), 3)

        self.assertEqual(result[0]['sampleValues'], ['1', '4', '6'])
        self.assertEqual(result[1]['sampleValues'], ['2', '5', '7'])
        self.assertEqual(result[2]['sampleValues'], ['3', '8'])

        self.assertEqual(result[2]['emptyCount'], 1)

    def test_should_return_empty_array_for_empty_input(self):
        self.assertEqual(get_column_details(''), [])
        self.assertEqual(get_column_details('\n\n'), [])

    def test_should_handle_csv_with_only_header(self):
        csv = '''Name,Age'''

        result = get_column_details(csv)

        self.assertEqual(len(result), 2)
        expected = {
            'columnName': 'Name',
            'dataType': 'empty',
            'totalCount': 0,
            'emptyCount': 0,
            'nonEmptyCount': 0,
            'sampleValues': []
        }
        self.assertDictEqual(expected, {k: result[0][k] for k in expected.keys()})

    def test_should_trim_whitespace_from_fields(self):
        csv = ''' Name , " Age " 
  Alice  , "  25  " '''

        result = get_column_details(csv)

        self.assertEqual(result[0]['columnName'], 'Name')
        self.assertEqual(result[1]['columnName'], 'Age')
        self.assertEqual(result[0]['sampleValues'], ['Alice'])
        self.assertEqual(result[1]['sampleValues'], ['25'])