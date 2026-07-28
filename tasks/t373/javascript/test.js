describe('sqlWhereToPrefix', () => {
    test('simple comparison', () => {
        const whereClause = "age > 20";
        const expected = "> age 20";
        const result = sqlWhereToPrefix(whereClause);
        expect(result).toBe(expected);
    });

    test('AND logical operator', () => {
        const whereClause = "age > 20 AND name = 'Alice'";
        const expected = "AND > age 20 = name 'Alice'";
        const result = sqlWhereToPrefix(whereClause);
        expect(result).toBe(expected);
    });

    test('OR logical operator', () => {
        const whereClause = "age < 18 OR age > 65";
        const expected = "OR < age 18 > age 65";
        const result = sqlWhereToPrefix(whereClause);
        expect(result).toBe(expected);
    });

    test('NOT operator', () => {
        const whereClause = "NOT active = 1";
        const expected = "= NOT active 1";
        const result = sqlWhereToPrefix(whereClause);
        expect(result).toBe(expected);
    });

    test('IS NULL operator', () => {
        const whereClause = "name IS NULL";
        const expected = "IS name NULL";
        const result = sqlWhereToPrefix(whereClause);
        expect(result).toBe(expected);
    });

    test('empty WHERE clause', () => {
        const whereClause = "";
        const expected = "";
        const result = sqlWhereToPrefix(whereClause);
        expect(result).toBe(expected);
    });
});