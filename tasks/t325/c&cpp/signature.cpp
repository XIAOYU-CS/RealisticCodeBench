#include <cstdint>
#include <string>
#include <variant>
#include <vector>

/**
 * @brief Generate a BLAKE2b hash with salt and return URL-safe Base64 encoded result.
 * 
 * @param data The input data to hash. If string, it will be encoded to bytes using UTF-8.
 * @param salt Salt value to use for hashing. If string, it will be encoded to bytes.
 *             Maximum length is 16 bytes. Defaults to nullptr.
 * @param digest_size The size of the digest in bytes. Must be between 1 and 64.
 *                    Defaults to 16.
 * @return std::string URL-safe Base64 encoded hash result without padding characters.
 * @throws std::invalid_argument If digest_size is not between 1 and 64, or if salt is too long.
 * @throws std::runtime_error If input types are invalid.
 */
std::string blake2b_hash_with_salt(
    const std::variant<std::string, std::vector<uint8_t>>& data,
    const std::variant<std::string, std::vector<uint8_t>, std::nullptr_t>& salt = nullptr,
    int digest_size = 16
);
