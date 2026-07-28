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
    try:
        # Uniformly convert to bytes type
        if isinstance(array_buffer, (bytes, bytearray, memoryview)):
            byte_data = bytes(array_buffer)
        else:
            # Try to convert other sequence types to bytes
            byte_data = bytes(array_buffer)

        # Choose encoding method based on URL safety option
        if url_safe:
            encoded_bytes = base64.urlsafe_b64encode(byte_data)
        else:
            encoded_bytes = base64.b64encode(byte_data)

        # Convert bytes to string
        base64_str = encoded_bytes.decode('utf-8')

        # Remove padding characters if not needed
        if not keep_padding:
            base64_str = base64_str.rstrip('=')

        return base64_str
    except (TypeError, ValueError) as e:
        raise ValueError(f"Error occurred while converting ArrayBuffer to Base64: {str(e)}")