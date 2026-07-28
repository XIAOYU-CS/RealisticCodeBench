import hashlib

def compress_hash_to_alphanumeric(hash_bytes: bytes) -> str:
    """Converts a hash buffer to a compact alphanumeric string (length ≥ 5) using base62 encoding.

    The result contains numbers (0-9), lowercase letters (a-z), and uppercase letters (A-Z).

    Args:
        hash_buffer: The hash buffer (bytes) to be encoded.

    Returns:
        A base62-encoded string representation of the hash, with length at least 5.
    """
    # Convert the hash buffer to a number in base 16 (hexadecimal)
    num = int.from_bytes(hash_bytes, byteorder='big')

    # Define the base and alphabet for encoding
    base = 62
    alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    # Initialize the result string
    result = ""

    # Convert the number to the desired base (base 62) and construct the compressed string
    while len(result) < 5:
        remainder = num % base
        result += alphabet[remainder]
        num //= base

    return result