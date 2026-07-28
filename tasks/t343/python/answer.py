import random
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
    # Handle data source
    if data_source is not None:
        population = data_source
        if len(population) < size:
            raise ValueError("Length of data source is smaller than subset size")
    else:
        # Generate integer range
        population = list(range(start, stop, step))
        if len(population) < size:
            raise ValueError("Specified range cannot produce a subset of the required size")

    subsets = []
    max_attempts = count * 10  # Maximum number of attempts to prevent infinite loops
    attempts = 0

    while len(subsets) < count and attempts < max_attempts:
        attempts += 1

        # Select a continuous segment or random elements from the data source
        if data_source is None and step == 1:
            # Maintain original logic: select a continuous segment
            max_start_idx = len(population) - size
            start_idx = random.randint(0, max_start_idx)
            subset = population[start_idx:start_idx + size]
        else:
            # Randomly sample elements (possibly non-consecutive)
            subset = random.sample(population, size)

        # Handle sorting
        if not shuffle and data_source is None:
            subset.sort()

        # Handle deduplication
        if not allow_duplicates:
            # Check if the subset already exists
            if any(set(subset) == set(existing) for existing in subsets):
                continue

        subsets.append(subset)

    if len(subsets) < count:
        raise RuntimeWarning(f"Could not generate enough unique subsets; only generated {len(subsets)}")

    return subsets