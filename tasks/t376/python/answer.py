from PIL import Image
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
    if params.target_width <= 0 or params.target_height <= 0:
        raise ValueError("Target width and height must be positive values")

    if not (1 <= params.quality <= 100):
        raise ValueError("Image quality must be between 1 and 100")

    try:
        with Image.open(io.BytesIO(image_bytes)) as img:
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
                background.paste(img, img.split()[-1])
                img = background
            elif img.mode not in ('RGB', 'L'):
                img = img.convert('RGB')

            print(f"\r{' ' * 80}\r", end='')  # Clear previous line
            print(f"Quality: {params.quality}% | Resizing to: {params.target_width}x{params.target_height} "
                  f"{'| Optimized' if params.optimize_jpeg else ''}"
                  f"{'| Progressive' if params.progressive_jpeg else ''}", end='', flush=True)

            resized_img = img.resize(
                (params.target_width, params.target_height),
                resample=Image.Resampling.LANCZOS
            )

            output_buffer = io.BytesIO()
            resized_img.save(
                output_buffer,
                format='JPEG',
                quality=params.quality,
                optimize=params.optimize_jpeg,
                progressive=params.progressive_jpeg,
                subsampling='4:4:4'  # Maintain high quality color sampling
            )

            return output_buffer.getvalue()

    except Exception as e:
        raise RuntimeError(f"Image processing failed: {str(e)}")