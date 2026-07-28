from typing import Any, Optional, Callable


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