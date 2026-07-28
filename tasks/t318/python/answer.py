import glob


def load_json_files_by_keyword(parent_directory, keyword):
    """
    Find JSON files containing the specified keyword, sort them, and load their contents.

    Args:
        parent_directory (str): Parent directory path to search in
        keyword (str): Keyword to filter filenames

    Returns:
        list: List of JSON file contents. Each element corresponds to a file in sorted order.
              Failed files are represented as None to maintain index correspondence.

    Note:
        - Searches recursively in all subdirectories
        - Files are sorted using default OS sorting
        - Invalid JSON files or unreadable files are skipped with warnings
    """
    # Find all .json files in parent_directory and subdirectories
    json_files = glob.glob(os.path.join(parent_directory, '**', '*.json'), recursive=True)

    # Filter files whose basename contains the specified keyword
    filtered_files = [file for file in json_files if keyword in os.path.basename(file)]

    # Sort files using default OS sorting
    filtered_files.sort()

    # Display numbered file list
    print("Found the following JSON files containing the keyword:")
    for idx, file_path in enumerate(filtered_files):
        print(f"{idx}: {file_path}")

    # Read contents of all files, maintaining order correspondence
    json_contents = []
    for file_path in filtered_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = json.load(f)
                json_contents.append(content)
        except json.JSONDecodeError:
            print(f"Warning: File {file_path} is not valid JSON format, skipped")
            json_contents.append(None)  # Preserve position to maintain index correspondence
        except Exception as e:
            print(f"Warning: Error reading file {file_path}: {str(e)}, skipped")
            json_contents.append(None)  # Preserve position to maintain index correspondence

    return json_contents