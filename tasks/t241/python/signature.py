def thread_count_to_formatted_string(
        count,
        padding: int = 2,
        use_zero_pad: bool = True,
        use_thousands_sep: bool = False,
        zero_str: str = "No Threads",
        singular: str = "Thread",
        plural: str = "Threads"
) -> str:
    """
    Format thread count into user-friendly string with customizable formatting and text

    Args:
        count: Thread count (will be converted to integer)
        padding: Minimum digits for zero-padding (only effective when use_zero_pad is True)
        use_zero_pad: Whether to pad numbers with zeros
        use_thousands_sep: Whether to use thousands separator (like 1,000)
        zero_str: Text to display when thread count is 0
        singular: Singular noun when thread count is 1
        plural: Plural noun when thread count is greater than 1

    Returns:
        str: Formatted thread count string

    Raises:
        ValueError: Raised when count cannot be converted to non-negative integer
    """