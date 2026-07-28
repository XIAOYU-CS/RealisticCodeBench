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