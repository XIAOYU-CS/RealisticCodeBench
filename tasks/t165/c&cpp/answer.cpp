#include <algorithm>
#include <cctype>
#include <string>
#include <vector>

namespace {
std::string trim(const std::string& value) {
    auto first = std::find_if_not(value.begin(), value.end(), [](unsigned char ch) {
        return std::isspace(ch);
    });
    auto last = std::find_if_not(value.rbegin(), value.rend(), [](unsigned char ch) {
        return std::isspace(ch);
    }).base();
    return first < last ? std::string(first, last) : "";
}
}

std::vector<std::vector<std::string>> extract_html_waffle_table_to_csv_data(const std::string& html_content) {
    std::vector<std::vector<std::string>> result;
    const std::string marker = "<table class=\"waffle\"";
    size_t table_start = html_content.find(marker);
    if (table_start == std::string::npos) {
        return result;
    }

    size_t table_end = html_content.find("</table>", table_start);
    if (table_end == std::string::npos) {
        table_end = html_content.size();
    }

    size_t pos = html_content.find("<tr", table_start);
    while (pos != std::string::npos && pos < table_end) {
        size_t row_open_end = html_content.find('>', pos);
        size_t row_end = html_content.find("</tr>", row_open_end);
        if (row_open_end == std::string::npos || row_end == std::string::npos || row_end > table_end) {
            break;
        }

        std::vector<std::string> row;
        size_t cell_pos = html_content.find("<td", row_open_end);
        while (cell_pos != std::string::npos && cell_pos < row_end) {
            size_t cell_open_end = html_content.find('>', cell_pos);
            size_t cell_end = html_content.find("</td>", cell_open_end);
            if (cell_open_end == std::string::npos || cell_end == std::string::npos || cell_end > row_end) {
                break;
            }
            row.push_back(trim(html_content.substr(cell_open_end + 1, cell_end - cell_open_end - 1)));
            cell_pos = html_content.find("<td", cell_end);
        }

        result.push_back(row);
        pos = html_content.find("<tr", row_end);
    }

    return result;
}
