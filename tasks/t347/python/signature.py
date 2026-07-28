import re

def detect_language(code: str) -> str:
    """
    Detects the programming language of the given code snippet based on syntax features.

    Args:
        code (str): The source code to analyze.

    Returns:
        str: The detected language ('python', 'java', 'javascript', 'c++', or 'unknown').
    """