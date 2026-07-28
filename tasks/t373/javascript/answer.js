/**
 * Tokenize SQL WHERE clause into a list of tokens
 * @param {string} whereClause - SQL WHERE clause string
 * @returns {Array<string>} List of tokens
 */
function tokenizeWhereClause(whereClause) {
    const pattern = new RegExp([
        "(\\bAND\\b)",                // Logical operators
        "(\\bOR\\b)",
        "(\\bNOT\\b)",
        "(=|<>|!=|<=|>=|<|>)",       // Comparison operators
        "(\\bIN\\b)",
        "(\\bLIKE\\b)",
        "(\\bBETWEEN\\b)",
        "(\\bIS\\b)",
        "(\\()",                      // Left parenthesis
        "(\\))",                      // Right parenthesis
        "(,)",                        // Comma
        "('[^']*')",                  // Single quoted strings
        "(\\bNULL\\b)",               // NULL keyword
        "([a-zA-Z_][a-zA-Z0-9_.]*)", // Identifiers (column names, table names, etc.)
        "(\\d+\\.?\\d*)"              // Numbers (integers and decimals)
    ].join("|"), "gi");

    const matches = [...whereClause.matchAll(pattern)];
    const result = [];

    for (const match of matches) {
        let matchedToken = null;
        for (let i = 1; i < match.length; i++) {
            if (match[i]) {
                matchedToken = match[i];
                break;
            }
        }

        if (matchedToken) {
            const upperToken = matchedToken.toUpperCase();
            if (['AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN', 'IS', 'NULL'].includes(upperToken)) {
                result.push(upperToken);
            } else {
                result.push(matchedToken);
            }
        }
    }

    return result;
}

/**
 * Convert SQL WHERE clause infix expression to prefix expression
 *
 * Uses a modified Shunting-yard algorithm variant by reversing input and output
 * to achieve infix to prefix conversion.
 *
 * @param {string} whereClause - SQL WHERE clause string, e.g. "age > 20 AND name = 'Alice'"
 * @returns {string} Prefix expression string, e.g. "AND > age 20 = name 'Alice'"
 */
function sqlWhereToPrefix(whereClause) {
    // Define operator precedence, higher number means higher precedence
    // NOT as unary operator has the highest precedence
    const precedence = {
        'NOT': 5,  // Unary NOT operator
        'IS': 4,   // IS operator
        'IN': 3,   // IN operator
        'LIKE': 3, // LIKE operator
        'BETWEEN': 3, // BETWEEN operator
        '=': 2,    // Equality comparison
        '<>': 2,   // Inequality comparison
        '!=': 2,   // Inequality comparison
        '<': 2,    // Less than comparison
        '>': 2,    // Greater than comparison
        '<=': 2,   // Less than or equal comparison
        '>=': 2,   // Greater than or equal comparison
        'AND': 1,  // Logical AND
        'OR': 0    // Logical OR
    };

    // Tokenize the WHERE clause
    const tokens = tokenizeWhereClause(whereClause);
    if (!tokens.length) return "";

    const reversedTokens = tokens.reverse().map(token => {
        if (token === '(') return ')';
        if (token === ')') return '(';
        return token;
    });

    const output = [];  // Store final prefix expression elements
    const stack = [];   // Operator stack for handling precedence

    for (let i = 0; i < reversedTokens.length; i++) {
        const token = reversedTokens[i];

        if (!(token in precedence) && token !== '(' && token !== ')' && token !== ',') {
            output.push(token);
        }
        else if (token === ')') {
            stack.push(token);
        }
        else if (token === '(') {
            while (stack.length && stack[stack.length - 1] !== ')') {
                output.push(stack.pop());
            }
            if (stack.length) {
                stack.pop();
            }
        }
        else if (token === ',') {
            continue;
        }
        else {
            while (
                stack.length &&
                stack[stack.length - 1] !== ')' &&
                stack[stack.length - 1] in precedence &&
                precedence[stack[stack.length - 1]] > precedence[token]
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }
    while (stack.length) {
        const op = stack.pop();
        if (op !== '(' && op !== ')') {
            output.push(op);
        }
    }
    return output.reverse().join(' ');
}