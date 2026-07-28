import base64


def arraybuffer_to_base64(array_buffer, url_safe=False, keep_padding=True):
    """
    Convert ArrayBuffer data to Base64 encoded string, supporting URL-safe options and padding control

    Args:
        array_buffer: Byte buffer data, can be bytes, bytearray, or other byte sequences
        url_safe: Boolean, whether to use URL-safe Base64 encoding (replace + with -, / with _)
        keep_padding: Boolean, whether to keep padding characters =

    Returns:
        str: Processed Base64 encoded string

    Raises:
        ValueError: If conversion fails
        TypeError: If input type is not supported
    """