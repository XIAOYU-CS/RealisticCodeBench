/**
 * @brief Checks whether the provided string is a valid Base64-encoded image data URI or raw Base64 image string.
 *
 * @param imageData The string to validate as Base64-encoded image data.
 * @return @c true if @p imageData appears to be valid Base64-encoded image data; @c false otherwise.
 */
bool is_base64_encoded_image_data(const std::string& imageData);