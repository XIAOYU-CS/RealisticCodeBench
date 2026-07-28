def sql_where_to_prefix(where_clause:str):
    """Convert SQL WHERE clause infix expression to prefix expression

    Uses a modified Shunting-yard algorithm variant by reversing input and output
    to achieve infix to prefix conversion.

    Args:
        where_clause (str): SQL WHERE clause string, e.g. "age > 20 AND name = 'Alice'"

    Returns:
        str: Prefix expression string, e.g. "AND > age 20 = name 'Alice'"
    """