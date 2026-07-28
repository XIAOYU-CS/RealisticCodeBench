#include <map>
#include <numeric>
#include <string>
#include <vector>

#include "signature.cpp"

float prob(const std::vector<std::string>& context, const std::string& word) {
    static const std::map<std::vector<std::string>, std::map<std::string, int>> counts = {
        {{}, {{"hello", 1}, {"other", 1}}},
        {{"hello"}, {{"world", 4}, {"other", 1}}},
        {{"hello", "world"}, {{"test", 3}, {"other", 1}}},
    };

    auto context_it = counts.find(context);
    if (context_it == counts.end()) {
        return 0.0f;
    }

    const auto& word_counts = context_it->second;
    const int total = std::accumulate(
        word_counts.begin(), word_counts.end(), 0,
        [](int sum, const auto& entry) { return sum + entry.second; });
    if (total == 0) {
        return 0.0f;
    }

    auto word_it = word_counts.find(word);
    const int count_hw = word_it == word_counts.end() ? 0 : word_it->second;
    return static_cast<float>(count_hw) / static_cast<float>(total);
}
