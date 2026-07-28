#include <iostream>
#include <vector>
#include <string>
#include <sstream>

static std::vector<std::string> split_tsv_line(const std::string& line) {
    std::vector<std::string> row;
    std::string value;
    std::istringstream iss(line);

    while (std::getline(iss, value, '\t')) {
        row.push_back(value);
    }
    if (!line.empty() && line.back() == '\t') {
        row.emplace_back();
    }

    return row;
}

std::vector<std::vector<std::string>> read_tsv_from_stdin() {
    std::vector<std::vector<std::string>> data;
    std::string line;

    while (std::getline(std::cin, line)) {
        data.push_back(split_tsv_line(line));
    }

    size_t max_columns = 0;
    for (const auto& row : data) {
        max_columns = std::max(max_columns, row.size());
    }

    for (auto& row : data) {
        row.resize(max_columns, "");
    }

    return data;
}
