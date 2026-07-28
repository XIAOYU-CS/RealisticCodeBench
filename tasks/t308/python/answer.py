def clean_query(
        query: str,
        whitespace_mode: str = "collapse",
        comment_rules: dict = None
) -> str:
    """
    Query minimization function supporting whitespace modes and custom comment rules

    Args:
        query: Original text to be processed
        whitespace_mode: Whitespace line processing mode, optional values: preserve/remove/collapse
        comment_rules: Comment rule dictionary, format:
            {
                "line_comment": ["#", "--"],  # Line comment markers (ignore from marker to end of line)
                "block_comment": [("/*", "*/")]  # Block comment marker pairs (start, end)
            }
            Defaults to {"line_comment": ["#"], "block_comment": []}
    Returns:
        after process str
    """
    default_rules = {
        "line_comment": ["#"],
        "block_comment": []
    }
    comment_rules = {**default_rules, **(comment_rules or {})}

    if whitespace_mode not in ["preserve", "remove", "collapse"]:
        raise ValueError("whitespace_mode must be 'preserve'/'remove'/'collapse'")

    lines = query.split('\n')
    result = []
    in_block_comment = False  # Whether currently in a block comment
    current_block_end = None  # Current block comment end marker
    previous_was_blank = False  # Whether previous line was blank (for collapse mode)

    for line in lines:
        if in_block_comment:
            if current_block_end in line:
                line = line.split(current_block_end, 1)[1]
                in_block_comment = False
                current_block_end = None
            else:
                line = ""

        if not in_block_comment and line:
            for marker in comment_rules["line_comment"]:
                if marker in line:
                    line = line.split(marker, 1)[0]
                    break  # Only process the first line comment marker

            for (start, end) in comment_rules["block_comment"]:
                if start in line:
                    # Split at block comment start marker
                    parts = line.split(start, 1)
                    line = parts[0]  # Keep content before start marker
                    remaining = parts[1] if len(parts) > 1 else ""

                    # Check if end marker exists on the same line
                    if end in remaining:
                        # Keep content after end marker
                        line += remaining.split(end, 1)[1]
                    else:
                        # Block comment spans multiple lines
                        in_block_comment = True
                        current_block_end = end
                    break  # Only process the first block comment start marker

        # Process whitespace within line (remove leading/trailing whitespace, preserve internal spaces)
        processed_line = line.strip()
        is_blank = (processed_line == "")  # Whether current line is blank

        # Handle according to whitespace mode
        if is_blank:
            if whitespace_mode == "preserve":
                result.append("")
                previous_was_blank = True
            elif whitespace_mode == "collapse":
                # Only keep the first of consecutive blank lines
                if not previous_was_blank:
                    result.append("")
                    previous_was_blank = True
            # In remove mode, don't add blank lines
        else:
            # Add non-blank line and reset blank line flag
            result.append(processed_line)
            previous_was_blank = False

    final_result = '\n'.join(result)
    if whitespace_mode == "remove":
        final_result = final_result.replace('\n\n', '\n').strip()

    return final_result