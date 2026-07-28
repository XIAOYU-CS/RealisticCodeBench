import os
import time


def command_ls(directory=None, sort_by='name', reverse=False):
    """
    List files and folders in the specified directory or current directory with sorting support

    Args:
        directory: Optional parameter, specifies the directory path to list. If None, lists current directory
        sort_by: Sorting method, options: 'name' (by name), 'size' (by size), 'mtime' (by modification time)
        reverse: Whether to sort in reverse order, default False (ascending)

    Returns:
        Tuple (bool, str): First element indicates success, second element is the result string
    """
    valid_sort_options = ['name', 'size', 'mtime']
    if sort_by not in valid_sort_options:
        return (False, f"Invalid sort option. Must be one of: {', '.join(valid_sort_options)}")

    try:
        # Process directory parameter
        if directory is None:
            target_dir = "."
        else:
            # Check if directory exists
            if not os.path.isdir(directory):
                return (False, "[invalid directory path]")  # Changed from True to False for consistency
            target_dir = directory

        # Get directory contents and prepare detailed information
        entries = []
        for entry in os.listdir(target_dir):
            # Skip . and ..
            if entry in ('.', '..'):
                continue

            entry_path = os.path.join(target_dir, entry)
            stat_info = os.stat(entry_path)

            # Collect file/directory information
            entries.append({
                'name': entry,
                'path': entry_path,
                'is_dir': os.path.isdir(entry_path),
                'size': stat_info.st_size,
                'mtime': stat_info.st_mtime  # Modification time (timestamp)
            })

        # Sort according to selected method
        if sort_by == 'name':
            entries.sort(key=lambda x: x['name'].lower(), reverse=reverse)
        elif sort_by == 'size':
            # For directories, use 0 size for sorting consistency
            entries.sort(key=lambda x: (x['is_dir'], x['size'] if not x['is_dir'] else 0), reverse=reverse)
        elif sort_by == 'mtime':
            entries.sort(key=lambda x: x['mtime'], reverse=reverse)

        # Prepare result buffer
        result = []

        for item in entries:
            if item['is_dir']:
                # Directory entry
                result.append(f"[DIR]                     {item['name']:<50}")
            else:
                # File entry, display size
                result.append(f"[FILE] {item['size']:10} bytes   {item['name']:<50}")

        # Combine results, add leading newline
        return (True, "\n" + "\n".join(result))

    except Exception as e:
        return (False, f"Error: {str(e)}")