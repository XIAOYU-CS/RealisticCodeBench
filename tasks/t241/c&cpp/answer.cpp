#include <string>
#include <stdexcept>
#include <algorithm>

static std::string add_thousands_sep(int count) {
    std::string s = std::to_string(count);
    for (int pos = static_cast<int>(s.size()) - 3; pos > 0; pos -= 3) {
        s.insert(static_cast<size_t>(pos), ",");
    }
    return s;
}

static std::string format_valid_thread_count(
    int count,
    int padding,
    bool use_zero_pad,
    bool use_thousands_sep,
    const std::string& zero_str,
    const std::string& singular,
    const std::string& plural
) {
    if (count == 0) {
        return zero_str;
    }

    std::string num_str = use_thousands_sep ? add_thousands_sep(count) : std::to_string(count);
    if (!use_thousands_sep && use_zero_pad && num_str.length() < static_cast<size_t>(padding)) {
        num_str = std::string(padding - num_str.length(), '0') + num_str;
    }

    return num_str + " " + (count == 1 ? singular : plural);
}

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
) {
    int thread_count;
    try {
        size_t pos;
        thread_count = std::stoi(count, &pos);
        if (pos != count.length()) {
            throw std::invalid_argument("Invalid characters in input");
        }

        if (thread_count < 0) {
            throw std::invalid_argument("Thread count cannot be negative");
        }
    } catch (const std::exception& e) {
        throw std::invalid_argument("Invalid thread count: " + count + " (must be non-negative integer)");
    }

    return format_valid_thread_count(thread_count, padding, use_zero_pad, use_thousands_sep, zero_str, singular, plural);
}

std::string thread_count_to_formatted_string(
    int count,
    int padding = 2,
    bool use_zero_pad = false,
    bool use_thousands_sep = false,
    const std::string& zero_str = "No Threads",
    const std::string& singular = "Thread",
    const std::string& plural = "Threads"
) {
    if (count < 0) {
        throw std::invalid_argument("Invalid thread count: " + std::to_string(count) + " (must be non-negative integer)");
    }

    return format_valid_thread_count(count, padding, use_zero_pad, use_thousands_sep, zero_str, singular, plural);
}
