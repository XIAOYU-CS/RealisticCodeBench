def opc_data_to_pixels(data, format='rgb', normalize=False):
    """
    Convert the OPC raw data into a list of pixel colors

    Parameter:
        data: Raw byte data
        format: Color format, supporting 'rgb' (default), 'rgba', 'grb', 'bgr'
        normalize: Whether to normalize values ranging from 0 to 255 to the range of 0.0 to 1.0

    Return:
        A list of color tuples, with each tuple representing the color of a pixel
    """
    pixels = []
    bytes_per_pixel = 4 if format == 'rgba' else 3

    pixel_count = len(data) // bytes_per_pixel

    for i in range(pixel_count):
        start = i * bytes_per_pixel
        pixel_bytes = data[start:start + bytes_per_pixel]

        if format == 'rgb':
            r, g, b = pixel_bytes[0], pixel_bytes[1], pixel_bytes[2]
            color = (r, g, b)
        elif format == 'rgba':
            r, g, b, a = pixel_bytes[0], pixel_bytes[1], pixel_bytes[2], pixel_bytes[3]
            color = (r, g, b, a)
        elif format == 'grb':
            g, r, b = pixel_bytes[0], pixel_bytes[1], pixel_bytes[2]
            color = (r, g, b)
        elif format == 'bgr':
            b, g, r = pixel_bytes[0], pixel_bytes[1], pixel_bytes[2]
            color = (r, g, b)
        else:
            raise ValueError(f"不支持的颜色格式: {format}")

        if normalize:
            color = tuple(channel / 255.0 for channel in color)

        pixels.append(color)

    return pixels