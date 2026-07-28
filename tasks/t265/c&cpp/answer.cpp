#include <fstream>
#include <stdexcept>
#include <string>
#include <vector>

void modifyLineInFile(const std::string& filePath, int lineNumber, const std::string& newValue) {
    std::ifstream reader(filePath);
    if (!reader) {
        throw std::runtime_error("Unable to open file");
    }

    std::vector<std::string> lines;
    std::string line;
    while (std::getline(reader, line)) {
        lines.push_back(line);
    }

    if (lineNumber < 1 || lineNumber > static_cast<int>(lines.size())) {
        throw std::invalid_argument("Invalid line number");
    }

    lines[lineNumber - 1] = newValue;

    std::ofstream writer(filePath);
    if (!writer) {
        throw std::runtime_error("Unable to write file");
    }

    for (const auto& outputLine : lines) {
        writer << outputLine << '\n';
    }
}
