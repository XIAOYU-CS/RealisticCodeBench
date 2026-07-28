#include <string>

/**
 * @brief Format thread count into user-friendly string with customizable formatting and text
 *
 * This function converts a thread count to a formatted string with various customization options
 * including padding, thousands separators, and custom text for different cases.
 *
 * @param count Thread count as string (will be converted to integer)
 * @param padding Minimum digits for zero-padding (only effective when use_zero_pad is true)
 * @param use_zero_pad Whether to pad numbers with zeros
 * @param use_thousands_sep Whether to use thousands separator (like 1,000)
 * @param zero_str Text to display when thread count is 0
 * @param singular Singular noun when thread count is 1
 * @param plural Plural noun when thread count is greater than 1
 *
 * @return Formatted thread count string
 *
 * @throws std::invalid_argument Raised when count cannot be converted to non-negative integer
 *
 * @since C++11
 */
std::string thread_count_to_formatted_string(
    const std::string& count,
    int padding = 2,
    bool use_zero_pad = false,
    bool use_thousands_sep = false,
    const std::string& zero_str = "No Threads",
    const std::string& singular = "Thread",
    const std::string& plural = "Threads"
);

std::string thread_count_to_formatted_string(
    int count,
    int padding = 2,
    bool use_zero_pad = false,
    bool use_thousands_sep = false,
    const std::string& zero_str = "No Threads",
    const std::string& singular = "Thread",
    const std::string& plural = "Threads"
);
