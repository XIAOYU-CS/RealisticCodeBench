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
    # Unify data format to numpy array for batch processing
    points = np.asarray(points, dtype=np.float32)
    voxel_min = np.asarray(voxel_min, dtype=np.float32)
    voxel_max = np.asarray(voxel_max, dtype=np.float32)
    voxel_values = np.asarray(voxel_values, dtype=np.float32)

    # Validate input validity
    if points.ndim not in (1, 2) or (points.ndim == 2 and points.shape[1] != 3):
        raise ValueError("points must be a 3D point (1D array) or N×3 batch points (2D array)")
    if voxel_min.shape != (3,) or voxel_max.shape != (3,):
        raise ValueError("voxel_min and voxel_max must be 3D coordinates")
    if voxel_values.shape != (8,):
        raise ValueError("voxel_values must contain values for 8 vertices")

    # Calculate voxel size, avoid division by zero
    voxel_size = voxel_max - voxel_min
    if np.any(voxel_size <= 1e-9):
        raise ValueError("Voxel size cannot be zero or negative")

    # Process batch points (ensure 2D array format)
    is_single_point = points.ndim == 1
    if is_single_point:
        points = points[np.newaxis, :]  # Convert to 1×3 array

    # Calculate relative weights (x, y, z directions)
    weights = (points - voxel_min) / voxel_size  # Shape: N×3

    # Boundary handling
    out_of_bounds = np.zeros(len(points), dtype=bool)  # Track out-of-bounds points
    if bounds_mode == "clip":
        weights = np.clip(weights, 0.0, 1.0)
    elif bounds_mode == "fill":
        # Check for out-of-bounds points
        out_of_bounds = np.any((weights < 0.0) | (weights > 1.0), axis=1)
    elif bounds_mode == "error":
        if np.any((weights < 0.0) | (weights > 1.0)):
            raise ValueError("Points exist outside the voxel range")
    else:
        raise ValueError(f"Unsupported boundary mode: {bounds_mode}")

    # Extract 8 vertex values
    v000, v100, v010, v110, v001, v101, v011, v111 = voxel_values

    # Step 1: X-direction interpolation (batch processing)
    xw = weights[:, 0]  # X-direction weights, shape: N
    c00 = v000 * (1 - xw) + v100 * xw  # Bottom face, back edge
    c01 = v010 * (1 - xw) + v110 * xw  # Bottom face, front edge
    c10 = v001 * (1 - xw) + v101 * xw  # Top face, back edge
    c11 = v011 * (1 - xw) + v111 * xw  # Top face, front edge

    # Step 2: Y-direction interpolation
    yw = weights[:, 1]  # Y-direction weights, shape: N
    c0 = c00 * (1 - yw) + c01 * yw  # Bottom face interpolation
    c1 = c10 * (1 - yw) + c11 * yw  # Top face interpolation

    # Step 3: Z-direction interpolation
    zw = weights[:, 2]  # Z-direction weights, shape: N
    result = c0 * (1 - zw) + c1 * zw

    # Apply fill value to out-of-bounds points
    if bounds_mode == "fill":
        result[out_of_bounds] = fill_value

    # Restore single point output format
    return result[0] if is_single_point else result