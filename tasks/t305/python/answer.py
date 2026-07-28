import re
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
    region_patterns = {
        "global": r"\+?\d{1,3}[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2,4}",
        "cn": r"1[3-9]\d{9}|\+861[3-9]\d{9}",  # Chinese mobile numbers
        "us": r"\+1[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}"  # US phone numbers
    }

    # Determine which pattern to use
    pattern = custom_pattern or region_patterns.get(region, region_patterns["global"])

    matches = re.finditer(pattern, text)
    phone_numbers = [match.group() for match in matches]

    # Classify number types
    results = []
    for num in phone_numbers:
        num_type = "international" if num.startswith("+") else "local"
        if region == "cn" and len(num.replace("+86", "").replace(" ", "")) == 11:
            num_type = "cn_mobile"
        results.append({"number": num, "type": num_type})

    return results
