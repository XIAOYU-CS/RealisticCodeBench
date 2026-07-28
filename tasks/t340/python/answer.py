from typing import List


class ChangedFile:
    def __init__(self, file_name: str, old_content: str, new_content: str, lines_added: int = 0,
                 lines_removed: int = 0):
        self.file_name = file_name
        self.old_content = old_content
        self.new_content = new_content
        self.lines_added = lines_added
        self.lines_removed = lines_removed

    def model_dump(self):
        return {
            "file_name": self.file_name,
            "old_content": self.old_content,
            "new_content": self.new_content,
            "lines_added": self.lines_added,
            "lines_removed": self.lines_removed
        }


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
    changed_files = []
    current_file = None
    in_content_block = False
    lines_added = 0
    lines_removed = 0

    lines = diff.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]

        if line.startswith("diff --git"):
            if current_file:
                current_file.lines_added = lines_added
                current_file.lines_removed = lines_removed
                changed_files.append(current_file)

            parts = line.split()
            file_name = None
            if len(parts) >= 4:
                file_name = parts[3][2:]
            current_file = ChangedFile(
                file_name=file_name,
                old_content="",
                new_content=""
            )
            lines_added = 0
            lines_removed = 0
            in_content_block = False

        elif line.startswith(("---", "+++")):
            in_content_block = True

        elif line.startswith("@@"):
            pass

        elif in_content_block and current_file:
            if line.startswith("-") and not line.startswith("---"):
                current_file.old_content += line[1:] + "\n"
                lines_removed += 1
            elif line.startswith("+") and not line.startswith("+++"):
                current_file.new_content += line[1:] + "\n"
                lines_added += 1
            elif line.startswith(" "):
                current_file.old_content += line[1:] + "\n"
                current_file.new_content += line[1:] + "\n"

        i += 1

    if current_file:
        current_file.lines_added = lines_added
        current_file.lines_removed = lines_removed
        changed_files.append(current_file)

    return ChangedFiles(files=[file.model_dump() for file in changed_files])