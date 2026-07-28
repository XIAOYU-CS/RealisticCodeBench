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