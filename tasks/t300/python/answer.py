def parse_key_value_format_data_file(file_path: str,
                                     key_processor=lambda x: x,
                                     value_processor=lambda x: x,
                                     separator: str = None) -> list:
    """
    Parses a key-value formatted file, converting each line into an array of [processed key, processed value]
    and returning them as a list. Empty lines are skipped.

    Args:
        file_path: Path to the file to be parsed
        key_processor: Function used to process keys, returns original key by default
        value_processor: Function used to process values, returns original value by default
        separator: Delimiter for key-value pairs. Uses whitespace when None (splits into max two parts)

    Returns:
        List containing arrays of [processed key, processed value]
    """
    if key_processor is None:
        key_processor = lambda x: x
    if value_processor is None:
        value_processor = lambda x: x

    results = []

    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    lines = content.split('\n')

    for i, original_line in enumerate(lines):
        line_number = i + 1
        original_line = original_line.strip()

        if not original_line:
            continue

        if separator is None:
            parts = original_line.split(None, 1)
        else:
            parts = original_line.split(separator, 1)

        if len(parts) != 2:
            raise ValueError(f"Line {line_number} format error: must contain key and value (content: {original_line})")

        try:
            key = key_processor(parts[0])
            value = value_processor(parts[1])
            results.append([key, value])
        except Exception as e:
            raise ValueError(f"Line {line_number} processing failed: {str(e)} (content: {original_line})")

    return results