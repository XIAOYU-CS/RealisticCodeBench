import unittest
class TestSQLWhereToPrefix(unittest.TestCase):

    def test_simple_comparison(self):
        where_clause = "age > 20"
        expected = "> age 20"
        result = sql_where_to_prefix(where_clause)
        self.assertEqual(result, expected)

    def test_and_logical_operator(self):
        where_clause = "age > 20 AND name = 'Alice'"
        expected = "AND > age 20 = name 'Alice'"
        result = sql_where_to_prefix(where_clause)
        self.assertEqual(result, expected)

    def test_or_logical_operator(self):
        where_clause = "age < 18 OR age > 65"
        expected = "OR < age 18 > age 65"
        result = sql_where_to_prefix(where_clause)
        self.assertEqual(result, expected)

    def test_not_operator(self):
        where_clause = "NOT active = 1"
        expected = "= NOT active 1"
        result = sql_where_to_prefix(where_clause)
        self.assertEqual(result, expected)

    def test_is_null_operator(self):
        where_clause = "name IS NULL"
        expected = "IS name NULL"
        result = sql_where_to_prefix(where_clause)
        self.assertEqual(result, expected)