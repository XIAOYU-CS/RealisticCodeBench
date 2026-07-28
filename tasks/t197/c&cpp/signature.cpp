/**
 * @brief Determines whether the given file name corresponds to a C++ header file.
 *
 * @param fileName The name (or full path) of the file to check.
 * @return @c true if the file name ends with a recognized C++ header extension; @c false otherwise.
 */
bool is_cpp_header_file(const std::string& fileName);