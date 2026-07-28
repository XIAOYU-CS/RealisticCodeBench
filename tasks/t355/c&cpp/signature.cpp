/**
 * @brief Convert ArrayBuffer data to Base64 encoded string, supporting URL-safe options and padding control
 * 
 * @param array_buffer Byte buffer data, can be bytes, bytearray, or other byte sequences
 * @param url_safe Boolean, whether to use URL-safe Base64 encoding (replace + with -, / with _)
 * @param keep_padding Boolean, whether to keep padding characters =
 * @return std::string Processed Base64 encoded string
 * @throws std::invalid_argument If conversion fails
 * @throws std::runtime_error If input type is not supported
 */
std::string arraybuffer_to_base64(const std::vector<uint8_t>& array_buffer, bool url_safe = false, bool keep_padding = true);
