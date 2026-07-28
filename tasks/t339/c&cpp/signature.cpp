/**
 * @brief Finds all picture files in specified directory with customizable extensions.
 * 
 * @param directory Root directory to search. Defaults to "/media/".
 * @param allowed_extensions List of allowed file extensions (e.g., {".jpg", ".png"}).
 *                           Defaults to {".jpg"} if not specified.
 * @return std::vector<std::string> Absolute paths of found picture files
 * @throws std::invalid_argument If the specified directory does not exist
 * @throws std::runtime_error If there's no permission to access the directory
 */
std::vector<std::string> get_foto_files(
    const std::string& directory = "/media/",
    const std::vector<std::string>& allowed_extensions = {".jpg"}
);
