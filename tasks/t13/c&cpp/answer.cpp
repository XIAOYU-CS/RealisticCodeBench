#include <algorithm>
#include <fstream>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

namespace {
std::vector<std::string> read_lines(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        throw std::runtime_error("One of the files was not found.");
    }

    std::vector<std::string> lines;
    std::string line;
    char ch;
    while (file.get(ch)) {
        line += ch;
        if (ch == '\n') {
            lines.push_back(line);
            line.clear();
        }
    }
    if (!line.empty()) {
        lines.push_back(line);
    }
    if (file.bad()) {
        throw std::runtime_error("Error reading files.");
    }
    return lines;
}

std::string diff_range(std::size_t count) {
    if (count == 0) {
        return "0,0";
    }
    return count == 1 ? "1" : "1," + std::to_string(count);
}
}

std::vector<std::string> compare_files(const std::string& file1_path, const std::string& file2_path) {
    const auto lines1 = read_lines(file1_path);
    const auto lines2 = read_lines(file2_path);

    if (lines1 == lines2) {
        return {};
    }

    std::vector<std::vector<int>> lcs(lines1.size() + 1, std::vector<int>(lines2.size() + 1, 0));
    for (std::size_t i = lines1.size(); i-- > 0;) {
        for (std::size_t j = lines2.size(); j-- > 0;) {
            lcs[i][j] = lines1[i] == lines2[j]
                ? lcs[i + 1][j + 1] + 1
                : std::max(lcs[i + 1][j], lcs[i][j + 1]);
        }
    }

    std::vector<std::string> diff_lines = {
        "--- " + file1_path + "\n",
        "+++ " + file2_path + "\n",
        "@@ -" + diff_range(lines1.size()) + " +" + diff_range(lines2.size()) + " @@\n",
    };

    std::size_t i = 0;
    std::size_t j = 0;
    while (i < lines1.size() || j < lines2.size()) {
        if (i < lines1.size() && j < lines2.size() && lines1[i] == lines2[j]) {
            diff_lines.push_back(" " + lines1[i++]);
        } else if (j < lines2.size() && (i == lines1.size() || lcs[i][j + 1] >= lcs[i + 1][j])) {
            diff_lines.push_back("+" + lines2[j++]);
        } else {
            diff_lines.push_back("-" + lines1[i++]);
        }
    }

    for (const auto& line_text : diff_lines) {
        std::cout << line_text;
    }

    return diff_lines;
}
