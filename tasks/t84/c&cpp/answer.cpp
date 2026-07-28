#include <string>
#include <vector>

static std::string trim_sentence(const std::string& sentence) {
    const auto start = sentence.find_first_not_of(" \t\n\r\f\v");
    if (start == std::string::npos) {
        return "";
    }
    const auto end = sentence.find_last_not_of(" \t\n\r\f\v");
    return sentence.substr(start, end - start + 1);
}

static bool is_sentence_end_before_space(const std::string& text, std::size_t space_index) {
    if (space_index == 0) {
        return false;
    }
    std::size_t end = space_index;
    if (text[end - 1] == '"' || text[end - 1] == '\'') {
        --end;
    } else if (end >= 3 && (text.compare(end - 3, 3, "”") == 0 ||
                            text.compare(end - 3, 3, "’") == 0)) {
        end -= 3;
    }
    if (end == 0) {
            return false;
        }
    char previous = text[end - 1];
    return previous == '.' || previous == '!' || previous == '?';
}

std::vector<std::string> split_text_into_clean_sentences(const std::string& text) {
    std::vector<std::string> sentences;
    std::size_t start = 0;

    for (std::size_t i = 0; i < text.size(); ++i) {
        if (text[i] != ' ' && text[i] != '\t' && text[i] != '\n' && text[i] != '\r' &&
            text[i] != '\f' && text[i] != '\v') {
            continue;
        }

        std::size_t next = i;
        while (next < text.size() &&
               (text[next] == ' ' || text[next] == '\t' || text[next] == '\n' ||
                text[next] == '\r' || text[next] == '\f' || text[next] == '\v')) {
            ++next;
        }

        if (next < text.size() && text[next] >= 'A' && text[next] <= 'Z' &&
            is_sentence_end_before_space(text, i)) {
            std::string sentence = trim_sentence(text.substr(start, i - start));
            if (!sentence.empty()) {
                sentences.push_back(sentence);
            }
            start = next;
        }
        i = next;
    }

    std::string sentence = trim_sentence(text.substr(start));
    if (!sentence.empty()) {
        sentences.push_back(sentence);
    }

    return sentences;
}
