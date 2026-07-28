import os
from pathlib import Path
from typing import Optional, Union, Dict, List


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
    try:
        # Get current working directory
        if action == "get":
            cwd = Path.cwd()
            if follow_symlinks:
                cwd = cwd.resolve()
            return str(cwd) if format_type == "string" else cwd

        # Check directory permissions
        elif action == "permissions":
            cwd = Path.cwd()
            return {
                "read": os.access(cwd, os.R_OK),
                "write": os.access(cwd, os.W_OK),
                "execute": os.access(cwd, os.X_OK),
                "exists": cwd.exists()
            }

        # List directory contents
        elif action == "list":
            cwd = Path.cwd()
            contents = {"directories": [], "files": []}

            for item in cwd.iterdir():
                # Skip hidden files if not requested
                if not show_hidden and item.name.startswith('.'):
                    continue

                try:
                    if item.is_dir():
                        contents["directories"].append(item.name)
                    else:
                        contents["files"].append(item.name)
                except OSError:
                    # Handle broken symlinks or inaccessible items
                    continue

            # Sorting logic
            def sort_key(name: str):
                path = cwd / name
                try:
                    if sort_by == "size":
                        if path.is_dir():
                            return 0  # Directories have size 0 for comparison
                        return path.stat().st_size
                    elif sort_by == "modified":
                        return path.stat().st_mtime
                except OSError:
                    # Return default values for inaccessible files
                    return 0 if sort_by == "size" else ""
                return name.lower()  # Default: sort by name (case-insensitive)

            contents["directories"].sort(key=sort_key)
            contents["files"].sort(key=sort_key)
            return contents

        # Change current directory
        elif action == "change":
            if not new_dir:
                raise ValueError("new_dir parameter is required for 'change' action")
            os.chdir(new_dir)
            return True

        else:
            raise ValueError(f"Unsupported action: {action}")

    except PermissionError:
        print("Permission error: No permission to operate on directory")
        return None
    except FileNotFoundError:
        print("Directory not found")
        return None
    except OSError as e:
        print(f"System error: {str(e)}")
        return None
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return None