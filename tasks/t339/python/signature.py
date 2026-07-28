from typing import Optional,List
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