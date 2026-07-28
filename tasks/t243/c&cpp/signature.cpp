/**
 * @brief Formats a post count into a human-readable string with zero-padded two-digit number and correct pluralization.
 *
 * The number is formatted as a two-digit string with leading zeros (e.g., 1 → "01", 12 → "12").
 * The word "Post" is used for a count of 1; "Posts" is used for all other values (including 0).
 *
 * Examples:
 * @code
 * format_post_count(1)  → "01 Post"
 * format_post_count(3)  → "03 Posts"
 * format_post_count(0)  → "00 Posts"
 * format_post_count(12) → "12 Posts"
 * @endcode
 *
 * @param[in] count The number of posts (non-negative integer expected).
 * @return A formatted string in the form "NN Post(s)" with NN zero-padded to two digits.
 */
std::string format_post_count(int count);