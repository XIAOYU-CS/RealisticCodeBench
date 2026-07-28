from typing import Any, Callable, Optional


def convert_strings_to_numbers(
        data: Any,
        custom_converters: Optional[list[Callable[[str], Any]]] = None
) -> Any:
    """
    Recursively converts string representations of numbers in a data structure to numeric types,
    supporting custom conversion rules.

    Args:
        data: Input data (nested dict, list, or other basic types)
        custom_converters: A list of custom converter functions. Each function takes a string
                           and returns the converted value. (If conversion fails, it's recommended
                           to return the original string so that default conversion can continue.)

    Returns:
        The data structure after conversion
    """
    # Handle dictionary type
    if isinstance(data, dict):
        return {key: convert_strings_to_numbers(value, custom_converters)
                for key, value in data.items()}

    # Handle list type
    elif isinstance(data, list):
        return [convert_strings_to_numbers(item, custom_converters)
                for item in data]

    # Handle string type
    elif isinstance(data, str):
        # Apply all custom conversion rules first
        if custom_converters:
            converted = data
            for converter in custom_converters:
                converted = converter(converted)
                # If already converted to a non-string type, stop further custom conversions
                if not isinstance(converted, str):
                    return converted
            # If still a string after custom conversion, proceed with default conversion
            data = converted

        # Default conversion logic (int -> float -> keep original string)
        try:
            return int(data)
        except ValueError:
            try:
                return float(data)
            except ValueError:
                return data

    # Return other types directly
    else:
        return data