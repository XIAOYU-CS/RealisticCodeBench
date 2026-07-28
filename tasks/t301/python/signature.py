from typing import List, Tuple, Union


def read_binary_frames(
        file_path: str,
        frame_spec: Tuple[int, str],
        ignore_incomplete: bool = False
) -> List[List[Union[int, float]]]:
    """
    Reads frame data from a binary file, supporting custom frame structures and data types

    Args:
        file_path: the binary file path
        frame_spec: Frame structure description tuple (elements_per_frame, data_format)
            - elements_per_frame: Number of elements contained in each frame
            - data_format: struct module format string (e.g., '<I' for little-endian 32-bit unsigned integer)

        ignore_incomplete: Whether to ignore incomplete frames (False will warn, True will silently ignore)

    Returns:
        List of frame data, where each element is a frame list containing the specified number of elements

    Raises:
        ValueError:
            - If elements_per_frame is not a positive integer
            - If data_format is an invalid struct format string
            - If the calculated frame size is invalid (non-positive)
        FileNotFoundError: If the file specified by file_path does not exist
        IOError: If there is an error reading the file (e.g., permission issues, disk errors)
    """