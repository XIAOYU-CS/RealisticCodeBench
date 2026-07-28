#include <string>
#include <vector>
#include <algorithm>
#include <sstream>

std::string custom_format_file_path(
    const std::string& path,
    const std::string& sep = "/",
    const std::string& replace_char = "_",
    const std::string& strip_chars = "_",
    const std::vector<std::string>* remove_items = nullptr,
    const std::vector<std::string>* extra_suffixes = nullptr
) {
    // Replace separators with replace_char
    std::string new_path = path;
    size_t pos = 0;
    while ((pos = new_path.find(sep, pos)) != std::string::npos) {
        new_path.replace(pos, sep.length(), replace_char);
        pos += replace_char.length();
    }

    // Strip characters from start and end
    if (!strip_chars.empty()) {
        // Strip from beginning
        size_t start_pos = 0;
        while (start_pos < new_path.length() &&
               strip_chars.find(new_path[start_pos]) != std::string::npos) {
            ++start_pos;
        }

        // Strip from end
        size_t end_pos = new_path.length();
        while (end_pos > start_pos &&
               strip_chars.find(new_path[end_pos - 1]) != std::string::npos) {
            --end_pos;
        }

        if (start_pos < end_pos) {
            new_path = new_path.substr(start_pos, end_pos - start_pos);
        } else {
            new_path.clear();
        }
    }

    // Remove items if provided
    if (remove_items != nullptr) {
        for (const std::string& item : *remove_items) {
            std::string item_with_replace = item + replace_char;
            size_t item_pos = 0;
            while ((item_pos = new_path.find(item_with_replace, item_pos)) != std::string::npos) {
                new_path.erase(item_pos, item_with_replace.length());
            }
        }
    }

    // Remove extra suffixes if provided
    if (extra_suffixes != nullptr) {
        for (const std::string& suffix : *extra_suffixes) {
            size_t suffix_pos = new_path.find(suffix);
            while (suffix_pos != std::string::npos) {
                new_path.erase(suffix_pos, suffix.length());
                suffix_pos = new_path.find(suffix, suffix_pos);
            }
        }
    }

    return new_path;
}