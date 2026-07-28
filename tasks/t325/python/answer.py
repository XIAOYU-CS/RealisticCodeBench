import hashlib
import base64
from typing import Union


def blake2b_hash_with_salt (
        data: Union[str, bytes],
        salt: Union[str, bytes, None] = None,
        digest_size: int = 16,
) -> str:
    """
    Generate a BLAKE2b hash with salt and return URL-safe Base64 encoded result.

    Args:
        data (Union[str, bytes]): The input data to hash. If string, it will be
                                  encoded to bytes using UTF-8.
        salt (Union[str, bytes, None], optional): Salt value to use for hashing.
                                                 If string, it will be encoded to bytes.
                                                 Maximum length is 16 bytes. Defaults to None.
        digest_size (int, optional): The size of the digest in bytes. Must be between 1 and 64.
                                    Defaults to 16.

    Returns:
        str: URL-safe Base64 encoded hash result without padding characters.

    Raises:
        ValueError: If digest_size is not between 1 and 64, or if salt is too long.
        TypeError: If input types are invalid.
    """
    if isinstance(data, str):
        data = data.encode('utf-8')
    if salt is not None and isinstance(salt, str):
        salt = salt.encode('utf-8')
    kwargs = {'digest_size': digest_size}
    if salt is not None:
        kwargs['salt'] = salt
    digest = hashlib.blake2b(data, **kwargs).digest()
    return base64.urlsafe_b64encode(digest).decode('ascii').rstrip("=")