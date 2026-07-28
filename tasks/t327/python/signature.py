import numpy as np
from pathlib import Path
from typing import Union, Optional


def read_array_file(
        name: Union[str, Path],
        target_dims: Optional[int] = 12
) -> np.ndarray:
    """
    Read .npy or .cfl format files, supporting custom dimension processing (preserve original dimensions or specify target dimension count)

    Args:
        name: File name (.npy files need extension; .cfl files can have extension or just filename, automatically matches .hdr)
        target_dims: Target dimension count, if None then preserve original dimensions; otherwise pad dimensions to specified count (must be ≥ original dimensions)

    Returns:
        Processed NumPy array

    Exceptions:
        FileNotFoundError: File or corresponding .hdr header file does not exist
        ValueError: Unsupported format or target dimension less than original dimension
    """