#include <cstdint>
#include <optional>
#include <string>

/**
 * @brief Formats a given number of bytes into a human-readable string representation,
 *        using either the SI (decimal) or binary (accurate) size notation.
 *
 * @param[in] bytes The number of bytes to format.
 * @param[in] decimals Optional number of decimal places to include in the output. Default is 0.
 * @param[in] sizeType Optional specification of whether to use binary ("accurate")
 *                     or decimal ("normal") units.
 *                     - "accurate": uses binary units like KiB, MiB (base 1024).
 *                     - "normal": uses units like KB, MB.
 *                     Default is "normal".
 * @return A string representation of the byte size in a human-readable format.
 */
std::string format_bytes(
    uint64_t bytes,
    std::optional<int> decimals = std::nullopt,
    std::optional<std::string> sizeType = std::nullopt);
