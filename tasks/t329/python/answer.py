import numpy as np


def make_subimages(a_data, a_mask, back_size_x, back_size_y,
                   edge_mode="pad", pad_value=np.nan):
    """
    Divide input 2D image data and mask into sub-images, and flexibly handle edge parts.

    Args:
        a_data: np.ndarray 2D image data (raw values without mask).
        a_mask: np.ndarray 2D mask data (True indicates the corresponding position is masked).
        back_size_x: Sub-image size along the row direction.
        back_size_y: Sub-image size along the column direction.
        edge_mode: str, optional
            Edge sub-image processing method:
            - "pad": Pad sub-images with insufficient dimensions (default);
            - "keep": Keep the original dimensions of edge sub-images (may be smaller than back_size_x/back_size_y);
            - "discard": Directly discard sub-images with insufficient dimensions (same as original function behavior).
        pad_value: optional
            Padding value when edge_mode is "pad", default is np.nan.

    Returns:
        b: np.ndarray 3D array, each sub-image stored after flattening (edge sub-images processed according to edge_mode).
        c: np.ndarray 2D array, records the count of unmasked values in each sub-image.
    """

    k, l = a_data.shape  # Original image row and column dimensions
    subimage_size_full = back_size_x * back_size_y  # Flattened size of complete sub-image

    if edge_mode == "discard":
        # Discard edges: sub-image count is integer division result (same as original function)
        p = k // back_size_x  # Number of sub-images in row direction
        r = l // back_size_y  # Number of sub-images in column direction
    else:
        # Keep edges: add one more sub-image if there's a remainder
        p = (k + back_size_x - 1) // back_size_x  # Equivalent to ceil(k / back_size_x)
        r = (l + back_size_y - 1) // back_size_y  # Equivalent to ceil(l / back_size_y)

    # Initialize output arrays (adjust b dimensions according to edge_mode)
    if edge_mode == "keep":
        # Edge sub-images may have different dimensions, use object array to store (each element is a 1D sub-image)
        b = np.empty((p, r), dtype=object)
    else:
        # In "pad" or "discard" mode, sub-image dimensions are fixed to back_size_x*back_size_y
        b = np.full((p, r, subimage_size_full), np.nan, dtype=np.float32)
    c = np.zeros((p, r), dtype=np.int32)  # Record the number of valid pixels in each sub-image

    # Iterate over all sub-images
    for i in range(p):  # Changed from prange to range
        for j in range(r):
            # Calculate current sub-image coordinate range in original image
            start_x = i * back_size_x
            end_x = start_x + back_size_x
            start_y = j * back_size_y
            end_y = start_y + back_size_y

            # Extract sub-image data and mask (may exceed original image range)
            sub_data = a_data[start_x:end_x, start_y:end_y].copy()
            sub_mask = a_mask[start_x:end_x, start_y:end_y].copy()
            current_shape = sub_data.shape  # Actual extracted sub-image dimensions (may be smaller than set value)

            # Process edge sub-images
            if edge_mode == "pad" and (current_shape[0] < back_size_x or current_shape[1] < back_size_y):
                # Pad insufficient parts to set dimensions
                pad_x = back_size_x - current_shape[0]
                pad_y = back_size_y - current_shape[1]
                sub_data = np.pad(sub_data,
                                  pad_width=((0, pad_x), (0, pad_y)),
                                  mode="constant",
                                  constant_values=pad_value)
                sub_mask = np.pad(sub_mask,
                                  pad_width=((0, pad_x), (0, pad_y)),
                                  mode="constant",
                                  constant_values=True)  # Treat padded areas as masked
                current_shape = (back_size_x, back_size_y)  # Update to padded dimensions

            # Extract unmasked values from sub-image
            flat_data = sub_data.flatten()
            flat_mask = sub_mask.flatten()
            unmasked_values = flat_data[~flat_mask]  # Boolean indexing to quickly get valid pixels
            count = unmasked_values.size  # Number of valid pixels

            # Store results
            c[i, j] = count
            if edge_mode == "keep":
                # Keep original dimensions, directly store flattened valid pixels (no NaN padding needed)
                b[i, j] = unmasked_values
            else:
                # In "pad" or "discard" mode, pad to fixed dimensions
                b[i, j, :count] = unmasked_values

    return b, c
