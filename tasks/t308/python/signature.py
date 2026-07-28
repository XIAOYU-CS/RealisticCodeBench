def clean_query(
        query: str,
        whitespace_mode: str = "collapse",
        comment_rules: dict = None
) -> str:
    """
    Query minimization function supporting whitespace modes and custom comment rules

    Args:
        query: Original text to be processed
        whitespace_mode: Whitespace line processing mode, optional values: preserve/remove/collapse
        comment_rules: Comment rule dictionary, format:
            {
                "line_comment": ["#", "--"],  # Line comment markers (ignore from marker to end of line)
                "block_comment": [("/*", "*/")]  # Block comment marker pairs (start, end)
            }
            Defaults to {"line_comment": ["#"], "block_comment": []}
    Returns:
        after process str
    """