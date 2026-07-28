import re
import unittest
from typing import Union, List


def check_email(
    text: str,
    return_matches: bool = False,
    unique: bool = False,
    strict: bool = True,
    ignore_html: bool = False
) -> Union[bool, List[str]]:
    """
    Check if text contains email addresses and support extracting matches with advanced options.

    Enhanced features:
    - Support returning all matched email addresses (instead of just boolean)
    - Optimized regex pattern to support more valid email formats
    - Configurable options for deduplication, strict mode, and HTML tag ignoring

    Args:
        text: Text to check for email addresses
        return_matches: Whether to return list of matched emails (instead of boolean). Default is False
        unique: Whether to return deduplicated results (only effective when return_matches=True). Default is False
        strict: Whether to enable strict mode (disallows IP as domain, e.g. user@192.168.1.1). Default is True
        ignore_html: Whether to ignore emails within HTML tags (e.g. <user@example.com>). Default is False

    Returns:
        If return_matches=True, returns list of matched emails; otherwise returns boolean (whether emails exist)

    Raises:
        TypeError: When input text is not a string
    """
    # Type validation
    if not isinstance(text, str):
        raise TypeError("Input text must be a string")

    # Process HTML ignoring: remove content within angle brackets (common in HTML tags)
    processed_text = text
    if ignore_html:
        processed_text = re.sub(r'<[^>]*>', '', processed_text)

    # Define email regex pattern based on mode
    if strict:
        # Strict mode: disallow IP addresses as domain, require proper TLD
        # Local part: alphanumeric characters and common special characters
        # Domain part: multi-level domains with hyphens, TLD must be at least 2 letters
        email_pattern = r'\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b'
    else:
        # Non-strict mode: more permissive, allows IP addresses as domain
        # Local part: same as strict mode
        # Domain part: can be domain names or IP addresses
        email_pattern = r'\b[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b)\b'

    # Find all matches
    matches = re.findall(email_pattern, processed_text)

    # Remove duplicates while preserving order if required
    if unique and matches:
        seen = set()
        unique_matches = []
        for email in matches:
            if email not in seen:
                seen.add(email)
                unique_matches.append(email)
        matches = unique_matches

    # Return result based on parameter
    if return_matches:
        return matches
    else:
        return len(matches) > 0