from typing import List, Dict, Optional

def detect_phone_numbers(
        text: str,
        region: str = "global",
        custom_pattern: Optional[str] = None
) -> List[Dict[str, str]]:
    """Detects phone numbers in a given text based on region or custom pattern.

    Args:
        text: The input string to search for phone numbers.
        region: Specifies the region for pattern selection. Defaults to "global".
            Valid regions: "global", "cn" (China), "us" (United States).
        custom_pattern: Optional regular expression pattern to use instead of
            region-specific patterns. If provided, overrides the region parameter.

    Returns:
        A list of dictionaries with the following keys:
            - "number": The detected phone number as a string.
            - "region": The region used for detection (or "custom" if a custom pattern was used).

    Raises:
        ValueError: If the specified region is not in the list of supported regions.
    """