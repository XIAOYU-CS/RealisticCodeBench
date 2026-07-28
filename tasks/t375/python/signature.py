def compute_stereo_from_rgbd(self, im_depth):
    """
    Compute stereo information from RGBD depth image

    Args:
        im_depth: Input depth image (cv2 Mat)

    Raises:
        ValueError: If input depth image is empty or has unsupported type
    """