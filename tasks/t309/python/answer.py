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
    # Default to requiring at least one permission
    if required_perms is None:
        required_perms = []

    # Extract permission string (assuming format like -rwxr-xr--)
    try:
        perms = line.split()[0]
        if len(perms) < 9:
            return False
    except (IndexError, ValueError):
        return False

    # Determine the permission positions to check (owner:0-2, group:3-5, other:6-8)
    category_map = {
        "owner": slice(0, 3),
        "group": slice(3, 6),
        "other": slice(6, 9)
    }
    target_perms = perms[category_map[user_category]]

    # Check if all specified permissions are met
    for perm in required_perms:
        if perm not in target_perms:
            return False
    return True