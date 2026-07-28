import re
from datetime import datetime

def extract_date_from_filename(file_name):
    """
    Extract a valid date from a filename, supporting multiple common formats and validating their correctness.

    Supported formats and validation rules:
    - YYYY-MM-DD (e.g., 2023-12-31): Validates year, month, and day ranges.
    - YYYYMMDD (e.g., 20231231): Validates year, month, and day ranges.
    - DD-MM-YYYY (e.g., 31-12-2023): Month must be 1-12; day must conform to the month's number of days.
    - MM-DD-YYYY (e.g., 12-31-2023): Same as above.
    - DD/MM/YYYY (e.g., 31/12/2023): Same as above.
    - MM/DD/YYYY (e.g., 12/31/2023): Same as above.

    Args:
        file_name (str): The input filename string.

    Returns:
        str or None: A valid date string extracted from the filename, or None if no valid date is found.
    """

    # Define date formats with corresponding regex patterns and parsing formats
    date_formats = [
        (r'\d{4}-\d{2}-\d{2}', '%Y-%m-%d'),          # YYYY-MM-DD
        (r'\d{8}', '%Y%m%d'),                        # YYYYMMDD
        (r'\d{2}-\d{2}-\d{4}', ['%d-%m-%Y', '%m-%d-%Y']),  # DD-MM-YYYY / MM-DD-YYYY
        (r'\d{2}/\d{2}/\d{4}', ['%d/%m/%Y', '%m/%d/%Y'])   # DD/MM/YYYY / MM/DD/YYYY
    ]

    for pattern, parsers in date_formats:
        matches = re.findall(pattern, file_name)
        for date_str in matches:
            # Try each parser for ambiguous formats
            if isinstance(parsers, list):
                for parser in parsers:
                    try:
                        datetime.strptime(date_str, parser)
                        return date_str  # Valid date found
                    except ValueError:
                        continue
            else:
                try:
                    datetime.strptime(date_str, parsers)
                    return date_str
                except ValueError:
                    continue

    # No valid date found
    return None