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