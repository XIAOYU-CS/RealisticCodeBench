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