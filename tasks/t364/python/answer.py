def enhanced_text_processor(
        text: str,
        keep_alnum: bool = True,
        case_transform: str = "upper",
        replace_map: dict = None
) -> str:
    """
    Text processing function that supports character replacement, alphanumeric filtering, and case transformation

    The function processes text in the following order:
    1. Character replacement: Replace specified characters according to the mapping table
    2. Alphanumeric filtering: Optionally keep only letters and numbers
    3. Case transformation: Convert text to uppercase, lowercase, or preserve original case

    Args:
        text (str): Input text to be processed
        keep_alnum (bool): Whether to keep only alphanumeric characters
            - True: Filter out all non-alphanumeric characters
            - False: Keep all characters
        case_transform (str): Case transformation mode
            - "upper": Convert to uppercase
            - "lower": Convert to lowercase  
            - None: Preserve original case
        replace_map (dict): Character replacement mapping table
            - Format: {'original_char': 'replacement_string', ...}
            - Example: {'@': 'at', '#': 'hash'}

    Returns:
        str: Processed text string
    """
    # Initialize replacement mapping table
    if replace_map is None:
        replace_map = {}

    # Step 1: Character replacement
    processed_text = ""
    for char in text:
        if char in replace_map:
            processed_text += replace_map[char]
        else:
            processed_text += char

    # Step 2: Alphanumeric filtering
    if keep_alnum:
        filtered_chars = []
        for char in processed_text:
            if char.isalnum():
                filtered_chars.append(char)
        processed_text = ''.join(filtered_chars)

    # Step 3: Case transformation
    if case_transform == "upper":
        processed_text = processed_text.upper()
    elif case_transform == "lower":
        processed_text = processed_text.lower()

    return processed_text