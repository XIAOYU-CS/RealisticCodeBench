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