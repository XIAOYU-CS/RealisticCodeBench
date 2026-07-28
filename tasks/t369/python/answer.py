import os
import shutil
from typing import Union, List, Tuple

def mv(sources: Union[str, List[str]], destination: str, overwrite: bool = False) -> Tuple[List[str], List[Tuple[str, str]]]:
    """
    Move one or more files or directories to a destination path.

    Args:
        sources (str or list of str): A single source path or a list of source paths to move.
        destination (str): The destination path where files/directories will be moved.
        overwrite (bool): Whether to overwrite the destination if it already exists. Default is False.

    Returns:
        tuple: A tuple containing two lists:
            - success_list (list of str): List of source paths that were successfully moved.
            - fail_list (list of tuples): List of failed moves, each tuple contains (source_path, error_message).
    Raises:
        NotADirectoryError: If multiple sources are provided and the destination is not an existing directory.
        FileExistsError: If the destination exists and overwrite is False in a single-source move.
    """
    if not isinstance(sources, list):
        sources = [sources]

    success_list = []
    fail_list = []

    if len(sources) > 1 and not os.path.isdir(destination):
        raise NotADirectoryError(f"When moving multiple sources, destination must be an existing directory: {destination}")

    for source in sources:
        if not os.path.exists(source):
            fail_list.append((source, "Source path does not exist"))
            continue

        if os.path.isdir(destination) and (len(sources) > 1 or os.path.isdir(source)):
            dest_path = os.path.join(destination, os.path.basename(source))
        else:
            dest_path = destination

        if os.path.exists(dest_path):
            if not overwrite:
                fail_list.append((source, f"Destination already exists and overwrite is disabled: {dest_path}"))
                continue
            try:
                if os.path.isfile(dest_path) or os.path.islink(dest_path):
                    os.remove(dest_path)
                else:
                    shutil.rmtree(dest_path)
            except Exception as e:
                fail_list.append((source, f"Failed to remove existing destination: {str(e)}"))
                continue
        try:
            shutil.move(source, dest_path)
            success_list.append(source)
        except Exception as e:
            fail_list.append((source, str(e)))

    return success_list, fail_list