from typing import Literal


def pad_string(string: str, n: int = 4, char: str = ' ', side: Literal['left', 'right', 'both'] = 'left') -> str:
    """
    Adds padding characters to a multi-line string, supporting multiple directions and custom padding content

    Args:
        string: Input multi-line string
        n: Padding quantity (padding length for each side)
        char: Padding character (space by default), can use a single character or string
        side: Padding direction ('left'/'right'/'both')

    Returns:
        The padded multi-line string
    """
    if not string or n <= 0:
        return string

    if not isinstance(string, str):
        raise TypeError(f"Expected string type, received {type(string)}")

    if not char:
        char = ' '

    char_len = len(char)
    repeat = (n // char_len) + (1 if n % char_len else 0)
    padding = (char * repeat)[:n]  # Ensure padding length is exactly n

    ends_with_newline = string.endswith('\n')
    lines = string.splitlines()

    processed_lines = []
    for line in lines:
        if side == 'left':
            processed = padding + line
        elif side == 'right':
            processed = line + padding
        elif side == 'both':
            processed = padding + line + padding
        else:
            raise ValueError(f"Unsupported padding direction: {side}, allowed values: 'left'/'right'/'both'")
        processed_lines.append(processed)

    result = '\n'.join(processed_lines)
    return result + ('\n' if ends_with_newline else '')