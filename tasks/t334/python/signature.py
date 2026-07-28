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