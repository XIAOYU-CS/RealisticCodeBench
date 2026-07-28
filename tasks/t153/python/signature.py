def is_current_time_within_break_range(start_time: str, end_time: str, current_time: str) -> bool:
    """
    Determines if the current time falls within the break time range.

    Args:
        start_time (str): The start time of the break in HH:MM format.
        end_time (str): The end time of the break in HH:MM format.
        current_time (str): The current time in HH:MM format.

    Returns:
        bool: Returns True if the current time is within the break time range, False otherwise.
    """