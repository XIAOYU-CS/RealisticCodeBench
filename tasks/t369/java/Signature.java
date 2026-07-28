/**
 * Move one or more files or directories to a destination path.
 *
 * @param sources A single source path or a list of source paths to move
 * @param destination The destination path where files/directories will be moved
 * @param overwrite Whether to overwrite the destination if it already exists
 * @return A tuple containing two lists: success_list and fail_list
 * @throws NotADirectoryException If multiple sources are provided and the destination is not an existing directory
 * @throws FileAlreadyExistsException If the destination exists and overwrite is False in a single-source move
 */
public static Tuple<List<String>, List<Tuple<String, String>>> mv(
        Object sources, String destination, boolean overwrite)
        throws NotADirectoryException, FileAlreadyExistsException {}