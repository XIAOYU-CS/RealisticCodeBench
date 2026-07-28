from pathlib import Path
from typing import Optional,Union,Dict
def cwd_utils(
        action: str = "get",
        format_type: str = "string",
        follow_symlinks: bool = True,
        show_hidden: bool = False,
        sort_by: str = "name",
        new_dir: Optional[str] = None
) -> Union[str, Path, Dict, bool, None]:
    """
    Multi-functional current working directory utility function

    This function provides various operations on the current working directory
    including getting path, checking permissions, listing contents, and changing directory.

    Args:
        action: Operation type:
            - "get": Get current directory path
            - "permissions": Check directory permissions
            - "list": List directory contents
            - "change": Change current directory
        format_type: Output format ("string" or "pathlib"), only valid for "get" action
        follow_symlinks: Whether to resolve symbolic links, only valid for "get" action
        show_hidden: Whether to show hidden files, only valid for "list" action
        sort_by: Sorting method ("name", "size", "modified"), only valid for "list" action
        new_dir: New directory path, only valid for "change" action

    Returns:
        Different results based on action type:
        - "get": Current directory path as string or Path object
        - "permissions": Dictionary with permission information
        - "list": Dictionary with directories and files lists
        - "change": True if successful, None if failed
        - None: If operation failed
    """