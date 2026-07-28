import unittest

class TestMinimizeQuery(unittest.TestCase):

    def test_basic_line_comment_removal(self):
        query = """SELECT * FROM users

# This is a comment
WHERE id = 1"""
        result = clean_query(query)
        expected = """SELECT * FROM users

WHERE id = 1"""
        self.assertEqual(result, expected)

    def test_collapse_whitespace_mode(self):
        query = """SELECT * FROM users

# Comment line

WHERE id = 1


AND name = 'John'"""
        result = clean_query(query, whitespace_mode="collapse")
        expected = """SELECT * FROM users

WHERE id = 1

AND name = 'John'"""
        self.assertEqual(result, expected)

    def test_custom_comment_rules(self):
        query = """SELECT * FROM users
-- This is a SQL comment
WHERE id = 1 /* inline comment */ AND status = 'active'
/* Multi-line
   comment */
ORDER BY name"""
        comment_rules = {
            "line_comment": ["#", "--"],
            "block_comment": [("/*", "*/")]
        }
        result = clean_query(query, comment_rules=comment_rules)
        expected = """SELECT * FROM users

WHERE id = 1  AND status = 'active'

ORDER BY name"""
        self.assertEqual(result, expected)

    def test_remove_whitespace_mode(self):
        query = """SELECT * FROM users


WHERE id = 1

AND name = 'John'


ORDER BY name"""
        result = clean_query(query, whitespace_mode="remove")
        expected = """SELECT * FROM users
WHERE id = 1
AND name = 'John'
ORDER BY name"""
        self.assertEqual(result, expected)

    def test_block_comment_spanning_multiple_lines(self):
        query = """SELECT id, name /* This is a
multi-line comment
that spans several lines */ FROM users
WHERE /* another comment */ id > 0"""
        comment_rules = {
            "line_comment": ["#"],
            "block_comment": [("/*", "*/")]
        }
        result = clean_query(query, comment_rules=comment_rules)
        expected = """SELECT id, name

FROM users
WHERE  id > 0"""
        self.assertEqual(result, expected)