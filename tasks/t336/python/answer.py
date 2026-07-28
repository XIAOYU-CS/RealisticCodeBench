from pathlib import Path

def is_valid_path_format(path_str):
    """
    Check if the input string is a valid path format.

    Args:
        path_str: The string to check for valid path format

    Returns:
        bool: True if the string is a valid path format (absolute path or 
              relative path with at least two parts), False otherwise
    """
    if not isinstance(path_str, str):
        return False

    try:
        path = Path(path_str)
        return path.is_absolute() or len(path.parts) > 1
    except (ValueError, OSError, TypeError):
        return False