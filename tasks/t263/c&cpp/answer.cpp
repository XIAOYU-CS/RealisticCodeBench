#include <fstream>
#include <stdexcept>
#include <string>
#include <variant>
#include <vector>

namespace {
std::string trim(const std::string& value) {
    const auto start = value.find_first_not_of(" \t\n\r\f\v");
    if (start == std::string::npos) {
        return "";
    }
    const auto end = value.find_last_not_of(" \t\n\r\f\v");
    return value.substr(start, end - start + 1);
}
}

std::vector<std::variant<int, float, std::string>> read_data_from_file(const std::string& path) {
    std::ifstream reader(path);
    if (!reader) {
        throw std::runtime_error("Error reading file");
    }

    std::vector<std::variant<int, float, std::string>> result;
    std::string line;
    while (std::getline(reader, line)) {
        line = trim(line);

        try {
            size_t pos = 0;
            int value = std::stoi(line, &pos);
            if (pos == line.size()) {
                result.emplace_back(value);
                continue;
            }
        } catch (...) {
        }

        try {
            size_t pos = 0;
            float value = std::stof(line, &pos);
            if (pos == line.size()) {
                result.emplace_back(value);
                continue;
            }
        } catch (...) {
        }

        result.emplace_back(line);
    }

    return result;
}
