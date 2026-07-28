import asyncio
import os
from pathlib import Path


async def calculate_directory_size(directory: str) -> int:
    """
    Asynchronously calculate the total size (in bytes) of all files in the specified directory

    Args:
        directory: The directory path to calculate size for

    Returns:
        The total size (in bytes) of all files in the directory

    Exceptions:
        FileNotFoundError: Directory does not exist
        PermissionError: No permission to access the directory
        NotADirectoryError: The specified path is not a directory
    """
    # Check if directory exists and is actually a directory
    if not os.path.exists(directory):
        raise FileNotFoundError(f"Directory does not exist: {directory}")
    if not os.path.isdir(directory):
        raise NotADirectoryError(f"{directory} is not a directory")

    total_size = 0

    async def process_entry(entry: os.DirEntry):
        """Process a single directory entry (file or subdirectory)"""
        nonlocal total_size
        try:
            if entry.is_file(follow_symlinks=False):
                # For files, get their size
                stat_result = await asyncio.to_thread(entry.stat)
                size = stat_result.st_size
                total_size += size
            elif entry.is_dir(follow_symlinks=False):
                # For subdirectories, add recursive task to the task list
                return entry.path  # Return path for later processing
        except PermissionError:
            print(f"No permission to access: {entry.path}, skipped")
        except OSError as e:
            print(f"Error processing {entry.path}: {e}, skipped")
        return None

    # Get all entries in the directory
    try:
        entries = await asyncio.to_thread(os.scandir, directory)
        entries_list = list(entries)  # Convert to list to avoid iterator issues
    except PermissionError as e:
        raise PermissionError(f"No permission to access directory: {directory}") from e

    tasks = []
    subdirs = []
    for entry in entries_list:
        subdir_path = await process_entry(entry)
        if subdir_path:
            subdirs.append(subdir_path)

    subdir_tasks = [calculate_directory_size(subdir) for subdir in subdirs]
    subdir_sizes = await asyncio.gather(*subdir_tasks)
    total_size += sum(subdir_sizes)

    return total_size