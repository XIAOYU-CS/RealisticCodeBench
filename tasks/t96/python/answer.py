from typing import Dict, List, Union


def cast_strings_to_numbers_recursively (data:Union[Dict,List])->Union[Dict,List]:
    """
    Convert strings in nested structures (e.g. dictionaries, arrays) to numbers (integers or floating point numbers) as much as possible

    Args:
        data (Union[Dict,List]): before convert data

    Returns:
        Union[Dict,List]: after convert data
    """
    if isinstance(data, dict):
        return {key: cast_strings_to_numbers_recursively (value) for key, value in data.items()}
    elif isinstance(data, list):
        return [cast_strings_to_numbers_recursively (item) for item in data]
    elif isinstance(data, str):
        try:
            if '.' in data:
                return float(data)
            else:
                return int(data)
        except ValueError:
            return data 
    else:
        return data  