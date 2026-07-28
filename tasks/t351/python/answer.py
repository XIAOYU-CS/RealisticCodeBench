import re

def parse_rank_range(rank_range, step=1):
    """Parses a string representing a list of ranks or rank ranges into an array of numbers.

    The input string can contain:
    - Single integers: "1, 2, 3"
    - Ranges separated by double hyphen "--" or single hyphen "-": "1--5", "10-5"
    - Mixed format: "1, 3--7, 10"

    A step value controls the increment/decrement within ranges.
    Only integers (or values convertible to integers) are supported.

    Args:
        rank_range (str): The string containing ranks and/or ranges.
        step (int, optional): The increment step for ranges (must be positive). Defaults to 1.

    Returns:
        list[int]: An array of parsed integers in order.
    """
    rank_array = []

    # Input validation
    if not isinstance(rank_range, str) or step <= 0:
        return rank_array

    # Split and trim each part
    rank_elements = [el.strip() for el in rank_range.split(',')]

    for rank_element in rank_elements:
        # Match range format: start--end or start-end (both supported)
        range_match = re.match(r'^(-?\d+)-{1,2}(\d+)$', rank_element)
        if range_match:
            start_str, end_str = range_match.groups()
            try:
                start = int(start_str)
                end = int(end_str)

                # Generate sequence based on direction and step
                if start <= end:
                    for i in range(start, end + 1, step):
                        rank_array.append(i)
                else:
                    for i in range(start, end - 1, -step):
                        rank_array.append(i)
            except ValueError:
                # Skip invalid numbers
                continue
        else:
            # Try parsing as a single number
            try:
                num = int(rank_element)
                rank_array.append(num)
            except ValueError:
                # Ignore invalid entries
                continue

    return rank_array