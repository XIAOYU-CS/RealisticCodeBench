import os
import re
from pathlib import Path
from typing import Optional


def resolve_path(
        path: str,
        base_dir: Optional[str] = None,
        normalize: bool = True,
        check_exists: bool = False,
        resolve_symlinks: bool = True,
        allow_non_existent: bool = True
) -> Optional[str]:
    """
    Enhanced function to convert relative paths to absolute paths with multiple path processing features

    Parameters:
        path: Input path (can be relative path, absolute path, or path containing ~ symbol)
        base_dir: Base directory for resolving relative paths, defaults to current working directory
        normalize: Whether to normalize the path (remove redundant ./ and ../ and duplicate separators)
        check_exists: Whether to check if the path actually exists
        resolve_symlinks: Whether to resolve symbolic links
        allow_non_existent: When check_exists=False, whether to allow returning non-existent absolute paths

    Returns:
        Resolved absolute path string; returns None on failure
    """
    try:
        # Handle empty path
        if not path or path.strip() == "":
            return None

        # Expand user home directory symbol ~
        expanded_path = os.path.expanduser(path)

        # Determine base directory
        base = base_dir if base_dir is not None else os.getcwd()
        if not os.path.isabs(base):
            base = os.path.abspath(base)

        # Validate base directory - normalize it first to handle .. components
        base_normalized = os.path.normpath(base)
        if not os.path.isdir(base_normalized):
            return None

        # Combine paths
        if os.path.isabs(expanded_path):
            combined_path = expanded_path
        else:
            combined_path = os.path.join(base_normalized, expanded_path)

        # Handle path object
        path_obj = Path(combined_path)

        # Resolve symbolic links
        if resolve_symlinks:
            # strict parameter controls whether to throw exception when path doesn't exist
            resolved_obj = path_obj.resolve(strict=check_exists)
        else:
            resolved_obj = path_obj.absolute()

        # Normalize path
        if normalize:
            final_path = str(resolved_obj)
            # Handle path separators for different systems
            if os.name == 'nt':  # Windows system
                final_path = re.sub(r'\\+', r'\\', final_path)
            else:  # Linux/macOS system
                final_path = re.sub(r'/+', r'/', final_path)
            # Remove trailing path separator
            final_path = final_path.rstrip(os.sep)
        else:
            final_path = str(resolved_obj)

        # Check path existence (if required)
        if check_exists:
            if not Path(final_path).exists():
                return None
        else:
            if not allow_non_existent and not Path(final_path).exists():
                return None

        return final_path

    except PermissionError:
        return None
    except FileNotFoundError:
        return None
    except OSError:
        return None
    except ValueError:
        return None