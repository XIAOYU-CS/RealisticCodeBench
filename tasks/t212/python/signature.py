def compress_hash_to_alphanumeric(hash_bytes: bytes) -> str:
    """Converts a hash buffer to a compact alphanumeric string (length ≥ 5) using base62 encoding.

    The result contains numbers (0-9), lowercase letters (a-z), and uppercase letters (A-Z).

    Args:
        hash_buffer: The hash buffer (bytes) to be encoded.

    Returns:
        A base62-encoded string representation of the hash, with length at least 5.
    """