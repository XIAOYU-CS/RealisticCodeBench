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