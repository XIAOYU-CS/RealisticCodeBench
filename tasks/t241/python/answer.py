def thread_count_to_formatted_string(
        count,
        padding: int = 2,
        use_zero_pad: bool = False,  # Changed default to False
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
    # Input validation and conversion
    try:
        count = int(count)
        if count < 0:
            raise ValueError("Thread count cannot be negative")  # Fixed error message
    except (TypeError, ValueError) as e:
        raise ValueError(f"Invalid thread count: {count} (must be non-negative integer)") from e

    # Handle zero case
    if count == 0:
        return zero_str

    # Format numeric part
    if use_thousands_sep:
        # Thousands separator format
        num_str = f"{count:,}"
    else:
        num_str = str(count)
        if use_zero_pad:
            num_str = num_str.zfill(padding)  # Zero padding

    # Handle singular/plural forms
    thread_word = singular if count == 1 else plural

    return f"{num_str} {thread_word}"