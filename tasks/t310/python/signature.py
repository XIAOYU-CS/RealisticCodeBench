from typing import Literal, Dict


def classify_memory_mapping(maps_line: str) -> Dict[
    str, Literal["anonymous", "heap", "stack", "vdso", "vvar", "file", "device", "unknown"]]:
    """
    Parse memory mapping line and return detailed mapping type classification

    Args:
        maps_line: A line of memory mapping information from /proc/[pid]/maps

    Returns:
        Dictionary containing mapping type, key is 'type', value is the specific classification
    """