#include <vector>
#include <string>
#include <map>
#include <regex>
#include <algorithm>
#include <variant>

using namespace std;

using ColumnValue = variant<string, vector<string>, int>;

vector<string> parse_csv_line(const string& line) {
    vector<string> result;
    bool in_quotes = false;
    string current_cell;
    size_t i = 0;

    while (i < line.length()) {
        char current_char = line[i];
        char next_char = (i + 1 < line.length()) ? line[i + 1] : '\0';

        if (current_char == '"') {
            if (in_quotes && next_char == '"') {
                current_cell += '"';
                i += 2;
                continue;
            } else {
                in_quotes = !in_quotes;
                i += 1;
            }
        } else if (current_char == ',' && !in_quotes) {
            result.push_back(current_cell);
            current_cell.clear();
            i += 1;
        } else {
            current_cell += current_char;
            i += 1;
        }
    }

    result.push_back(current_cell);

    for (auto& field : result) {
        size_t start = field.find_first_not_of(" \t");
        if (start != string::npos) {
            size_t end = field.find_last_not_of(" \t");
            field = field.substr(start, end - start + 1);
        } else {
            field.clear();
        }
    }

    return result;
}

vector<map<string, ColumnValue>> get_column_details(const string& csv_data) {
    vector<string> lines;
    size_t start = 0;
    size_t end = csv_data.find('\n');

    while (end != string::npos) {
        string line = csv_data.substr(start, end - start);
        line.erase(0, line.find_first_not_of(" \t"));
        line.erase(line.find_last_not_of(" \t") + 1);
        if (!line.empty()) {
            lines.push_back(line);
        }
        start = end + 1;
        end = csv_data.find('\n', start);
    }

    string last_line = csv_data.substr(start);
    last_line.erase(0, last_line.find_first_not_of(" \t"));
    last_line.erase(last_line.find_last_not_of(" \t") + 1);
    if (!last_line.empty()) {
        lines.push_back(last_line);
    }

    if (lines.empty()) {
        return {};
    }

    vector<string> header = parse_csv_line(lines[0]);
    vector<vector<string>> data_rows;
    for (size_t i = 1; i < lines.size(); ++i) {
        data_rows.push_back(parse_csv_line(lines[i]));
    }

    vector<map<string, ColumnValue>> column_details;

    for (size_t column_index = 0; column_index < header.size(); ++column_index) {
        string column_name = header[column_index];
        column_name.erase(0, column_name.find_first_not_of(" \t"));
        column_name.erase(column_name.find_last_not_of(" \t") + 1);

        vector<string> column_values;
        for (const auto& row : data_rows) {
            string value = (column_index < row.size()) ? row[column_index] : "";
            value.erase(0, value.find_first_not_of(" \t"));
            value.erase(value.find_last_not_of(" \t") + 1);
            column_values.push_back(value);
        }

        int total_count = column_values.size();
        int empty_count = count_if(column_values.begin(), column_values.end(), [](const string& val) {
            return val.empty();
        });

        vector<string> sample_values;
        for (const auto& val : column_values) {
            if (!val.empty() && sample_values.size() < 5) {
                sample_values.push_back(val);
            }
        }

        string data_type = "string";
        vector<string> non_empty_values;
        for (const auto& val : column_values) {
            if (!val.empty()) {
                non_empty_values.push_back(val);
            }
        }

        if (non_empty_values.empty()) {
            data_type = "empty";
        } else {
            bool is_number = all_of(non_empty_values.begin(), non_empty_values.end(), [](const string& val) {
                return regex_match(val, regex("^-?\\d+(\\.\\d+)?$"));
            });

            bool is_boolean = all_of(non_empty_values.begin(), non_empty_values.end(), [](const string& val) {
                return regex_match(val, regex("^(true|false)$", regex_constants::icase));
            });

            if (is_number) {
                data_type = "number";
            } else if (is_boolean) {
                data_type = "boolean";
            } else {
                data_type = "string";
            }

            bool has_number = any_of(non_empty_values.begin(), non_empty_values.end(), [](const string& val) {
                return regex_match(val, regex("^-?\\d+(\\.\\d+)?$"));
            });

            if (!is_number && !is_boolean && has_number) {
                data_type = "mixed";
            }
        }

        map<string, ColumnValue> column_detail;
        column_detail["columnName"] = column_name;
        column_detail["dataType"] = data_type;
        column_detail["sampleValues"] = sample_values;
        column_detail["totalCount"] = total_count;
        column_detail["emptyCount"] = empty_count;
        column_detail["nonEmptyCount"] = total_count - empty_count;

        column_details.push_back(column_detail);
    }

    return column_details;
}
