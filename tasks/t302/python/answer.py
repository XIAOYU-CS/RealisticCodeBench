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
    new_path = path.replace(sep, replace_char).strip(strip_chars)

    if remove_items is not None:
        for item in remove_items:
            new_path = new_path.replace(f"{item}{replace_char}", "")

    if extra_suffixes is not None:
        for suffix in extra_suffixes:
            new_path = new_path.replace(suffix, "")

    return new_path