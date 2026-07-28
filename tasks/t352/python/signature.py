import re
from typing import List, Dict, Any, Union


def get_column_details(csv_data: str) -> List[Dict[str, Any]]:
    """Parses CSV data and returns detailed information about each column,
    including column name, inferred data type, and sample values.

    Supports standard CSV formatting:
    - Fields may be quoted with double quotes
    - Commas within quoted fields are preserved
    - Double double-quotes inside quotes are treated as escaped quote (e.g., "a""b" → a"b)

    Args:
        csv_data (str): The raw CSV string to parse.

    Returns:
        list[dict]: An array of column detail objects, each containing:
            - columnName (str): The name of the column
            - dataType (str): One of 'string', 'number', 'boolean', 'mixed', 'empty'
            - sampleValues (list[str]): Sample non-empty values from the column (up to 5)
            - totalCount (int): Total number of rows (excluding header)
            - emptyCount (int): Number of empty/missing values
            - nonEmptyCount (int): Number of non-empty values
    """
