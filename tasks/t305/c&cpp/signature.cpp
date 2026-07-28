#include <map>
#include <string>
#include <vector>

/**
 * Detect phone numbers in text.
 *
 * @param text Text to search for phone numbers.
 * @param region Region code, supports "global", "cn", and "us".
 * @param custom_pattern Custom regular expression pattern; overrides region when non-empty.
 * @return Detected phone numbers, each with "number" and "type" fields.
 */
std::vector<std::map<std::string, std::string>> detect_phone_numbers(
    const std::string& text,
    const std::string& region = "global",
    const std::string& custom_pattern = ""
);
