#include <iostream>
#include <string>
#include <vector>
#include <sstream>

std::string format_str(const std::string& x) {
    std::string text = x;

    // Ensure there is a matching number of code block delimiters.
    // If the count of delimiters is odd, append an additional one to balance.
    size_t delimiter_count = 0;
    for (size_t pos = text.find("```"); pos != std::string::npos; pos = text.find("```", pos + 3)) {
            delimiter_count++;
    }
    if (delimiter_count % 2 == 1) {
        text += "\n```";
    }

    // Format each line by prepending '> ' and join them with newlines.
    std::istringstream iss(text);
    std::vector<std::string> lines;
    std::string line;
    while (std::getline(iss, line)) {
        lines.push_back("> " + line);
    }

    // Join the formatted lines with newlines.
    std::ostringstream oss;
    for (size_t i = 0; i < lines.size(); ++i) {
        if (i > 0) {
            oss << "\n";
        }
        oss << lines[i];
    }

    // Return the final formatted string.
    return oss.str();
}
