def replace_text_with_config(
        input_text: str,
        config_path: str,
        use_regex: bool = False
) -> str:
    """
    Replaces substrings in input text based on patterns defined in a JSON configuration file.
    Defaults to exact string matching, with optional regular expression support.
    json file such as:
    {
    "replacements": [
        {
            "pattern": "\\b(\\d{3})-(\\d{3})-(\\d{4})\\b",
            "replacement": "XXX-XXX-\\3"
        },
        {
            "pattern": "quick",
            "replacement": "fast"
        },
        {
            "pattern": "brown",
            "replacement": "red"
        }
    ]
}

    Args:
        input_text: The text to process and perform replacements on
        config_path: Path to the JSON configuration file containing replacement rules
        use_regex: If True, treat patterns as regular expressions;
                   if False (default), use exact string matches

    Returns:
        The modified text after all replacements have been applied

    Raises:
        FileNotFoundError: If the configuration file doesn't exist
        json.JSONDecodeError: If the configuration file contains invalid JSON
        ValueError: If configuration structure is invalid or regex pattern is malformed
        re.error: If a regular expression pattern is invalid
    """