import re



def process_cpp_file(
        file_path: str,
        new_file_path: str,
        insert_content: str,
        function_prefix: str,
        include_keyword: str = '#include'
) -> None:
    """
    Process file: insert content at specified location and replace function calls with specific prefix.

    Args:
        file_path: Path to the original file
        new_file_path: Path where the processed file will be saved
        insert_content: Code content to be inserted (e.g., macro definitions)
        function_prefix: Function prefix to be replaced (e.g., "ti_")
        include_keyword: Keyword to locate insertion position (default "#include")
    """
    # Read original file content
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Locate insertion position: after the last line containing the specified keyword
    include_section_end = -1
    for index, line in enumerate(lines):
        if line.startswith(include_keyword):
            include_section_end = index

    # Insert custom content after the last include line, or at the beginning if no include found
    if include_section_end >= 0:
        lines.insert(include_section_end + 1, insert_content + '\n')
    else:
        lines.insert(0, insert_content + '\n')

    # Build function matching pattern (based on specified prefix)
    func_pattern = re.compile(rf'({function_prefix}[a-zA-Z0-9_]+)\s*\(')

    # Replace function call format
    processed_lines = []
    for line in lines:
        # Replace with CALL_C_API_FUNC(function_name)( format
        line = func_pattern.sub(r'CALL_C_API_FUNC(\1)(', line)
        processed_lines.append(line)

    # Save the processed file
    with open(new_file_path, 'w', encoding='utf-8') as f:
        f.writelines(processed_lines)