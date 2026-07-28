def process_string_quotes(
        line: str,
        strip_outer: bool = True,
        escape_inner: bool = True,
        enclose_final: bool = True
) -> str:
    """
    Process quotes in a string with configurable behavior control

    Args:
        line: Input string to process
        strip_outer: Whether to remove outer quotes (including escaped ones)
        escape_inner: Whether to escape internal quotes
        enclose_final: Whether to wrap the final result with non-escaped quotes

    Returns:
        Processed string with configured quote handling
    """