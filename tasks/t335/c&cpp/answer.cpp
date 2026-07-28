#include <string>
#include <algorithm>

std::string process_string_quotes(
    const std::string& line,
    bool strip_outer = true,
    bool escape_inner = true,
    bool enclose_final = true
) {
    std::string processed_line = line;

    if (strip_outer) {
        if (processed_line.size() >= 2 && 
            processed_line.front() == '"' && processed_line.back() == '"') {
            processed_line = processed_line.substr(1, processed_line.size() - 2);
        } else if (processed_line.size() >= 2 && 
                  processed_line.front() == '\'' && processed_line.back() == '\'') {
            processed_line = processed_line.substr(1, processed_line.size() - 2);
        }
    }

    if (escape_inner) {
        size_t pos = 0;
        while ((pos = processed_line.find("\\\"", pos)) != std::string::npos) {
            processed_line.replace(pos, 2, "\"");
            pos += 1;
        }
        pos = 0;
        while ((pos = processed_line.find("\\'", pos)) != std::string::npos) {
            processed_line.replace(pos, 2, "'");
            pos += 1;
        }
    } else {
        size_t pos = 0;
        while ((pos = processed_line.find("\"", pos)) != std::string::npos) {
            processed_line.replace(pos, 1, "\\\"");
            pos += 2;
        }
        pos = 0;
        while ((pos = processed_line.find("'", pos)) != std::string::npos) {
            processed_line.replace(pos, 1, "\\'");
            pos += 2;
        }
    }

    if (enclose_final) {
        return "\"" + processed_line + "\"";
    }

    return processed_line;
}
