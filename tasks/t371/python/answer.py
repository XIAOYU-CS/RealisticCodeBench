import os
import shutil


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
    # Parameter validation
    if not source_path or not dest_path:
        return (False, "[invalid argument]")

    try:
        # Resolve paths
        resolved_source = os.path.abspath(source_path)
        resolved_dest = os.path.abspath(dest_path)

        # Check source file
        if not os.path.exists(resolved_source):
            return (False, "[cannot resolve source path]")

        if os.path.islink(resolved_source) and not follow_symlinks:
            return (False, "[source is symlink, not followed]")

        if not os.path.isfile(resolved_source):
            return (False, "[source is not a file]")

        # Check destination file
        if os.path.exists(resolved_dest):
            if not overwrite:
                return (False, "[destination exists, not overwritten]")
            if os.path.isdir(resolved_dest):
                return (False, "[destination is a directory]")

        # Ensure destination directory exists
        dest_dir = os.path.dirname(resolved_dest)
        os.makedirs(dest_dir, exist_ok=True)

        # Choose copy method based on options
        if follow_symlinks:
            # Handle symbolic link special case - manually copy file content
            with open(resolved_source, 'rb') as src, open(resolved_dest, 'wb') as dst:
                while True:
                    buffer = src.read(buffer_size)
                    if not buffer:
                        break
                    dst.write(buffer)
            # If metadata preservation is needed, copy it manually
            if preserve_metadata:
                stat_info = os.stat(resolved_source)
                os.utime(resolved_dest, (stat_info.st_atime, stat_info.st_mtime))
        else:
            # Use shutil standard copy methods
            copy_func = shutil.copy2 if preserve_metadata else shutil.copy
            copy_func(resolved_source, resolved_dest)

        # Verify copy result
        if os.path.getsize(resolved_source) != os.path.getsize(resolved_dest):
            os.remove(resolved_dest)
            return (False, "[file size mismatch after copy]")

        return (True, "[file copied successfully]")

    except PermissionError:
        return (False, "[permission denied]")
    except Exception as e:
        # Clean up partially created file
        if os.path.exists(resolved_dest):
            try:
                os.remove(resolved_dest)
            except:
                pass
        return (False, f"[copy failed: {str(e)}]")
