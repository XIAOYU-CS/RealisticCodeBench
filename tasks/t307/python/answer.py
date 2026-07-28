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
    style_prefixes = {
        "hash": "# ",
        "slash": "// ",
        "block": "* "
    }

    if comment_style not in style_prefixes:
        raise ValueError(f"Unsupported comment style: {comment_style}, available values: {list(style_prefixes.keys())}")

    base_prefix = style_prefixes[comment_style]
    prefix_total = base_prefix + line_prefix
    content_max_len = max_length - len(prefix_total)

    if content_max_len <= 0:
        raise ValueError(f"Maximum length ({max_length}) is too small to accommodate comment symbols and prefixes")

    lines = string.split('\n')
    all_words = []
    for line in lines:
        all_words.extend(line.split())  # Extract all words

    formatted_lines = []
    current_line = []
    current_len = 0

    for word in all_words:
        word_len = len(word)
        needed_len = current_len + (word_len + 1 if current_line else word_len)

        if needed_len > content_max_len:
            formatted_lines.append(' '.join(current_line))
            current_line = [word]
            current_len = word_len
        else:
            current_line.append(word)
            current_len = needed_len

    if current_line:
        formatted_lines.append(' '.join(current_line))

    prefixed_lines = [prefix_total + line for line in formatted_lines]
    if comment_style == "block":
        return f"/*\n" + '\n'.join(prefixed_lines) + "\n*/"
    else:
        return '\n'.join(prefixed_lines)