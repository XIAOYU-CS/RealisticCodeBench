#include <string>
#include <map>
#include <vector>
#include <regex>
#include <algorithm>

std::string detect_language(const std::string& code) {
    std::string code_clean;
    code_clean = code;
    code_clean.erase(0, code_clean.find_first_not_of(" \t\n\r\f\v"));
    code_clean.erase(code_clean.find_last_not_of(" \t\n\r\f\v") + 1);

    std::vector<std::pair<std::regex, int>> python_patterns = {
        {std::regex("^[ \\t]+def ", std::regex_constants::multiline), 2},
        {std::regex("^[ \\t]+class ", std::regex_constants::multiline), 2},
        {std::regex("\\bprint\\s*\\([^)]*\\)"), 1},
        {std::regex("\\bimport\\s+\\w+"), 1},
        {std::regex("\\bfrom\\s+\\w+\\s+import"), 1},
        {std::regex("\\bdef\\b"), 1},
        {std::regex("\\bself\\b"), 1},
        {std::regex("#[^\\n]*$", std::regex_constants::multiline), 1}
    };

    std::vector<std::pair<std::regex, int>> cpp_patterns = {
        {std::regex("#include\\s*[<\"]\\w+[>\"]"), 2},
        {std::regex("cout\\s*<<"), 1},
        {std::regex("using\\s+namespace\\s+\\w+"), 1},
        {std::regex("\\w+::\\w+"), 1},
        {std::regex("\\bstd\\b"), 1}
    };

    std::vector<std::pair<std::regex, int>> java_patterns = {
        {std::regex("public\\s+class\\s+\\w+"), 2},
        {std::regex("\\bextends\\s+\\w+"), 1},
        {std::regex("\\b(public|private|protected)\\b"), 1},
        {std::regex("\\bvoid\\b"), 1},
        {std::regex("System\\.out\\.println", std::regex_constants::icase), 1}
    };

    std::vector<std::pair<std::regex, int>> js_patterns = {
        {std::regex("\\b(var|let|const)\\s+\\w+"), 2},
        {std::regex("function\\s+\\w*\\s*\\("), 1},
        {std::regex("console\\.log\\s*\\("), 1},
        {std::regex("=>"), 1},
        {std::regex("\\binstanceof\\b"), 1},
        {std::regex("\\bthis\\b"), 1}
    };

    auto score_language = [&code_clean](const std::vector<std::pair<std::regex, int>>& patterns) {
        int score = 0;
        for (const auto& pattern : patterns) {
            if (std::regex_search(code_clean, pattern.first)) {
                score += pattern.second;
            }
        }
        return score;
    };

    std::map<std::string, int> scores = {
        {"python", score_language(python_patterns)},
        {"c++", score_language(cpp_patterns)},
        {"java", score_language(java_patterns)},
        {"javascript", score_language(js_patterns)}
    };

    auto max_score = std::max_element(scores.begin(), scores.end(),
        [](const std::pair<std::string, int>& a, const std::pair<std::string, int>& b) {
            return a.second < b.second;
        });

    if (max_score->second == 0) {
        return "unknown";
    }

    return max_score->first;
}
