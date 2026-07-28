from pathlib import Path
from typing import Union, Optional, Tuple, Callable, List

from PIL import Image
try:
    from PIL.Image import Resampling

    RESAMPLING_LANCZOS = Resampling.LANCZOS
except ImportError:
    try:
        from PIL.Image import ImageResampling

        RESAMPLING_LANCZOS = ImageResampling.LANCZOS
    except ImportError:
        # For older versions of Pillow
        RESAMPLING_LANCZOS = Image.LANCZOS



def process_animation_frames(
        input_path: Union[str, Path, Image.Image],
        output_folder: Optional[Union[str, Path]] = None,
        new_size: Tuple[int, int] = (128, 128),
        output_format: str = "TGA",
        naming_pattern: str = "frame_{:04d}",
        resampling_method=RESAMPLING_LANCZOS,
        frame_filter: Optional[Callable[[Image.Image, int], bool]] = None
) -> Tuple[List[Image.Image], List[str]]:
    """
    Extract frames from animation files, perform scaling processing, and optionally save to files

    Parameters:
        input_path: Animation file path or opened Image object
        output_folder: Output folder path, if None, files will not be saved
        new_size: Scaled dimensions (width, height)
        output_format: Output image format (e.g. "TGA", "PNG", "JPEG")
        naming_pattern: Filename format string, must contain one integer placeholder
        resampling_method: Scaling algorithm
        frame_filter: Frame filtering function, returns True to keep the frame, False to skip

    Returns:
        List of processed frames and list of saved file paths
    """