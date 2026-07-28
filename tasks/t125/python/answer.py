from datetime import datetime
from typing import Optional, List


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
    # Default input formats
    default_formats = ['%a, %d %b %Y %H:%M:%S %z (%Z)']
    input_formats = input_formats or default_formats

    # Try to parse with all possible input formats
    for fmt in input_formats:
        try:
            date_obj = datetime.strptime(date_str, fmt)
            return date_obj.strftime(output_format)
        except ValueError:
            continue  # Try next format

    # All format parsing failed
    print(f"Unable to parse date string: {date_str}, attempted formats: {input_formats}")
    return None
