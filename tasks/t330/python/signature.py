import numpy as np
from scipy.interpolate import interp1d


def interp_per_row_with_different_methods(
        grid_row: np.ndarray,
        y_initial: np.ndarray,
        y_sought: np.ndarray,
        interp_row: np.ndarray,
        method: str = 'linear'
) -> None:
    """
    Interpolate values along a row using various interpolation methods.

    Args:
        grid_row: Input data values to interpolate from, shape (n,).
        y_initial: Original coordinate values corresponding to grid_row, shape (n,).
        y_sought: Target coordinate values where interpolation is desired, shape (m,).
        interp_row: Output array to store interpolated values, shape (m,).
        method: Interpolation method to use. Supported methods are:
            - 'linear': Linear interpolation (default)
            - 'nearest': Nearest neighbor interpolation
            - 'cubic': Cubic spline interpolation
            - 'quadratic': Quadratic interpolation

    Returns:
        None. Results are stored in interp_row array.

    Raises:
        ValueError: If an unsupported interpolation method is specified.
        ValueError: If input arrays have incompatible shapes.
    """