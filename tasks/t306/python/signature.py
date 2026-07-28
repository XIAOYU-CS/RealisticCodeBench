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