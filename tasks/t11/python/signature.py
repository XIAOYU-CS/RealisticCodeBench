from typing import List


def extract_phone_numbers(
    s: str,
    clean_format: bool = False,
    include_international: bool = True
) -> List[str]:
    """
    Extracts all matching phone numbers from a string, with optional cleaned formatting.

    Supported formats include:
    - International: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678
    - Domestic: 555-555-1234, 555 555 1234, 5555551234, (555) 555-1234
    - Mixed: (555)555 1234, 555.555.1234

    Args:
        s: Input string to search for phone numbers.
        clean_format: If True, remove all separators (default: False).
        include_international: If True, include international numbers (default: True).

    Returns:
        A list of unique matched phone numbers. Returns an empty list if none found.
    """