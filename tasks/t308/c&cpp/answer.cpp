
#include <string>
#include <vector>
#include <map>
#include <algorithm>
#include <stdexcept>

using namespace std;

string clean_query(
    const string& query,
    const string& whitespace_mode = "collapse",
    const map<string, vector<string>>& comment_rules = {{"line_comment", {"#"}}, {"block_comment", {}}}
) {
    map<string, vector<string>> rules = {
        {"line_comment", {"#"}},
        {"block_comment", {}}
    };
    
    if (!comment_rules.empty()) {
        if (comment_rules.find("line_comment") != comment_rules.end()) {
            rules["line_comment"] = comment_rules.at("line_comment");
        }
        if (comment_rules.find("block_comment") != comment_rules.end()) {
            rules["block_comment"] = comment_rules.at("block_comment");
        }
    }

    if (whitespace_mode != "preserve" && whitespace_mode != "remove" && whitespace_mode != "collapse") {
        throw invalid_argument("whitespace_mode must be 'preserve'/'remove'/'collapse'");
    }

    vector<string> lines;
    size_t start = 0;
    size_t end = query.find('\n');
    while (end != string::npos) {
        lines.push_back(query.substr(start, end - start));
        start = end + 1;
        end = query.find('\n', start);
    }
    lines.push_back(query.substr(start));

    vector<string> result;
    bool in_block_comment = false;
    string current_block_end;
    bool previous_was_blank = false;

    for (auto line : lines) {
        if (in_block_comment) {
            size_t end_pos = line.find(current_block_end);
            if (end_pos != string::npos) {
                line = line.substr(end_pos + current_block_end.length());
                in_block_comment = false;
                current_block_end.clear();
            } else {
                line.clear();
            }
        }

        if (!in_block_comment && !line.empty()) {
            for (const auto& marker : rules["line_comment"]) {
                size_t pos = line.find(marker);
                if (pos != string::npos) {
                    line = line.substr(0, pos);
                    break;
                }
            }

            const auto& block_rules = rules["block_comment"];
            for (size_t i = 0; i + 1 < block_rules.size(); i += 2) {
                const string& block_start = block_rules[i];
                const string& block_end = block_rules[i + 1];
                size_t start_pos = line.find(block_start);
                if (start_pos != string::npos) {
                    string remaining = line.substr(start_pos + block_start.length());
                    line = line.substr(0, start_pos);
                    size_t end_pos = remaining.find(block_end);
                    if (end_pos != string::npos) {
                        line += remaining.substr(end_pos + block_end.length());
                    } else {
                        in_block_comment = true;
                        current_block_end = block_end;
                    }
                    break;
                }
            }
        }

        string processed_line;
        size_t first = line.find_first_not_of(" \t");
        if (first != string::npos) {
            size_t last = line.find_last_not_of(" \t");
            processed_line = line.substr(first, last - first + 1);
        }
        bool is_blank = processed_line.empty();

        if (is_blank) {
            if (whitespace_mode == "preserve") {
                result.push_back("");
                previous_was_blank = true;
            } else if (whitespace_mode == "collapse") {
                if (!previous_was_blank) {
                    result.push_back("");
                    previous_was_blank = true;
                }
            }
        } else {
            result.push_back(processed_line);
            previous_was_blank = false;
        }
    }

    string final_result;
    for (size_t i = 0; i < result.size(); ++i) {
        if (i != 0) {
            final_result += "\n";
        }
        final_result += result[i];
    }

    if (whitespace_mode == "remove") {
        string temp;
        bool prev_newline = false;
        for (char c : final_result) {
            if (c == '\n') {
                if (!prev_newline) {
                    temp += c;
                    prev_newline = true;
                }
            } else {
                temp += c;
                prev_newline = false;
            }
        }
        if (!temp.empty() && temp.back() == '\n') {
            temp.pop_back();
        }
        final_result = temp;
    }

    return final_result;
}
