from typing import List, Dict, Union


def cast_strings_to_numbers_recursively (data: Union[Dict, List]) -> Union[Dict, List]:
    """
    Convert strings in nested structures (e.g. dictionaries, arrays) to numbers (integers or floating point numbers) as much as possible

    Args:
        data (Union[Dict,List]): before convert data

    Returns:
        Union[Dict,List]: after convert data
    """
