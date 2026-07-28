def check_all_same_attribute(obj_list:list, attr_name:str, comparator=None, default=None):
    """
    Check if all objects in the list have the same value for the specified attribute

    Args:
        obj_list: List of objects to check
        attr_name: Name of the attribute to check
        comparator: Custom comparison function that takes two values and returns boolean,
                   defaults to simple equality comparison
        default: Default value to use when an object is missing the attribute

    Returns:
        Boolean indicating whether all objects have the same attribute value according to the comparison
    """