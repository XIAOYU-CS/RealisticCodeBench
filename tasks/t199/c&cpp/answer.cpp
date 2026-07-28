#include <iostream>
#include <string>
#include <ctime>

std::string calculate_age_from_birthdate(const std::string& birthDateString) {
    struct tm birthDate = {};
    if (strptime(birthDateString.c_str(), "%Y-%m-%d", &birthDate) == nullptr) {
        return "";
    }

    time_t now = time(0);
    struct tm* today = localtime(&now);
    
    int age = today->tm_year + 1900 - (birthDate.tm_year + 1900);
    bool isBirthdayPassed = (today->tm_mon > birthDate.tm_mon) ||
                            (today->tm_mon == birthDate.tm_mon && today->tm_mday >= birthDate.tm_mday);

    if (!isBirthdayPassed) {
        age--;
    }

    return birthDateString + " (" + std::to_string(age) + ")";
}