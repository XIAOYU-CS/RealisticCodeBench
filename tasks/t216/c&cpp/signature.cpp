/**
 * @brief Converts a given number of bytes into a human-readable string with appropriate binary units.
 *
 * Uses binary (base-1024) units and appends the corresponding unit suffix:
 * - Bytes (B) for values < 1024,
 * - Kilobytes (KB) for values ≥ 1024 and < 1024²,
 * - Megabytes (MB) for values ≥ 1024² and < 1024³,
 * - Gigabytes (GB) for values ≥ 1024³ and < 1024⁴,
 * - Terabytes (TB) for values ≥ 1024⁴.
 *
 * The result is formatted with exactly two decimal places for KB and larger units,
 * while "Bytes" is displayed as an integer (e.g., "1,023 Bytes").
 *
 * @param[in] bytes The number of bytes to convert (must be non-negative).
 * @return A human-readable size string such as "1.50 KB", "256.00 MB", or "1,023 Bytes".
 */
std::string convert_bytes_to_human_readable(long long bytes);