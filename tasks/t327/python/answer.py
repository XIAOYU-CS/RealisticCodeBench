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
    file_path = Path(name)
    suffix = file_path.suffix.lower()

    try:
        # Read .npy file
        if suffix == '.npy':
            array = np.load(file_path)
            original_dims = list(array.shape)

        # Read .cfl file (requires .hdr header file)
        elif suffix in ('.cfl', ''):
            cfl_path = file_path if suffix == '.cfl' else file_path.with_suffix('.cfl')
            hdr_path = cfl_path.with_suffix('.hdr')

            # Verify file existence
            if not hdr_path.exists():
                raise FileNotFoundError(f"Missing header file: {hdr_path}")
            if not cfl_path.exists():
                raise FileNotFoundError(f"Missing data file: {cfl_path}")

            # Read dimension information from .hdr
            with open(hdr_path, 'r') as h:
                h.readline()  # Skip first line
                dims_line = h.readline().strip()
                original_dims = [int(i) for i in dims_line.split()]

            # Read and reshape data
            total_elements = np.prod(original_dims)
            with open(cfl_path, 'rb') as d:
                array = np.fromfile(d, dtype=np.complex64, count=total_elements)
            array = array.reshape(original_dims, order='F')

        else:
            raise ValueError("Only .npy and .cfl format files are supported")

        # Process dimensions (core: support custom dimensions)
        if target_dims is None:
            # Preserve original dimensions
            return array
        else:
            # Validate target dimension legality
            if target_dims < len(original_dims):
                raise ValueError(
                    f"Target dimension({target_dims}) is less than original dimension({len(original_dims)}), cannot reduce dimensions"
                )
            # Pad dimensions to target count (pad with 1s at the end)
            new_dims = original_dims + [1] * (target_dims - len(original_dims))
            return array.reshape(new_dims)

    except Exception as e:
        raise ValueError(f"Failed to read file: {str(e)}") from e