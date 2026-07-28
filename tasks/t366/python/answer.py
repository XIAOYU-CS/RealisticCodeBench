import os
import pathlib
import time
from typing import Tuple, Optional, List


def enhanced_cd(
        target: Optional[str] = None,
        history_limit: int = 10,
        preserve_history: bool = True
) -> Tuple[bool, str, Optional[str]]:
    """
    Enhanced change directory function with history tracking, special path support, and additional features

    This function provides enhanced directory navigation capabilities including
    history tracking, special path handling, and robust error management.

    Args:
        target: Target directory path, None returns current directory info only
        history_limit: Maximum number of history entries to maintain
        preserve_history: Whether to preserve directory change history

    Returns:
        Tuple of (success_flag, result_message, new_working_directory_or_None):
        - success_flag: Boolean indicating if operation succeeded
        - result_message: Descriptive message about the operation result
        - new_working_directory_or_None: New working directory path or None if failed
    """
    # Initialize history (using function attributes to persist state)
    if not hasattr(enhanced_cd, 'history'):
        enhanced_cd.history = []  # Format: [(timestamp, directory_path), ...]

    # Save current directory for history tracking and rollback on failure
    current_dir = os.getcwd()

    # If no target specified, return current directory information only
    if target is None:
        return (True, f"Current directory: {current_dir}", current_dir)

    try:
        # Handle special path symbols
        if target == '-':
            # Handle "-" for switching to previous directory
            if len(enhanced_cd.history) >= 1:
                resolved_target = pathlib.Path(enhanced_cd.history[-1][1])
            else:
                return (False, "Error: No history directory record", current_dir)
        else:
            # Resolve the target path (expand ~ and resolve symlinks)
            resolved_target = pathlib.Path(target).expanduser().resolve()

        # Check if target is a valid directory
        if not resolved_target.exists():
            return (False, f"Error: Path does not exist - {target}", current_dir)

        if not resolved_target.is_dir():
            return (False, f"Error: Not a valid directory - {target}", current_dir)

        # Record current directory to history (before switching)
        if preserve_history and target != '-':
            enhanced_cd.history.append((time.time(), str(current_dir)))
            # Limit history length
            if len(enhanced_cd.history) > history_limit:
                enhanced_cd.history = enhanced_cd.history[-history_limit:]

        # Execute directory change
        os.chdir(resolved_target)
        new_dir = os.getcwd()

        # Record the new directory to history after successful switch (for '-' functionality)
        if preserve_history and target == '-':
            enhanced_cd.history.append((time.time(), str(current_dir)))

        return (True, f"Changed to: {new_dir}", new_dir)

    except PermissionError:
        return (False, f"Error: Permission denied - {target}", current_dir)
    except OSError as e:
        return (False, f"System error: {str(e)}", current_dir)
    except Exception as e:
        return (False, f"Change directory failed: {str(e)}", current_dir)