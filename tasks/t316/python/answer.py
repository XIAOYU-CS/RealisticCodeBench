def sort_dicts_by_fields(dict_list, sort_fields, missing_strategy='default', default_value=None):
    """
    Sort a list of dictionaries by multiple fields with priority and handle missing fields.

    Args:
        dict_list (list): List of dictionaries to be sorted
        sort_fields (list): List of tuples (field_name, ascending) for sorting
                           field_name (str): Name of the field to sort by
                           ascending (bool): True for ascending order, False for descending
        missing_strategy (str): Strategy for handling missing fields
                               'default' - Use default_value
                               'first' - Missing fields come first
                               'last' - Missing fields come last
        default_value: Default value when missing_strategy is 'default'

    Returns:
        list: Sorted list of dictionaries
    """

    def get_sort_key(item):
        """Generate sort key for an item."""
        key_parts = []

        for field_name, ascending in sort_fields:
            # Check if field exists
            if field_name in item:
                value = item[field_name]
                has_value = True
            else:
                has_value = False
                if missing_strategy == 'default':
                    value = default_value
                elif missing_strategy == 'first':
                    # Special marker for missing values that should come first
                    key_parts.append((-1, 0))  # -1 sorts before 0
                    continue
                elif missing_strategy == 'last':
                    # Special marker for missing values that should come last
                    key_parts.append((1, 0))  # 1 sorts after 0
                    continue

            # Handle sort direction
            if ascending:
                key_parts.append((0, value))
            else:
                # For descending order with numeric values
                if isinstance(value, (int, float)):
                    key_parts.append((0, -value))
                else:
                    # For strings and other types in descending order
                    # We'll handle this with post-processing or use reverse flag smartly
                    key_parts.append((0, value))

        return tuple(key_parts)

    return sorted(dict_list, key=get_sort_key)