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