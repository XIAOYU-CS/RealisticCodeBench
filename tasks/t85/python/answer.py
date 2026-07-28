import re
from typing import List, Optional


def find_placeholders(
    text: str,
    unique: bool = False,
    return_full: bool = False,
    allow_empty: bool = False
) -> List[str]:
    """
    Find placeholders in the format {{ placeholder }} in the given text.
    Supports multiple matching modes.

    Enhanced features:
    - Supports placeholders containing letters, digits, underscores, dots, and hyphens.
    - Optionally returns unique results.
    - Optionally returns full placeholders (with {{}}) or just the inner content.
    - Optionally allows empty placeholders (e.g., {{   }}).

    Args:
        text: Input text to search.
        unique: Whether to return unique results only. Default is False.
        return_full: Whether to return full placeholders (with {{}}). Default is False.
        allow_empty: Whether to allow empty placeholders (only whitespace or empty). Default is False.

    Returns:
        List of matched placeholders in the order they appear.

    Raises:
        TypeError: If the input text is not a string.
    """
    # Type check
    if not isinstance(text, str):
        raise TypeError("Input 'text' must be a string.")

    # Regular expression pattern:
    # Matches {{ placeholder }}, allowing letters, digits, _, -, and .
    # Group 1: inner content (without {{}}); Group 0: full match (with {{}})
    pattern = r'{{\s*([\w\-.]*?)\s*}}'

    matches = []
    for match in re.finditer(pattern, text):
        full_match = match.group(0)
        inner_content = match.group(1)

        # Skip empty placeholders if not allowed
        if not allow_empty and not inner_content.strip():
            continue

        # Append full match or inner content based on return_full flag
        matches.append(full_match if return_full else inner_content)

    # Remove duplicates while preserving order if required
    if unique:
        seen = set()
        unique_matches = []
        for item in matches:
            if item not in seen:
                seen.add(item)
                unique_matches.append(item)
        matches = unique_matches

    return matches