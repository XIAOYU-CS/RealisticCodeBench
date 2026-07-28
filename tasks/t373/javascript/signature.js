/**
 * Convert SQL WHERE clause infix expression to prefix expression
 *
 * Uses a modified Shunting-yard algorithm variant by reversing input and output
 * to achieve infix to prefix conversion.
 *
 * @param {string} whereClause - SQL WHERE clause string, e.g. "age > 20 AND name = 'Alice'"
 * @returns {string} Prefix expression string, e.g. "AND > age 20 = name 'Alice'"
 */
function sqlWhereToPrefix(whereClause) {}