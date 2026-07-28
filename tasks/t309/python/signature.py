from typing import Literal, List, Optional


def check_permissions(
        line: str,
        required_perms: Optional[List[Literal["r", "w", "x"]]] = None,
        user_category: Literal["owner", "group", "other"] = "other"
) -> bool:
    """
    Check if the permission string meets the specified read/write/execute permission requirements

    Args:
        line: Line containing permission information, typically from 'ls -l' command output.
              Expected format: "-rwxr-xr-- 1 user group 1024 Jan 1 12:00 filename"
        required_perms: List of required permissions, e.g., ["r", "x"] means read and execute permissions are needed
        user_category: User category to check (owner/group/other users)

    Returns:
        Whether all specified permission requirements are met
    """