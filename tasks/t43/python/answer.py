def transform_dict_lists_to_list_dicts(dict_of_lists: dict):
    """
    Convert a dictionary of lists into a list of dictionaries.

    Args:
        dict_of_lists (dict): A dictionary where each key has a list as its value.

    Returns:
        list of dicts: A list where each item is a dictionary formed by corresponding
                      elements of lists in the input dictionary.

    Raises:
        ValueError: If lists in the dictionary are of different lengths or
                   if any value is not a list.
    """
    # 处理空字典的情况
    if len(dict_of_lists) == 0:
        return []

    # 检查所有值是否都是列表
    for key, value in dict_of_lists.items():
        if not isinstance(value, (list, tuple)):
            raise ValueError(f"Value for key '{key}' is not a list or tuple.")

    # 获取所有列表的长度
    list_lengths = [len(lst) for lst in dict_of_lists.values()]

    # 检查所有列表长度是否相同
    if len(set(list_lengths)) != 1:
        raise ValueError("All lists in the dictionary must have the same length.")

    # 如果所有列表都为空，返回空列表
    if list_lengths[0] == 0:
        return []

    # 使用 zip 同时遍历所有列表
    keys = dict_of_lists.keys()
    list_of_dicts = [dict(zip(keys, values)) for values in zip(*dict_of_lists.values())]

    return list_of_dicts