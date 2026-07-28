import re
from typing import Union


def convert_time_hms_to_unit(time_str: str, unit: str = 'ms') -> Union[float, int]:
    """
    Convert time string with hours(h), minutes(m), seconds(s) to specified unit value.

    Args:
        time_str: Time string in format like "1.5h30m2.5s", "45.5m", "10s", etc.
        unit: Output unit. Supported values are:
            - 'h': hours
            - 'm': minutes
            - 's': seconds
            - 'ms': milliseconds
            Defaults to 'ms'.

    Returns:
        Converted time value as float, or int when unit is 'ms' (rounded to integer).

    Raises:
        ValueError: If time string format is invalid or unit is not supported.
    """
    # Regular expression supports integer/decimal h, m, s combinations (e.g., 1.5h, 30m, 2.5s)
    # Use fullmatch to ensure entire string matches format, avoiding partial valid character parsing
    pattern = r'^(?:(\d+\.?\d*)h)?(?:(\d+\.?\d*)m)?(?:(\d+\.?\d*)s)?$'
    match = re.fullmatch(pattern, time_str.strip())

    if not match:
        raise ValueError(f"Invalid time format: {time_str}, please use format like '1.5h30m2.5s'")

    # Parse time components (default to 0.0 if missing)
    hours = float(match.group(1)) if match.group(1) else 0.0
    minutes = float(match.group(2)) if match.group(2) else 0.0
    seconds = float(match.group(3)) if match.group(3) else 0.0

    # Calculate total seconds (unified intermediate unit is seconds for easy conversion)
    total_seconds = hours * 3600 + minutes * 60 + seconds

    # Convert according to target unit (supported units and conversion factors)
    unit_converters = {
        'h': lambda s: s / 3600,  # hours = seconds / 3600
        'm': lambda s: s / 60,  # minutes = seconds / 60
        's': lambda s: s,  # seconds = seconds
        'ms': lambda s: round(s * 1000)  # milliseconds = seconds * 1000 (rounded to integer)
    }

    if unit not in unit_converters:
        raise ValueError(f"Unsupported unit: {unit}, supported units are 'h', 'm', 's', 'ms'")

    return unit_converters[unit](total_seconds)