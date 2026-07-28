#include <string>
#include <vector>

/**
 * @brief Convert bytes to a padded standard Base64 string.
 *
 * @param uint8Array The bytes to encode.
 * @return Base64-encoded string.
 */
std::string convertUint8ArrayToBase64(const std::vector<unsigned char>& uint8Array);
