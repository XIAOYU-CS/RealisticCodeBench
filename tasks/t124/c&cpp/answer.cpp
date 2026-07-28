#include <iostream>
#include <string>
#include <regex>
#include <vector>
#include <sstream>

/**
 * @brief Check if the specified year is a leap year
 *
 * Leap year rules:
 * - Years divisible by 4 but not by 100 are leap years
 * - Years divisible by 400 are leap years
 *
 * @param year The year to check
 * @return bool True if it's a leap year, false otherwise
 */
bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

/**
 * @brief Get the number of days in the specified month
 *
 * Returns the number of days in a month based on the month and year, considering leap years for February
 *
 * @param month Month (1-12)
 * @param year Year
 * @return int Number of days in the month, returns 0 if month is invalid
 */
int daysInMonth(int month, int year) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2:
            return isLeapYear(year) ? 29 : 28;
        default:
            return 0;
    }
}

/**
 * @brief Validate the correctness of a date
 *
 * Checks if year, month, and day are within valid ranges:
 * - Year: 1000-9999
 * - Month: 1-12
 * - Day: 1-maximum days for that month
 *
 * @param year Year
 * @param month Month
 * @param day Day
 * @return bool True if the date is valid, false otherwise
 */
bool isValidDate(int year, int month, int day) {
    if (year < 1000 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > daysInMonth(month, year)) return false;
    return true;
}

/**
 * @brief Parse a date string according to the specified format
 *
 * Parses a date string based on the given format and validates its correctness
 *
 * @param dateStr The date string to parse
 * @param format The date format string
 * @param[out] year Parsed year
 * @param[out] month Parsed month
 * @param[out] day Parsed day
 * @return bool True if parsing is successful and the date is valid, false otherwise
 *
 * @note Supported formats include: %Y-%m-%d, %Y%m%d, %d-%m-%Y, %m-%d-%Y, %d/%m/%Y, %m/%d/%Y
 */
bool parseDate(const std::string& dateStr, const std::string& format, int& year, int& month, int& day) {
    std::istringstream ss(dateStr);
    std::string token;
    int parts[3] = {0};

    if (format == "%Y-%m-%d") {
        std::getline(ss, token, '-');
        parts[0] = std::stoi(token);
        std::getline(ss, token, '-');
        parts[1] = std::stoi(token);
        std::getline(ss, token);
        parts[2] = std::stoi(token);
        year = parts[0];
        month = parts[1];
        day = parts[2];
        return isValidDate(year, month, day);
    } else if (format == "%Y%m%d") {
        if (dateStr.size() != 8) return false;
        parts[0] = std::stoi(dateStr.substr(0, 4));
        parts[1] = std::stoi(dateStr.substr(4, 2));
        parts[2] = std::stoi(dateStr.substr(6, 2));
        year = parts[0];
        month = parts[1];
        day = parts[2];
        return isValidDate(year, month, day);
    } else if (format == "%d-%m-%Y") {
        std::getline(ss, token, '-');
        parts[0] = std::stoi(token);
        std::getline(ss, token, '-');
        parts[1] = std::stoi(token);
        std::getline(ss, token);
        parts[2] = std::stoi(token);
        day = parts[0];
        month = parts[1];
        year = parts[2];
        return isValidDate(year, month, day);
    } else if (format == "%m-%d-%Y") {
        std::getline(ss, token, '-');
        parts[0] = std::stoi(token);
        std::getline(ss, token, '-');
        parts[1] = std::stoi(token);
        std::getline(ss, token);
        parts[2] = std::stoi(token);
        month = parts[0];
        day = parts[1];
        year = parts[2];
        return isValidDate(year, month, day);
    } else if (format == "%d/%m/%Y") {
        std::getline(ss, token, '/');
        parts[0] = std::stoi(token);
        std::getline(ss, token, '/');
        parts[1] = std::stoi(token);
        std::getline(ss, token);
        parts[2] = std::stoi(token);
        day = parts[0];
        month = parts[1];
        year = parts[2];
        return isValidDate(year, month, day);
    } else if (format == "%m/%d/%Y") {
        std::getline(ss, token, '/');
        parts[0] = std::stoi(token);
        std::getline(ss, token, '/');
        parts[1] = std::stoi(token);
        std::getline(ss, token);
        parts[2] = std::stoi(token);
        month = parts[0];
        day = parts[1];
        year = parts[2];
        return isValidDate(year, month, day);
    }
    return false;
}

/**
 * @brief Extract a valid date string from a filename
 *
 * Supports multiple common date formats and validates their correctness
 *
 * Supported formats and validation rules:
 * - YYYY-MM-DD (e.g., 2023-12-31): Validates year, month, and day ranges
 * - YYYYMMDD (e.g., 20231231): Validates year, month, and day ranges
 * - DD-MM-YYYY (e.g., 31-12-2023): Month must be 1-12; day must conform to the month's number of days
 * - MM-DD-YYYY (e.g., 12-31-2023): Same as above
 * - DD/MM/YYYY (e.g., 31/12/2023): Same as above
 * - MM/DD/YYYY (e.g., 12/31/2023): Same as above
 *
 * @param file_name The input filename string
 * @return std::string Valid date string extracted from the filename, or empty string if no valid date is found
 *
 * @note The function automatically validates date correctness including leap years and days per month
 * @note For ambiguous formats (like DD-MM-YYYY and MM-DD-YYYY), the function tries all possible parsing methods
 * @note The returned date string format is exactly the same as found in the filename
 *
 * @see isLeapYear()
 * @see daysInMonth()
 * @see isValidDate()
 *
 * @example
 * @code
 * std::string filename = "report_31-12-2023_final.pdf";
 * std::string date = extract_date_from_filename(filename);
 * // date = "31-12-2023"
 * @endcode
 */
std::string extract_date_from_filename(const std::string& file_name) {
    // Define regex patterns with corresponding formats
    std::vector<std::pair<std::regex, std::vector<std::string>>> date_formats = {
        {std::regex(R"(\d{4}-\d{2}-\d{2})"), {"%Y-%m-%d"}},
        {std::regex(R"(\d{8})"), {"%Y%m%d"}},
        {std::regex(R"(\d{2}-\d{2}-\d{4})"), {"%d-%m-%Y", "%m-%d-%Y"}},
        {std::regex(R"(\d{2}/\d{2}/\d{4})"), {"%d/%m/%Y", "%m/%d/%Y"}}
    };

    for (const auto& format_pair : date_formats) {
        const std::regex& pattern = format_pair.first;
        const std::vector<std::string>& parsers = format_pair.second;

        std::sregex_iterator iter(file_name.begin(), file_name.end(), pattern);
        std::sregex_iterator end;

        for (; iter != end; ++iter) {
            std::string match = iter->str();
            for (const std::string& parser : parsers) {
                int year = 0, month = 0, day = 0;
                if (parseDate(match, parser, year, month, day)) {
                    return match;
                }
            }
        }
    }

    return ""; // No valid date found
}
