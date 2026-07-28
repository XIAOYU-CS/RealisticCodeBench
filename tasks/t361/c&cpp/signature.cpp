#pragma once

#include <any>
#include <map>
#include <optional>
#include <string>

/**
 * @brief Parses a string to extract dynamic identifier values and returns the remaining custom ID
 *
 * This function extracts dynamic values enclosed by specified delimiters from a string
 * and returns the custom ID portion along with the extracted dynamic value.
 *
 * @param value The input string to parse
 * @param dynamic_value_required Whether to always include dynamic_value in result
 * @param config Configuration options for parsing
 *               - prefix: The prefix delimiter for dynamic values (default: "{")
 *               - suffix: The suffix delimiter for dynamic values (default: "}_")
 *               - regex: Custom regular expression (takes precedence over prefix/suffix)
 * @return Dict containing custom_id and optionally dynamic_value
 */
std::map<std::string, std::optional<std::string>> parse_dynamic_id(
    const std::string& value,
    bool dynamic_value_required = false,
    const std::optional<std::map<std::string, std::any>>& config = std::nullopt
);
