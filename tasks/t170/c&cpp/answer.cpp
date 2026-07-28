#include <string>
#include <regex>
#include <algorithm>
#include <vector>

static std::string trim(const std::string& text) {
    auto begin = std::find_if(text.begin(), text.end(), [](unsigned char ch) {
        return !std::isspace(ch);
    });
    auto end = std::find_if(text.rbegin(), text.rend(), [](unsigned char ch) {
        return !std::isspace(ch);
    }).base();
    return begin < end ? std::string(begin, end) : "";
}

static std::string token(size_t index) {
    return "\x02HTML_BLOCK_" + std::to_string(index) + "\x03";
}

static void replace_all(std::string& text, const std::string& from, const std::string& to) {
    size_t pos = 0;
    while ((pos = text.find(from, pos)) != std::string::npos) {
        text.replace(pos, from.size(), to);
        pos += to.size();
    }
}

static std::string normalize_tags(const std::string& html) {
    static const std::regex tag_re("<[^>]+>");
    std::string result;
    std::sregex_iterator it(html.begin(), html.end(), tag_re), end;
    size_t last = 0;
    for (; it != end; ++it) {
        result.append(html, last, it->position() - last);
        std::string tag = std::regex_replace(it->str(), std::regex("\\s+"), " ");
        tag = std::regex_replace(tag, std::regex("\\s+>"), ">");
        result += tag;
        last = it->position() + it->length();
    }
    result.append(html, last, std::string::npos);
    return result;
}

std::string minify_html(const std::string& html) {
    std::string result = html;
    std::vector<std::string> blocks;
    static const std::regex raw_block_re("<(pre|textarea|script|style)\\b[^>]*>[\\s\\S]*?</\\1>",
                                         std::regex::icase);

    std::string protected_html;
    std::smatch match;
    while (std::regex_search(result, match, raw_block_re)) {
        protected_html += match.prefix().str();
        protected_html += token(blocks.size());
        blocks.push_back(match.str());
        result = match.suffix().str();
    }
    protected_html += result;

    result = trim(protected_html);
    result = std::regex_replace(result, std::regex("[ \\t]*\\r?\\n+[ \\t]*"), "\x01");
    result = std::regex_replace(result, std::regex("[ \\t]+"), " ");
    result = normalize_tags(result);
    result = std::regex_replace(result, std::regex(">\\s+<"), "><");
    result = std::regex_replace(result, std::regex("(<[^/!][^>]*>) (?=[^<])"), "$1");
    result = std::regex_replace(result, std::regex("([^>\\s]) (</[^>]+>)"), "$1$2");
    replace_all(result, "\x01", " ");

    for (size_t i = 0; i < blocks.size(); ++i) {
        replace_all(result, token(i), blocks[i]);
    }
    return result;
}
