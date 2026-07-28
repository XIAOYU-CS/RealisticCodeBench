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