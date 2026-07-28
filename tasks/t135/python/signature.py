from typing import Tuple, Union

import numpy as np

k_B_over_keV = 8.617333262145e-5


def convert_log10_kelvin_to_kev(T_log10_K: Union[float, Tuple]):
    """
    Converts temperature from log10(K) to keV for a given input (scalar or tuple).k_B_over_keV = 8.617333262145e-5

    Args:
        T_log10_K (float or tuple): The temperature in log10(K). Can be a scalar or a tuple of temperatures.

    Returns:
        float or tuple: The temperature(s) in keV corresponding to the input.

    Raises:
        ValueError: If the input is not a scalar (int or float) or a tuple.
    """
