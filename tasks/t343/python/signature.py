from typing import List, Any, Optional


def generate_random_subsets(
        start: int,
        stop: int,
        size: int,
        count: int,
        step: int = 1,
        allow_duplicates: bool = True,
        shuffle: bool = False,
        data_source: Optional[List[Any]] = None
) -> List[List[Any]]:
    """
    Generate a specified number of random subsets

    Parameters:
        start: Start value of the integer range (inclusive)
        stop: End value of the integer range (exclusive)
        size: Number of elements in each subset
        count: Number of subsets to generate
        step: Step size between elements, default is 1 (consecutive integers)
        allow_duplicates: Whether to allow duplicate subsets, default is True
        shuffle: Whether to randomly shuffle elements within subsets, default is False
        data_source: Optional data source list; if provided, elements will be selected from this list

    Returns:
        A list containing multiple subsets
    """