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
    # Split mapping line (split at most 5 times to preserve pathname integrity)
    parts = maps_line.strip().split(None, 5)
    pathname = parts[5] if len(parts) >= 6 else ''

    # Precisely identify special anonymous mapping types
    if pathname.startswith('[') and pathname.endswith(']'):
        region_name = pathname[1:-1]  # Extract content within []
        if region_name == 'heap':
            return {'type': 'heap'}
        elif region_name == 'stack':
            return {'type': 'stack'}
        elif region_name == 'vdso':  # Virtual Dynamic Shared Object
            return {'type': 'vdso'}
        elif region_name == 'vvar':  # Virtual Variable Region
            return {'type': 'vvar'}
        else:
            return {'type': 'anonymous'}  # Other []-wrapped anonymous regions

    # Identify anonymous mappings with empty pathname
    if not pathname:
        return {'type': 'anonymous'}

    # Identify file-backed mappings
    if pathname.startswith('/'):
        if pathname.startswith('/dev/'):
            return {'type': 'device'}  # Device file mapping
        else:
            return {'type': 'file'}  # Regular file mapping

    # Unrecognized type
    return {'type': 'unknown'}