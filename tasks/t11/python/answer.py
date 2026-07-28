import re
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

    # Domestic phone number pattern (US-style)
    domestic_pattern = r"(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}"

    if include_international:
        # International phone number pattern
        # Matches +[1-3 digits][optional separator][domestic format or 12-digit format]
        international_pattern = r"\+\d{1,3}[-.\s]?(?:\d{1,4}[-.\s]?){1,4}\d{1,4}"
        # Combine both patterns
        pattern = f"({international_pattern})|({domestic_pattern})"
    else:
        pattern = domestic_pattern

    # Find all matches
    matches = re.findall(pattern, s)

    # Flatten matches (because of groups, findall returns tuples)
    phone_numbers = []
    for match in matches:
        # Match is a tuple when there are groups; extract non-empty string
        if isinstance(match, tuple):
            number = next((m for m in match if m), "")
        else:
            number = match
        if number:
            phone_numbers.append(number)

    # Remove duplicates
    unique_numbers = list(set(phone_numbers))

    # Clean format if requested (remove all separators)
    if clean_format:
        return [re.sub(r"[-. ()+]", "", num) for num in unique_numbers]

    return unique_numbers