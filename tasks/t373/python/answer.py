import re
import unittest


def tokenize_where_clause(where_clause):
    """将WHERE子句分词为标记列表"""
    # 修复正则表达式，确保每个分支互斥且顺序正确
    pattern = r"""
        (\bAND\b)                   # 逻辑运算符
        |(\bOR\b)                   
        |(\bNOT\b)                  
        |(=|<>|!=|<=|>=|<|>)        # 比较运算符
        |(\bIN\b)                   
        |(\bLIKE\b)                 
        |(\bBETWEEN\b)              
        |(\bIS\b)                   
        |(\()                       # 左括号
        |(\))                       # 右括号
        |(,)                        # 逗号
        |('[^']*')                  # 单引号字符串
        |(\bNULL\b)                 # NULL关键字
        |([a-zA-Z_][a-zA-Z0-9_.]*)  # 标识符(列名、表名等)
        |(\d+\.?\d*)                # 数字(整数和小数)
    """
    tokens = re.findall(pattern, where_clause, re.VERBOSE | re.IGNORECASE)

    result = []
    for groups in tokens:
        # 修复：确保至少有一个匹配项
        matched_token = None
        for t in groups:
            if t:
                matched_token = t
                break

        if matched_token:
            # 关键字转为大写，其他保持原样
            upper_token = matched_token.upper()
            if upper_token in ['AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN', 'IS', 'NULL']:
                result.append(upper_token)
            else:
                result.append(matched_token)
    return result


def sql_where_to_prefix(where_clause):
    """Convert SQL WHERE clause infix expression to prefix expression

    Uses a modified Shunting-yard algorithm variant by reversing input and output
    to achieve infix to prefix conversion.

    Args:
        where_clause (str): SQL WHERE clause string, e.g. "age > 20 AND name = 'Alice'"

    Returns:
        str: Prefix expression string, e.g. "AND > age 20 = name 'Alice'"
    """
    # Define operator precedence, higher number means higher precedence
    # NOT as unary operator has the highest precedence
    precedence = {
        'NOT': 5,  # Unary NOT operator
        'IS': 4,  # IS operator
        'IN': 3,  # IN operator
        'LIKE': 3,  # LIKE operator
        'BETWEEN': 3,  # BETWEEN operator
        '=': 2,  # Equality comparison
        '<>': 2,  # Inequality comparison
        '!=': 2,  # Inequality comparison
        '<': 2,  # Less than comparison
        '>': 2,  # Greater than comparison
        '<=': 2,  # Less than or equal comparison
        '>=': 2,  # Greater than or equal comparison
        'AND': 1,  # Logical AND
        'OR': 0  # Logical OR
    }

    # Tokenize the WHERE clause
    tokens = tokenize_where_clause(where_clause)
    if not tokens:
        return ""

    # Reverse tokens and swap parentheses to prepare for prefix conversion
    # This is the key step for infix to prefix: reverse input to simulate prefix conversion
    reversed_tokens = []
    for token in reversed(tokens):
        if token == '(':
            reversed_tokens.append(')')  # Left parenthesis becomes right parenthesis
        elif token == ')':
            reversed_tokens.append('(')  # Right parenthesis becomes left parenthesis
        else:
            reversed_tokens.append(token)

    # Initialize output queue and operator stack
    output = []  # Store final prefix expression elements
    stack = []  # Operator stack for handling precedence

    # Scan reversed tokens from left to right
    i = 0
    while i < len(reversed_tokens):
        token = reversed_tokens[i]

        # Handle operands (identifiers, strings, numbers, etc.)
        # If token is not an operator, not a parenthesis, and not a comma, it's an operand
        if token not in precedence and token not in '(),':
            output.append(token)
            i += 1

        # Handle right parenthesis (left parenthesis in original expression)
        # Right parenthesis is pushed to stack and waits for matching left parenthesis
        elif token == ')':
            stack.append(token)
            i += 1

        # Handle left parenthesis (right parenthesis in original expression)
        # Pop elements from stack until matching right parenthesis is found
        elif token == '(':
            while stack and stack[-1] != ')':
                output.append(stack.pop())
            if stack:
                stack.pop()  # Remove the matching right parenthesis
            i += 1

        # Handle comma (mainly used for IN lists and other scenarios)
        # Comma is usually ignored in prefix expressions
        elif token == ',':
            i += 1

        # Handle operators
        else:
            # Pop operators from stack based on precedence
            # Current operator has lower or equal precedence than stack top
            while (stack and stack[-1] != ')' and
                   stack[-1] in precedence and
                   precedence[stack[-1]] > precedence.get(token, -1)):
                output.append(stack.pop())
            stack.append(token)
            i += 1

    # Pop remaining operators from stack
    while stack:
        if stack[-1] not in '()':
            output.append(stack.pop())
        else:
            stack.pop()  # Ignore parentheses

    # Reverse the output to get final prefix expression
    return ' '.join(output[::-1])