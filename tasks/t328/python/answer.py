import numpy as np
from scipy.ndimage import distance_transform_edt


def replace_by_nearest(some_arr, rms, mask_func=lambda x: x == 0):
    """
    Replace values in some_arr based on the nearest non-zero values in rms (or custom mask condition).
    Args:
        some_arr : np.ndarray
            A 2D array whose values will be replaced where mask_func(rms) is True.
        rms : np.ndarray
            A 2D array of the same shape as some_arr. Nearest non-masked neighbors
            (where mask_func(rms) is False) determine the replacement indices for some_arr.
        mask_func : callable, optional
            A function that takes `rms` as input and returns a boolean numpy array.
            Positions where the result is True will be replaced. Defaults to `lambda x: x == 0`.

    Returns:
        A copy of some_arr with values replaced based on nearest non-masked neighbors
        (determined by mask_func).

    """
    if some_arr.shape != rms.shape:
        raise ValueError("some_arr and rms must have the same shape.")

    # Handle empty array.
    if some_arr.size == 0:
        return some_arr.copy()

    # Ensure arrays are 2D
    if some_arr.ndim != 2:
        raise ValueError("Input arrays must be 2D.")

    # Generate mask using custom function
    mask = mask_func(rms)
    # Validate mask is a boolean array with same shape as input
    if not isinstance(mask, np.ndarray) or mask.dtype != bool or mask.shape != rms.shape:
        raise ValueError("mask_func must return a boolean numpy array with the same shape as rms.")

    # If no elements need replacement, return original
    if not np.any(mask):
        return some_arr.copy()

    # If all elements are masked, return copy of original (no valid neighbors to replace with)
    if np.all(mask):
        return some_arr.copy()

    # Calculate distance transform and nearest non-masked indices
    distances, nearest_indices = distance_transform_edt(mask, return_indices=True)

    # Get values from some_arr using the nearest valid indices
    nearest_values = some_arr[nearest_indices[0], nearest_indices[1]]

    # Replace masked positions in some_arr with nearest values
    result = some_arr.copy()
    result[mask] = nearest_values[mask]

    return result