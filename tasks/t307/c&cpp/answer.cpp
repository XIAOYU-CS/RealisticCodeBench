
#include <vector>
#include <string>
#include <stdexcept>
#include <algorithm>

std::string format_comment_with_custom_style(
    const std::string& string,
    int max_length = 60,
    const std::string& comment_style = "hash",
    const std::string& line_prefix = ""
) {
    std::vector<std::string> style_prefixes = {"hash", "slash", "block"};
    std::vector<std::string> prefixes = {"# ", "// ", "* "};

    auto it = std::find(style_prefixes.begin(), style_prefixes.end(), comment_style);
    if (it == style_prefixes.end()) {
        throw std::invalid_argument("Unsupported comment style: " + comment_style + ", available values: hash, slash, block");
    }

    std::string base_prefix = prefixes[std::distance(style_prefixes.begin(), it)];
    std::string prefix_total = base_prefix + line_prefix;
    int content_max_len = max_length - prefix_total.length();

    if (content_max_len <= 0) {
        throw std::invalid_argument("Maximum length (" + std::to_string(max_length) + ") is too small to accommodate comment symbols and prefixes");
    }

    std::vector<std::string> lines;
    size_t start = 0;
    size_t end = string.find('\n');
    while (end != std::string::npos) {
        lines.push_back(string.substr(start, end - start));
        start = end + 1;
        end = string.find('\n', start);
    }
    lines.push_back(string.substr(start));

    std::vector<std::string> all_words;
    for (const auto& line : lines) {
        size_t word_start = 0;
        size_t word_end = line.find(' ');
        while (word_end != std::string::npos) {
            all_words.push_back(line.substr(word_start, word_end - word_start));
            word_start = word_end + 1;
            word_end = line.find(' ', word_start);
        }
        all_words.push_back(line.substr(word_start));
    }

    std::vector<std::string> formatted_lines;
    std::vector<std::string> current_line;
    int current_len = 0;

    for (const auto& word : all_words) {
        int word_len = word.length();
        int needed_len = current_len + (current_line.empty() ? word_len : word_len + 1);

        if (needed_len > content_max_len) {
            std::string line;
            for (size_t i = 0; i < current_line.size(); ++i) {
                if (i != 0) line += " ";
                line += current_line[i];
            }
            formatted_lines.push_back(line);
            current_line.clear();
            current_line.push_back(word);
            current_len = word_len;
        } else {
            current_line.push_back(word);
            current_len = needed_len;
        }
    }

    if (!current_line.empty()) {
        std::string line;
        for (size_t i = 0; i < current_line.size(); ++i) {
            if (i != 0) line += " ";
            line += current_line[i];
        }
        formatted_lines.push_back(line);
    }

    std::vector<std::string> prefixed_lines;
    for (const auto& line : formatted_lines) {
        prefixed_lines.push_back(prefix_total + line);
    }

    if (comment_style == "block") {
        return "/*\n" + [&]() {
            std::string result;
            for (size_t i = 0; i < prefixed_lines.size(); ++i) {
                if (i != 0) result += "\n";
                result += prefixed_lines[i];
            }
            return result;
        }() + "\n*/";
    } else {
        return [&]() {
            std::string result;
            for (size_t i = 0; i < prefixed_lines.size(); ++i) {
                if (i != 0) result += "\n";
                result += prefixed_lines[i];
            }
            return result;
        }();
    }
}