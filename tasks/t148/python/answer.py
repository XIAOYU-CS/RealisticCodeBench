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
    if options is None:
        options = {}

    # Type checking
    if not isinstance(array, list):
        raise TypeError('第一个参数必须是列表')

    # Default configuration: remove first only, use strict comparison
    mode = options.get('mode', 'first')  # Mode: 'first' (default), 'all', 'limit'
    limit = options.get('limit', 1)  # Takes effect when mode is 'limit', specifies removal count
    use_strict = options.get('use_strict', True)  # Whether to use strict comparison

    # Validate configuration legality
    if mode not in ['first', 'all', 'limit']:
        raise ValueError("mode参数必须是 'first', 'all' 或 'limit'")

    if mode == 'limit' and (not isinstance(limit, int) or limit < 1):
        raise ValueError("当mode为'limit'时，limit必须是大于0的整数")

    # Return empty list directly if input is empty
    if len(array) == 0:
        return []

    new_array = []
    removed_count = 0
    max_remove = float('inf') if mode == 'all' else (limit if mode == 'limit' else 1)

    for item in array:
        # Check for match
        is_nan_match = _is_nan(element) and _is_nan(item)

        if use_strict:
            is_match = item is element
        else:
            try:
                is_match = item == element
            except:
                is_match = False

        should_remove = (is_match or is_nan_match) and removed_count < max_remove

        if should_remove:
            removed_count += 1
        else:
            new_array.append(item)

    # Return a copy of the original list if no elements were removed
    return new_array if removed_count > 0 else array.copy()


def _is_nan(value) -> bool:
    """
    Check if a value is NaN (Not a Number).

    Args:
        value: The value to check

    Returns:
        True if the value is NaN, False otherwise
    """
    try:
        return isinstance(value, float) and math.isnan(value)
    except (TypeError, ValueError):
        return False


# 为了与JavaScript行为保持一致，提供一个宽松比较的辅助函数
def _loose_equal(a, b) -> bool:
    """
    Perform loose equality comparison similar to JavaScript == operator.

    Args:
        a: First value to compare
        b: Second value to compare

    Returns:
        True if values are loosely equal, False otherwise
    """
    try:
        return a == b or str(a) == str(b)
    except:
        return False


# 如果需要更精确的JavaScript风格的宽松比较，可以使用这个版本
def remove_elements_js_loose(
        array: List[T],
        element: T,
        options: Optional[Dict[str, Any]] = None
) -> List[T]:
    """
    Alternative implementation with JavaScript-style loose equality.
    """
    if options is None:
        options = {}

    # Type checking
    if not isinstance(array, list):
        raise TypeError('第一个参数必须是列表')

    # Default configuration
    mode = options.get('mode', 'first')
    limit = options.get('limit', 1)
    use_strict = options.get('use_strict', True)

    # Validate configuration
    if mode not in ['first', 'all', 'limit']:
        raise ValueError("mode参数必须是 'first', 'all' 或 'limit'")

    if mode == 'limit' and (not isinstance(limit, int) or limit < 1):
        raise ValueError("当mode为'limit'时，limit必须是大于0的整数")

    if len(array) == 0:
        return []

    new_array = []
    removed_count = 0
    max_remove = float('inf') if mode == 'all' else (limit if mode == 'limit' else 1)

    for item in array:
        # Check for match
        is_nan_match = _is_nan(element) and _is_nan(item)

        if use_strict:
            is_match = item is element or item == element
        else:
            is_match = _loose_equal(item, element)

        should_remove = (is_match or is_nan_match) and removed_count < max_remove

        if should_remove:
            removed_count += 1
        else:
            new_array.append(item)

    return new_array if removed_count > 0 else array.copy()