def build_table_task(
        pos1_chunk,
        initial_value,
        flags,
        basis,
        inv_basis,
        modulus
):
    """
    Build a lookup table by processing position chunks to generate key-value mappings

    Parameters:
        pos1_chunk: Collection of position chunks, each containing a sequence of indices
        initial_value: Initial calculation value (originally A_initial)
        flags: Flag array that determines whether to use basis or inv_basis (originally d_l_msb_bits)
        basis: Array of basis elements (originally X_basis)
        inv_basis: Array of inverse basis elements (originally X_inv_basis)
        modulus: Modulus value (originally n)

    Returns:
        dict: Lookup table with calculation results as keys and position chunks as values

    Exceptions:
        ValueError: Triggered when input data is invalid or indices are out of range
        TypeError: Triggered when input parameter types are incorrect
    """
    if not isinstance(pos1_chunk, (list, tuple)):
        raise TypeError("pos1_chunk must be a list or tuple")
    if not all(isinstance(chunk, (list, tuple)) for chunk in pos1_chunk):
        raise TypeError("Elements in pos1_chunk must be lists or tuples")
    if not isinstance(flags, (list, tuple)):
        raise TypeError("flags must be a list or tuple")
    if not isinstance(basis, (list, tuple)):
        raise TypeError("basis must be a list or tuple")
    if not isinstance(inv_basis, (list, tuple)):
        raise TypeError("inv_basis must be a list or tuple")
    if not isinstance(modulus, int) or modulus <= 0:
        raise ValueError("modulus must be a positive integer")

    max_valid_idx = max(len(flags), len(basis), len(inv_basis)) - 1
    if max_valid_idx < 0:
        raise ValueError("flags, basis, and inv_basis cannot all be empty")

    table_chunk = {}
    for pos1 in pos1_chunk:
        for idx in pos1:
            if not isinstance(idx, int):
                raise TypeError(f"Indices must be integers, found {type(idx)}")
            if idx < 0 or idx > max_valid_idx:
                raise ValueError(f"Index {idx} is out of valid range [0, {max_valid_idx}]")

        lhs = initial_value
        for idx in pos1:
            if flags[idx] == 1:
                lhs = lhs * inv_basis[idx] % modulus
            else:
                lhs = lhs * basis[idx] % modulus

        table_chunk[lhs] = pos1

    return table_chunk