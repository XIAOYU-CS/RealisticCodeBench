import unittest


def process_string_quotes(
        line: str,
        strip_outer: bool = True,
        escape_inner: bool = True,
        enclose_final: bool = True
) -> str:
    """
    Process quotes in a string with configurable behavior control

    Args:
        line: Input string to process
        strip_outer: Whether to remove outer quotes (including escaped ones)
        escape_inner: Whether to escape internal quotes
        enclose_final: Whether to wrap the final result with non-escaped quotes

    Returns:
        Processed string with configured quote handling
    """
    processed_line = line

    # Remove outer quotes if requested
    if strip_outer:
        # Handle double quotes: remove surrounding quotes
        if (len(processed_line) >= 2 and
                processed_line.startswith('"') and processed_line.endswith('"')):
            processed_line = processed_line[1:-1]
        # Handle single quotes similarly
        elif (len(processed_line) >= 2 and
              processed_line.startswith("'") and processed_line.endswith("'")):
            processed_line = processed_line[1:-1]

    # Process internal quotes if requested
    if escape_inner:
        # Unescape internal quotes (convert \" back to ")
        processed_line = processed_line.replace('\\"', '"')
        processed_line = processed_line.replace("\\'", "'")
    else:
        # Escape internal quotes (convert " to \")
        processed_line = processed_line.replace('"', '\\"')
        processed_line = processed_line.replace("'", "\\'")

    # Enclose with quotes if requested
    if enclose_final:
        return f'"{processed_line}"'

    return processed_line