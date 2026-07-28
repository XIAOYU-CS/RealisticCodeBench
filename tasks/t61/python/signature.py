import re


def shift_emojis_to_text_end(text: str):
    """
    Move the emoj expression in the string to the end of the text

    Args:
        text (str): The input string containing text and possibly emojis.

    Returns:
        str: The modified string with all emojis moved to the end.
    """
