import re
from typing import Dict, List, Union


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
    # Load replacement rules from configuration file
    with open(config_path, 'r', encoding='utf-8') as f:
        config: Dict[str, List[Dict[str, str]]] = json.load(f)

    # Validate configuration structure
    if 'replacements' not in config:
        raise ValueError("Configuration file must contain a 'replacements' key")

    if not isinstance(config['replacements'], list):
        raise ValueError("'replacements' must be a list of replacement rules")

    processed_text = input_text

    # Apply each replacement rule
    for rule in config['replacements']:
        # Validate rule structure
        if not isinstance(rule, dict) or 'pattern' not in rule or 'replacement' not in rule:
            continue  # Skip invalid rules

        pattern = rule['pattern']
        replacement = rule['replacement']

        try:
            if use_regex:
                # Use regex substitution (case-sensitive by default)
                processed_text = re.sub(pattern, replacement, processed_text)
            else:
                # Use exact string replacement (case-sensitive)
                processed_text = processed_text.replace(pattern, replacement)
        except re.error as e:
            raise ValueError(f"Invalid regular expression in pattern '{pattern}': {str(e)}")

    return processed_text