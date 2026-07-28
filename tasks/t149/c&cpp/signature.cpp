/**
 * @brief Compresses an HTML string by removing unnecessary whitespace while preserving semantic structure.
 *
 * @param html The input HTML string to compress.
 * @return A @c std::string containing the compressed HTML with minimal, render-safe whitespace.
 */
std::string compress_html(const std::string& html);