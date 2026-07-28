async def calculate_directory_size(directory: str) -> int:
    """
    Asynchronously calculate the total size (in bytes) of all files in the specified directory

    Args:
        directory: The directory path to calculate size for

    Returns:
        The total size (in bytes) of all files in the directory

    Exceptions:
        FileNotFoundError: Directory does not exist
        PermissionError: No permission to access the directory
        NotADirectoryError: The specified path is not a directory
    """