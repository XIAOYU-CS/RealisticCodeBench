import subprocess
import sys
from typing import List, Dict, Optional

def command_shell_safe(args: List[str], timeout: int = 30) -> Dict[str, str]:
    """
    Safely execute a shell command on the current system and return a structured result.

    This function invokes the system shell (cmd.exe on Windows, sh on Unix-like systems)
    by constructing a command argument list, avoiding shell=True to prevent command injection.
    It supports cross-platform execution, hides the console window on Windows, and captures
    stdout, stderr, and exit codes. Suitable for automation, C2 implants

    Args:
        args (List[str]):
            A list of strings representing the command and its arguments.
            Example: ["ipconfig", "/all"] or ["ls", "-l"].
            If empty, the function immediately returns an error.
        timeout (int, optional):
            Maximum time in seconds to allow the command to run. Default is 30.
            The process will be terminated if it exceeds this limit.

    Returns:
        Dict[str, str]: A dictionary containing execution status and result with keys:
            - "status" (str): Execution outcome, either "success" or "error".
            - "result" (str): Human-readable message including:
                - On success: trimmed stdout output, or placeholder if empty.
                - On failure: error description with exit code and stderr.
                - On exception: system-level error (e.g., timeout, not found).

    Raises:
        No exceptions are raised. All exceptions (e.g., subprocess.TimeoutExpired,
        FileNotFoundError) are caught and returned as error messages in the result dict.

    Notes:
        - On Windows, CREATE_NO_WINDOW flag is used to prevent console window popup.
        - For security-critical environments, pair this with a command allowlist.
        - Avoid using shell=True or string concatenation to prevent injection risks.
        - The Unix path uses 'sh -c "..."', so input should still be validated if from untrusted sources.
    """