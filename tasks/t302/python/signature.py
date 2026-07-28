def custom_format_file_path(
        path: str,
        sep: str = "/",
        replace_char: str = "_",
        strip_chars: str = "_",
        remove_items=None,
        extra_suffixes=None
):
    """
    Processes path strings to generate simplified names, supporting custom rules while preserving default behavior

    Args:
        path: Input path string
        sep: Separator in the path (default '/')
        replace_char: Character to replace separators with (default '_')
        strip_chars: Characters to strip from the start and end (default '_')
        remove_items: List of keywords to remove (only processed if provided)
        extra_suffixes: Additional suffixes to remove (only processed if provided)

    Returns:
        Processed simplified name
    """