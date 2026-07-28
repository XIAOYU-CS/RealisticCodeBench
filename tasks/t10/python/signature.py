def float_to_rgb(value: float) -> tuple:
    """
    Convert a floating point number between 0 and 1 to a color from red to green in the RGB format.

    Args:
        value (float): A float between 0 and 1 (inclusive), where 0 corresponds to red and 1 to green.

    Returns:
        tuple: An RGB color tuple of three integers in the range [0, 255], e.g., (255, 0, 0) for red.

    Raises:
        ValueError: If `value` is not in the range [0, 1].
    """