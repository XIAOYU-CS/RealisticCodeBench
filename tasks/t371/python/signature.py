def copy_file(
        source_path,
        dest_path,
        overwrite=False,
        preserve_metadata=True,
        follow_symlinks=False,
        buffer_size=1024 * 1024  # 1MB buffer
):
    """
    Copy file from source path to destination path with multiple feature options

    Args:
        source_path (str): Source file path
        dest_path (str): Destination file path
        overwrite (bool): Whether to overwrite if destination file exists, default False
        preserve_metadata (bool): Whether to preserve file metadata, default True
        follow_symlinks (bool): Whether to follow symbolic links, default False
        buffer_size (int): Buffer size used for copying, default 1MB

    Returns:
        tuple: (success, result_message)
    """