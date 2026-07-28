std::string pad_string(const std::string& input, int n = 4, const std::string& char_padding = " ", const std::string& side = "left") {
    if (input.empty() || n <= 0) {
        return input;
    }

    std::string pad_unit = char_padding.empty() ? " " : char_padding;

    int char_len = pad_unit.length();
    int repeat = (n / char_len) + ((n % char_len) ? 1 : 0);
    std::string padding;
    for (int i = 0; i < repeat; ++i) {
        padding += pad_unit;
    }
    padding = padding.substr(0, n);

    bool ends_with_newline = input.back() == '\n';
    std::vector<std::string> lines;
    size_t start = 0;
    size_t end = input.find('\n');
    while (end != std::string::npos) {
        lines.push_back(input.substr(start, end - start));
        start = end + 1;
        end = input.find('\n', start);
    }
    if (!ends_with_newline) {
        lines.push_back(input.substr(start));
    }

    std::vector<std::string> processed_lines;
    for (const auto& line : lines) {
        std::string processed;
        if (side == "left") {
            processed = padding + line;
        } else if (side == "right") {
            processed = line + padding;
        } else if (side == "both") {
            processed = padding + line + padding;
        } else {
            throw std::invalid_argument("Unsupported padding direction: " + side + ", allowed values: 'left'/'right'/'both'");
        }
        processed_lines.push_back(processed);
    }

    std::string result;
    for (size_t i = 0; i < processed_lines.size(); ++i) {
        if (i != 0) {
            result += '\n';
        }
        result += processed_lines[i];
    }

    if (ends_with_newline) {
        result += '\n';
    }

    return result;
}
