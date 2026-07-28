import numpy as np
from typing import Union, List, Tuple, Optional


def trilinear_interp(
        points: Union[np.ndarray, List[Tuple[float, float, float]]],
        voxel_min: Union[np.ndarray, Tuple[float, float, float]],
        voxel_max: Union[np.ndarray, Tuple[float, float, float]],
        voxel_values: Union[np.ndarray, List[float]],
        bounds_mode: str = "clip",
        fill_value: float = 0.0
) -> np.ndarray:
    """
    Enhanced 3D linear interpolation (trilinear interpolation), supporting batch processing and boundary handling

    Parameters:
        points: 3D point coordinates to interpolate, can be single point or batch points
                Format: (x, y, z) or N×3 array
        voxel_min: Minimum vertex coordinates of the voxel (x_min, y_min, z_min)
        voxel_max: Maximum vertex coordinates of the voxel (x_max, y_max, z_max)
        voxel_values: Values of the 8 voxel vertices, in order:
                      (x_min,y_min,z_min), (x_max,y_min,z_min),
                      (x_min,y_max,z_min), (x_max,y_max,z_min),
                      (x_min,y_min,z_max), (x_max,y_min,z_max),
                      (x_min,y_max,z_max), (x_max,y_max,z_max)
        bounds_mode: Boundary handling mode:
                    - "clip": Clip out-of-bounds points to boundaries
                    - "fill": Return fill_value for out-of-bounds points
                    - "error": Raise exception for out-of-bounds points
        fill_value: Fill value used when bounds_mode="fill"

    Returns:
        Interpolation results (single value or N-dimensional array)
    """