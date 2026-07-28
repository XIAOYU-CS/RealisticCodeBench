/**
 * @brief Copy file from source path to destination path with multiple feature options
 * 
 * @param source_path Source file path
 * @param dest_path Destination file path
 * @param overwrite Whether to overwrite if destination file exists, default false
 * @param preserve_metadata Whether to preserve file metadata, default true
 * @param follow_symlinks Whether to follow symbolic links, default false
 * @param buffer_size Buffer size used for copying, default 1MB
 * @return std::tuple<bool, std::string> (success, result_message)
 */
std::tuple<bool, std::string> copy_file(
    const std::string& source_path,
    const std::string& dest_path,
    bool overwrite = false,
    bool preserve_metadata = true,
    bool follow_symlinks = false,
    int buffer_size = 1024 * 1024
);
