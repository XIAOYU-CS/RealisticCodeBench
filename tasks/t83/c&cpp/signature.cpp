/**
 * @brief Converts the encoding of a file from one encoding to another.
 *
 * @param input_file_path  Path to the input file.
 * @param output_file_path Path to the output file where the converted content will be saved.
 * @param original_encoding Original encoding of the input file (default: "cp932").
 * @param target_encoding   Target encoding to convert to (default: "utf_16").
 * @return true if the conversion was successful or if no conversion was needed; false otherwise.
 */
bool convert_encoding(const std::string& input_file_path,
                      const std::string& output_file_path,
                      const std::string& original_encoding = "cp932",
                      const std::string& target_encoding = "utf_16");