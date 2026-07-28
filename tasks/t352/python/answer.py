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

    def parse_csv_line(line: str) -> List[str]:
        """Parse a single CSV line according to CSV standards."""
        result = []
        in_quotes = False
        current_cell = ''
        i = 0

        while i < len(line):
            char = line[i]
            next_char = line[i + 1] if i + 1 < len(line) else None

            if char == '"':
                if in_quotes and next_char == '"':
                    # Found two consecutive quotes: treat as escaped quote
                    current_cell += '"'
                    i += 2  # Skip both quotes
                    continue
                else:
                    # Toggle quote mode
                    in_quotes = not in_quotes
                    i += 1
            elif char == ',' and not in_quotes:
                # Only split on commas outside quotes
                result.append(current_cell)
                current_cell = ''
                i += 1
            else:
                current_cell += char
                i += 1

        # Push the last field
        result.append(current_cell)

        # Trim whitespace from each field unless it's quoted (but we already unquoted)
        return [field.strip() for field in result]

    # Preprocess and split lines
    lines = [line.strip() for line in csv_data.strip().split('\n') if line.strip()]
    if not lines:
        return []

    # Parse header
    header = parse_csv_line(lines[0])
    data_rows = [parse_csv_line(line) for line in lines[1:]]

    # Analyze each column
    column_details = []
    for column_index, column_name in enumerate(header):
        clean_column_name = column_name.strip()

        # Extract column values from all rows
        column_values = []
        for row in data_rows:
            # Handle missing columns in row
            value = row[column_index].strip() if column_index < len(row) else ''
            column_values.append(value)

        # Count total and empty values
        total_count = len(column_values)
        empty_count = len([val for val in column_values if val == '' or val is None])

        # Get non-empty samples (up to 5)
        sample_values = [val for val in column_values if val != ''][:5]

        # Infer data type
        data_type = 'string'
        non_empty_values = [val for val in column_values if val != '']

        if len(non_empty_values) == 0:
            data_type = 'empty'
        else:
            is_number = all(re.match(r'^-?\d+(\.\d+)?$', val) for val in non_empty_values)
            is_boolean = all(re.match(r'^(true|false)$', val, re.IGNORECASE) for val in non_empty_values)

            if is_number:
                data_type = 'number'
            elif is_boolean:
                data_type = 'boolean'
            else:
                data_type = 'string'

            # If mixed types are found, mark as mixed
            if not is_number and not is_boolean and any(re.match(r'^-?\d+(\.\d+)?$', val) for val in non_empty_values):
                data_type = 'mixed'

        column_details.append({
            'columnName': clean_column_name,
            'dataType': data_type,
            'sampleValues': sample_values,
            'totalCount': total_count,
            'emptyCount': empty_count,
            'nonEmptyCount': total_count - empty_count
        })

    return column_details