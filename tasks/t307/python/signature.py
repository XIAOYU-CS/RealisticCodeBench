from typing import Literal


def format_comment_with_custom_style(
        string: str,
        max_length: int = 60,
        comment_style: Literal["hash", "slash", "block"] = "hash",
        line_prefix: str = ""
) -> str:
    """
    Format text as comments with specified style, supporting custom line prefixes

    Args:
        string: Original text to be formatted
        max_length: Maximum length per line (including comment symbols and prefixes)
        comment_style: Comment style, optional values:
            - 'hash': Python/Shell style (# comment)
            - 'slash': C++/Java style (// comment)
            - 'block': Block comment style (/* at beginning, * prefix per line, */ at end)
        line_prefix: Extra prefix before each comment content (such as "[NOTE] ")

    Returns:
        Formatted comment string
    """