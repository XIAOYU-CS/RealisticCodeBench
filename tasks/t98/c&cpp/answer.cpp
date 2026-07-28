#include <string>
#include <vector>
#include <sstream>

std::string format_comment(const std::string& string, int max_length = 60) {
    std::vector<std::string> lines;
    size_t start = 0;
    while (true) {
        size_t end = string.find('\n', start);
        lines.push_back(string.substr(start, end == std::string::npos ? end : end - start));
        if (end == std::string::npos) {
            break;
        }
        start = end + 1;
    }

    std::vector<std::string> formatted_lines;

    for (const auto& line : lines) {
        std::istringstream word_stream(line);
        std::string word;
        std::string current_line;

        while (word_stream >> word) {
            if (current_line.length() + word.length() > static_cast<size_t>(max_length)) {
                formatted_lines.push_back(current_line);
                current_line.clear();
            }

            if (current_line.empty()) {
                current_line = word;
            } else {
                current_line += " " + word;
            }
        }

        formatted_lines.push_back(current_line);
    }

    std::ostringstream oss;
    for (size_t i = 0; i < formatted_lines.size(); ++i) {
        if (i) {
            oss << "\n";
        }
        oss << "# " << formatted_lines[i];
    }

    return oss.str();
}
