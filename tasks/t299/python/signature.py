def check_xor_constraints(data:list, xor_groups:list, target_values:list)->list[bool]:
    """
    Check whether each row in data satisfies multiple XOR constraints.

    Args:
        data (array-like): 2D array or list with shape (N, C), where N is the number of rows and C is the number of columns.
        xor_groups (list of lists): Each sublist contains column indices to XOR, e.g., [[0,3,6], [1,4,7], [2,5]].
        target_values (list of int): Target XOR result for each group, e.g., [0x6b, 0x76, 0x12].

    Returns:
        list of bool: A boolean list of length N, indicating whether each row satisfies all XOR constraints.
    """