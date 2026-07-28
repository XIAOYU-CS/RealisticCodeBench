from typing import List


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