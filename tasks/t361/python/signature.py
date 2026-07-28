from typing import Dict, Optional, Any
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