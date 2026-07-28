import os
from typing import List, Tuple, Optional, Callable, Union
from PIL import Image
from pathlib import Path

# 兼容不同版本的 Pillow
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
    # Validate input parameters
    if not isinstance(new_size, tuple) or len(new_size) != 2:
        raise ValueError("new_size must be a tuple containing two integers")

    processed_frames = []
    saved_paths = []
    img = None
    original_input_path = input_path  # Keep reference to determine if we should close the image

    try:
        # Process input source (path or opened Image object)
        if isinstance(input_path, (str, Path)):
            input_path = Path(input_path)
            if not input_path.exists():
                raise FileNotFoundError(f"Input file does not exist: {input_path}")
            img = Image.open(input_path)
        elif isinstance(input_path, Image.Image):
            img = input_path
        else:
            raise TypeError("input_path must be a file path or Image object")

        # Create output folder (if saving files is required)
        if output_folder is not None:
            output_folder = Path(output_folder)
            output_folder.mkdir(parents=True, exist_ok=True)

        frame_index = 0
        while True:
            # Check if current frame needs to be filtered
            if frame_filter and not frame_filter(img, frame_index):
                frame_index += 1
                try:
                    img.seek(frame_index)
                except EOFError:
                    break
                continue

            # Scale frame
            resized_frame = img.resize(new_size, resampling_method)
            processed_frames.append(resized_frame.copy())  # Save copy to avoid reference issues

            # Save to file (if output folder is specified)
            if output_folder is not None:
                filename = f"{naming_pattern.format(frame_index)}.{output_format.lower()}"
                frame_path = output_folder / filename
                resized_frame.save(str(frame_path), output_format)
                saved_paths.append(str(frame_path))

            # Prepare next frame
            frame_index += 1
            try:
                img.seek(frame_index)
            except EOFError:
                break  # All frames processed

    except Exception as e:
        raise RuntimeError(f"Error occurred while processing frames: {str(e)}") from e
    finally:
        # Only close images opened through path, avoid closing externally passed Image objects
        if isinstance(original_input_path, (str, Path)) and img is not None:
            img.close()

    return processed_frames, saved_paths