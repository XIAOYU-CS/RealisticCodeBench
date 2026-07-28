#include <iostream>
#include <sstream>
#include <string>
#include <cctype>

std::string camel_case_to_capitalized_with_spaces(const std::string& input) {
    std::ostringstream spacedStream;
    for (unsigned char ch : input) {
        if (std::isupper(ch) || std::isdigit(ch)) {
            spacedStream << ' ';
        }
        spacedStream << ch;
    }
    
    std::string spacedString = spacedStream.str();
    std::istringstream wordsStream(spacedString);
    std::string capitalizedString, word;
    
    while (wordsStream >> word) {
        for (char& ch : word) {
            ch = static_cast<char>(std::tolower(static_cast<unsigned char>(ch)));
        }
        capitalizedString += word + ' ';
    }
    
    if (capitalizedString.empty()) {
        return "";
    }
    capitalizedString.pop_back();
    capitalizedString[0] = static_cast<char>(std::toupper(static_cast<unsigned char>(capitalizedString[0])));
    return capitalizedString;
}
