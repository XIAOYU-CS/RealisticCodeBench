def determine_background_light_level(computed_style):
    """Detecting the light or dark state of the background element and returning the corresponding description string.

    Args:
        computed_style (str): The computed background color in 'rgb(r, g, b)' format.

    Returns:
        str: "dark" if the background is too dark, "bright" if it is too bright, or "normal" if it is neither.
    """