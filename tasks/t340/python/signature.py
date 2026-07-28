from typing import List

class ChangedFiles:
    def __init__(self, files: List[dict]):
        self.files = files

def git_diff_to_changed_files(diff: str, repo_path: str) -> ChangedFiles:
    """
    Parse the Git diff string, extract the list of changed files and count the number of newly added and deleted lines

    Parameter:
        diff: Git diff output string
        repo_path: The root directory path of the warehouse (for path processing

    Returns:
        The ChangedFiles object contains information about the changed files and line count statistics
    """