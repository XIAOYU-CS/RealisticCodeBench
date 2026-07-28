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