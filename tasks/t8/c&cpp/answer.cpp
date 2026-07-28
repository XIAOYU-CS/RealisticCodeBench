#include <sstream>
#include <string>
#include <vector>

namespace {

std::string trim(const std::string& value) {
    const auto start = value.find_first_not_of(" \n\r\t");
    if (start == std::string::npos) {
        return "";
    }
    const auto end = value.find_last_not_of(" \n\r\t");
    return value.substr(start, end - start + 1);
}

}  // namespace

std::vector<std::vector<std::string>> parse_markdown_table(const std::string& md_table) {
    std::vector<std::vector<std::string>> table_data;
    std::istringstream input(md_table);
    std::string line;

    while (std::getline(input, line)) {
        line = trim(line);
        if (line.empty() || line.find("---") != std::string::npos) {
            continue;
        }

        if (!line.empty() && line.front() == '|') {
            line.erase(line.begin());
        }
        if (!line.empty() && line.back() == '|') {
            line.pop_back();
        }

        std::vector<std::string> row;
        std::istringstream row_stream(line);
        std::string cell;
        while (std::getline(row_stream, cell, '|')) {
            row.push_back(trim(cell));
        }
        table_data.push_back(row);
    }

    return table_data;
}
