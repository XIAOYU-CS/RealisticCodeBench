from typing import List, Optional


def reformat_date_string(
    date_str: str,
    input_formats: List[str] = None,
    output_format: str = '%Y-%m-%d_%H:%M:%S'
) -> Optional[str]:
    """
    Format date string with support for multiple input formats and custom output format.

    Args:
        date_str: Input date string to be formatted
        input_formats: List of possible input formats, defaults to predefined formats
        output_format: Output date string format, defaults to '%Y-%m-%d_%H:%M:%S'

    Returns:
        Formatted date string; returns None and prints error if parsing fails
    """