import sys

def cat(filenames, number_lines=False, show_ends=False, squeeze_blank=False):
    """
    Enhanced version of the Unix 'cat' command.

    Args:
        filenames (list): List of file names to read. If empty, reads from stdin.
        number_lines (bool): Number all non-blank lines.
        show_ends (bool): Show '$' at the end of each line.
        squeeze_blank (bool): Replace multiple consecutive blank lines with a single blank line.
    """