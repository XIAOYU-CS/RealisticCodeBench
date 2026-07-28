import sys
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
    # Parse frame structure parameters
    elements_per_frame, data_format = frame_spec

    # Validate parameter validity
    if elements_per_frame <= 0:
        raise ValueError(f"Number of elements per frame must be positive, got {elements_per_frame}")

    try:
        element_size = struct.calcsize(data_format)
    except struct.error as e:
        raise ValueError(f"Invalid data format string: {data_format}, error: {str(e)}") from e

    frame_size = elements_per_frame * element_size
    if frame_size <= 0:
        raise ValueError(f"Calculated frame size is invalid: {frame_size} bytes")

    frames: List[List[Union[int, float]]] = []

    try:
        with open(file_path, 'rb') as f:
            while True:
                # Read one frame of data
                chunk = f.read(frame_size)
                if not chunk:
                    break  # Normal end of reading

                # Handle incomplete frames
                if len(chunk) != frame_size:
                    msg = (f"File {file_path} contains incomplete frame, expected {frame_size} bytes, "
                           f"got {len(chunk)} bytes, which has been ignored")
                    if not ignore_incomplete:
                        sys.stderr.write(f"Warning: {msg}\n")
                    break

                # Parse elements within the frame
                frame = []
                for i in range(elements_per_frame):
                    offset = i * element_size
                    # Parse a single element
                    element = struct.unpack_from(data_format, chunk, offset)[0]
                    frame.append(element)

                frames.append(frame)

    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {file_path}")
    except IOError as e:
        raise IOError(f"Failed to read file {file_path}: {str(e)}") from e

    return frames