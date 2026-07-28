from typing import Tuple
class ImageResizeParams:
    """Parameters for image resizing and optimization"""

    def __init__(self,
                 quality: int = 80,
                 target_size: Tuple[int, int] = (0, 0),
                 optimize_jpeg: bool = False,
                 progressive_jpeg: bool = False):
        self.quality = quality
        self.target_width, self.target_height = target_size
        self.optimize_jpeg = optimize_jpeg
        self.progressive_jpeg = progressive_jpeg
def resize_image(image_bytes: bytes, params: ImageResizeParams) -> bytes:
    """
    Resizes an image to specified dimensions and optimizes JPEG output

    Parameters:
        image_bytes: Input JPEG image as bytes
        params: ImageResizeParams object containing processing parameters

    Returns:
        Processed image as JPEG bytes
    """