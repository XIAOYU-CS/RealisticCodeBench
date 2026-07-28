import os
from typing import List, Optional


def get_foto_files(
        directory: str = '/media/',
        allowed_extensions: Optional[List[str]] = None
) -> List[str]:
    """
    Finds all picture files in specified directory with customizable extensions.

    Args:
        directory: Root directory to search. Defaults to '/media/'.
        allowed_extensions: List of allowed file extensions (e.g., ['.jpg', '.png']).
                            Defaults to ['.jpg'] if not specified.

    Returns:
        list: Absolute paths of found picture files

    Raises:
        NotADirectoryError: If the specified directory does not exist
        PermissionError: If there's no permission to access the directory
    """
    if not os.path.exists(directory):
        raise NotADirectoryError(f"Directory does not exist: {directory}")
    if not os.path.isdir(directory):
        raise NotADirectoryError(f"Not a directory: {directory}")
    if not os.access(directory, os.R_OK):
        raise PermissionError(f"No read permission for directory: {directory}")

    if allowed_extensions is None:
        allowed_extensions = ['.jpg']
    allowed_extensions = [ext.lower() for ext in allowed_extensions]

    foto_paths = []
    for root, _, files in os.walk(directory):
        for file in files:
            _, extension = os.path.splitext(file)
            if extension.lower() in allowed_extensions:
                foto_paths.append(os.path.abspath(os.path.join(root, file)))

    return foto_paths
