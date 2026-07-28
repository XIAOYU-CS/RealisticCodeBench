import os
import time


def command_ls(directory=None, sort_by='name', reverse=False):
    """
    List files and folders in the specified directory or current directory with sorting support

    Args:
        directory: Optional parameter, specifies the directory path to list. If None, lists current directory
        sort_by: Sorting method, options: 'name' (by name), 'size' (by size), 'mtime' (by modification time)
        reverse: Whether to sort in reverse order, default False (ascending)

    Returns:
        Tuple (bool, str): First element indicates success, second element is the result string
    """