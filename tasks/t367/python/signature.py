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