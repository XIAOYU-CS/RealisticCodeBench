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