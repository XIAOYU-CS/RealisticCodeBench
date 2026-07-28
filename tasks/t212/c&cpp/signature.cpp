/**
 * @brief Converts a hash buffer to a compact alphanumeric string (length ≥ 5) using Base62 encoding.
 *
 * The result consists of characters from the Base62 alphabet: digits (0–9), lowercase letters (a–z),
 * and uppercase letters (A–Z). The output string is guaranteed to be at least 5 characters long.
 *
 * @param[in] hash The hash buffer (as a byte string) to be encoded.
 * @return A Base62-encoded alphanumeric string representation of the hash, with minimum length of 5.
 */
std::string compress_hash_to_alphanumeric(const std::string& hash);