from typing import Dict, Optional, Any
import re
def parse_dynamic_id(value: str, dynamic_value_required: bool = False, config: Optional[Dict[str, Any]] = None) -> Dict[
    str, Optional[str]]:
    """
    Parses a string to extract dynamic identifier values and returns the remaining custom ID

    This function extracts dynamic values enclosed by specified delimiters from a string
    and returns the custom ID portion along with the extracted dynamic value.

    Args:
        value: The input string to parse
        dynamic_value_required: Whether to always include dynamic_value in result
        config: Configuration options for parsing
                - prefix: The prefix delimiter for dynamic values (default: "{")
                - suffix: The suffix delimiter for dynamic values (default: "}_")
                - regex: Custom regular expression (takes precedence over prefix/suffix)

    Returns:
        Dict containing custom_id and optionally dynamic_value
    """
    if config is None:
        config = {}

    default_prefix = "{"
    default_suffix = "}_"

    if config.get('regex') is not None:
        regex = config['regex']
    else:
        prefix = config.get('prefix', default_prefix)
        suffix = config.get('suffix', default_suffix)
        pattern = f"{escape_regex(prefix)}(.+?){escape_regex(suffix)}"
        regex = re.compile(pattern)
    match = regex.search(value)
    dynamic_value = match.group(1) if match else None
    full_match = match.group(0) if match else None
    trim_length = len(full_match) if full_match else 0
    custom_id = value[trim_length:] if dynamic_value else value
    result = {'custom_id': custom_id}

    if dynamic_value or dynamic_value_required:
        result['dynamic_value'] = dynamic_value

    return result

def escape_regex(string: str) -> str:
    """
    Helper function to escape special characters in regular expressions

    Args:
        string: The string to escape

    Returns:
        The escaped string safe for use in regex
    """
    return re.escape(string)