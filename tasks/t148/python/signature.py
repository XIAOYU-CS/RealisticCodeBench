from typing import List, TypeVar, Union, Dict, Any, Optional
import math

T = TypeVar('T')


def remove_elements(
        array: List[T],
        element: T,
        options: Optional[Dict[str, Any]] = None
) -> List[T]:
    """
    Removes elements from a list based on specified criteria.

    Args:
        array: The list to remove elements from
        element: The element to be removed
        options: Configuration options
            mode: Removal mode - 'first', 'all', or 'limit' (default: 'first')
            limit: Number of elements to remove when mode is 'limit' (default: 1)
            use_strict: Whether to use strict equality (is) or loose equality (==) (default: True)

    Returns:
        A new list with specified elements removed

    Raises:
        TypeError: If the first argument is not a list
        ValueError: If mode is not one of 'first', 'all', or 'limit'
        ValueError: If limit is not a positive integer when mode is 'limit'
    """