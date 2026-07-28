describe('cleanQuery', () => {
    test('basic line comment removal', () => {
        const query = `SELECT * FROM users

# This is a comment
WHERE id = 1`;
        const result = cleanQuery(query);
        const expected = `SELECT * FROM users

WHERE id = 1`;
        expect(result).toBe(expected);
    });

    test('collapse whitespace mode', () => {
        const query = `SELECT * FROM users

# Comment line

WHERE id = 1


AND name = 'John'`;
        const result = cleanQuery(query, "collapse");
        const expected = `SELECT * FROM users

WHERE id = 1

AND name = 'John'`;
        expect(result).toBe(expected);
    });

    test('custom comment rules', () => {
        const query = `SELECT * FROM users
-- This is a SQL comment
WHERE id = 1 /* inline comment */ AND status = 'active'
/* Multi-line
   comment */
ORDER BY name`;
        const comment_rules = {
            "line_comment": ["#", "--"],
            "block_comment": [["/*", "*/"]]
        };
        const result = cleanQuery(query, "collapse", comment_rules);
        const expected = `SELECT * FROM users

WHERE id = 1  AND status = 'active'

ORDER BY name`;
        expect(result).toBe(expected);
    });

    test('remove whitespace mode', () => {
        const query = `SELECT * FROM users


WHERE id = 1

AND name = 'John'


ORDER BY name`;
        const result = cleanQuery(query, "remove");
        const expected = `SELECT * FROM users
WHERE id = 1
AND name = 'John'
ORDER BY name`;
        expect(result).toBe(expected);
    });

    test('block comment spanning multiple lines', () => {
        const query = `SELECT id, name /* This is a
multi-line comment
that spans several lines */ FROM users
WHERE /* another comment */ id > 0`;
        const comment_rules = {
            "line_comment": ["#"],
            "block_comment": [["/*", "*/"]]
        };
        const result = cleanQuery(query, "collapse", comment_rules);
        const expected = `SELECT id, name

FROM users
WHERE  id > 0`;
        expect(result).toBe(expected);
    });
});